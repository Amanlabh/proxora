import { createHash, randomBytes } from "node:crypto";
import {
  ChatMessageRole,
  DisputeStatus,
  LedgerDirection,
  LedgerEntryType,
  PayoutStatus,
  PlatformRole,
  Prisma,
  RentalDuration,
  RentalStatus,
  SessionStatus,
  WalletStatus,
} from "@/generated/prisma";
import {
  createRazorpayXContact,
  createRazorpayXFundAccount,
  createRazorpayXPayout,
} from "@/lib/payments/razorpay";
import { db } from "@/lib/server/db";
import type {
  CreateBookingInput,
  ProviderPayoutRequestInput,
  WalletProfileInput,
} from "./schema";

const durationHours: Record<RentalDuration, number> = {
  ONE_HOUR: 1,
  TWO_HOURS: 2,
  SIX_HOURS: 6,
  TWENTY_FOUR_HOURS: 24,
};

function decimalToNumber(value: Prisma.Decimal | number | null | undefined) {
  if (value == null) {
    return null;
  }

  return Number(value);
}

export async function ensureWallet(userId: string) {
  return db.wallet.upsert({
    where: {
      userId,
    },
    update: {},
    create: {
      userId,
      status: WalletStatus.ACTIVE,
      currencyCode: "USD",
    },
  });
}

export async function getWalletSummary(userId: string) {
  const wallet = await ensureWallet(userId);
  const recentEntries = await db.ledgerEntry.findMany({
    where: {
      walletId: wallet.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return {
    id: wallet.id,
    currencyCode: wallet.currencyCode,
    status: wallet.status,
    balance: decimalToNumber(wallet.balance) ?? 0,
    heldBalance: decimalToNumber(wallet.heldBalance) ?? 0,
    availableBalance:
      (decimalToNumber(wallet.balance) ?? 0) -
      (decimalToNumber(wallet.heldBalance) ?? 0),
    profile: ((wallet.metadata as Record<string, unknown> | null)
      ?.billingProfile ?? null) as Record<string, unknown> | null,
    recentEntries: recentEntries.map((entry) => ({
      id: entry.id,
      entryType: entry.entryType,
      direction: entry.direction,
      amount: decimalToNumber(entry.amount) ?? 0,
      currencyCode: entry.currencyCode,
      description: entry.description,
      createdAt: entry.createdAt.toISOString(),
    })),
  };
}

export async function updateWalletProfile(
  userId: string,
  input: WalletProfileInput,
) {
  const wallet = await ensureWallet(userId);
  const existingMetadata =
    wallet.metadata &&
    typeof wallet.metadata === "object" &&
    !Array.isArray(wallet.metadata)
      ? (wallet.metadata as Record<string, unknown>)
      : {};

  const billingProfile = {
    legalName: input.legalName,
    billingEmail: input.billingEmail,
    companyName: input.companyName || null,
    taxId: input.taxId || null,
    countryCode: input.countryCode.toUpperCase(),
    addressLine1: input.addressLine1,
    addressLine2: input.addressLine2 || null,
    city: input.city,
    stateRegion: input.stateRegion,
    postalCode: input.postalCode,
    usageAlertEmail: input.usageAlertEmail || null,
    invoiceNotes: input.invoiceNotes || null,
    purchaseOrderReference: input.purchaseOrderReference || null,
  };

  return db.wallet.update({
    where: {
      id: wallet.id,
    },
    data: {
      metadata: {
        ...existingMetadata,
        billingProfile,
      },
    },
  });
}

export async function getRenterDashboardSummary(userId: string) {
  const [rentals, ledgerCharges, usageEvents, disputes] = await Promise.all([
    db.rental.findMany({
      where: {
        renterUserId: userId,
      },
      select: {
        id: true,
        status: true,
        totalCost: true,
        totalRequests: true,
        totalInputTokens: true,
        totalOutputTokens: true,
      },
    }),
    db.ledgerEntry.findMany({
      where: {
        wallet: {
          userId,
        },
        entryType: LedgerEntryType.RENTAL_CHARGE,
      },
      select: {
        amount: true,
        currencyCode: true,
      },
    }),
    db.usageEvent.findMany({
      where: {
        rental: {
          renterUserId: userId,
        },
      },
      select: {
        model: true,
        totalTokens: true,
        costAmount: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    }),
    db.dispute.findMany({
      where: {
        openedByUserId: userId,
      },
      select: {
        status: true,
      },
    }),
  ]);

  const totals = rentals.reduce(
    (acc, rental) => {
      acc.totalRequests += rental.totalRequests;
      acc.totalTokens += rental.totalInputTokens + rental.totalOutputTokens;
      acc.totalMeteredCost += decimalToNumber(rental.totalCost) ?? 0;

      if (rental.status === RentalStatus.ACTIVE) {
        acc.activeCount += 1;
      }

      if (rental.status === RentalStatus.COMPLETED) {
        acc.completedCount += 1;
      }

      return acc;
    },
    {
      activeCount: 0,
      completedCount: 0,
      totalRequests: 0,
      totalTokens: 0,
      totalMeteredCost: 0,
    },
  );

  const totalCharged = ledgerCharges.reduce(
    (sum, entry) => sum + (decimalToNumber(entry.amount) ?? 0),
    0,
  );
  const currencyCode = ledgerCharges[0]?.currencyCode ?? "USD";
  const modelUsage = new Map<string, { requests: number; tokens: number }>();

  for (const event of usageEvents) {
    const current = modelUsage.get(event.model) ?? { requests: 0, tokens: 0 };
    current.requests += 1;
    current.tokens += event.totalTokens ?? 0;
    modelUsage.set(event.model, current);
  }

  const topModels = [...modelUsage.entries()]
    .sort((a, b) => b[1].tokens - a[1].tokens)
    .slice(0, 5)
    .map(([model, stats]) => ({
      model,
      requests: stats.requests,
      tokens: stats.tokens,
    }));

  return {
    activeRentalCount: totals.activeCount,
    completedRentalCount: totals.completedCount,
    totalCharged,
    totalMeteredCost: totals.totalMeteredCost,
    totalRequests: totals.totalRequests,
    totalTokens: totals.totalTokens,
    openDisputeCount: disputes.filter(
      (dispute) => dispute.status === DisputeStatus.OPEN,
    ).length,
    currencyCode,
    topModels,
  };
}

export async function topUpWallet(userId: string, amount: number) {
  return topUpWalletWithReference(userId, amount, undefined);
}

export async function topUpWalletWithReference(
  userId: string,
  amount: number,
  reference: string | undefined,
) {
  return db.$transaction(async (tx) => {
    const wallet = await tx.wallet.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
        status: WalletStatus.ACTIVE,
        currencyCode: "USD",
      },
    });

    const nextBalance = new Prisma.Decimal(wallet.balance).plus(amount);

    const updatedWallet = await tx.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        balance: nextBalance,
      },
    });

    await tx.ledgerEntry.create({
      data: {
        walletId: wallet.id,
        entryType: LedgerEntryType.DEPOSIT,
        direction: LedgerDirection.CREDIT,
        amount: new Prisma.Decimal(amount),
        currencyCode: updatedWallet.currencyCode,
        balanceAfter: nextBalance,
        reference,
        description: reference
          ? "Razorpay wallet top-up"
          : "Manual development wallet top-up",
      },
    });

    return updatedWallet;
  });
}

function decimalOrZero(value: Prisma.Decimal | number | null | undefined) {
  return new Prisma.Decimal(value ?? 0);
}

function hashSessionToken(sessionToken: string) {
  return createHash("sha256").update(sessionToken).digest("hex");
}

function mapChatMessageRole(role: ChatMessageRole) {
  if (role === ChatMessageRole.USER) {
    return "user" as const;
  }

  if (role === ChatMessageRole.ASSISTANT) {
    return "assistant" as const;
  }

  return "system" as const;
}

async function settleRentalBalance(
  tx: Prisma.TransactionClient,
  rentalId: string,
  renterUserId: string,
  finalStatus: RentalStatus,
) {
  const rental = await tx.rental.findFirst({
    where: {
      id: rentalId,
      renterUserId,
      status: {
        in: [RentalStatus.PENDING, RentalStatus.ACTIVE, RentalStatus.SUSPENDED],
      },
    },
    include: {
      listing: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!rental) {
    throw new Error("Booking not found for settlement.");
  }

  const renterWallet = await tx.wallet.findUniqueOrThrow({
    where: {
      userId: renterUserId,
    },
  });

  const providerUser = await tx.providerProfile.findUnique({
    where: {
      id: rental.providerProfileId,
    },
    select: {
      userId: true,
    },
  });

  if (!providerUser) {
    throw new Error("Provider profile not found.");
  }

  const providerWallet = await tx.wallet.upsert({
    where: {
      userId: providerUser.userId,
    },
    update: {},
    create: {
      userId: providerUser.userId,
      status: WalletStatus.ACTIVE,
      currencyCode: rental.currencyCode,
    },
  });

  const bookedPrice = decimalOrZero(rental.bookedPrice);
  const meteredConsumption = decimalOrZero(rental.totalCost);
  const consumption = Prisma.Decimal.min(bookedPrice, meteredConsumption);
  const refundAmount = bookedPrice.minus(consumption);
  const providerRevenueRatio = bookedPrice.equals(0)
    ? new Prisma.Decimal(0)
    : decimalOrZero(rental.providerRevenueAmount).div(bookedPrice);
  const providerCredit = consumption.mul(providerRevenueRatio);

  const nextHeldBalance = decimalOrZero(renterWallet.heldBalance).minus(
    bookedPrice,
  );
  const nextRenterBalance = decimalOrZero(renterWallet.balance).minus(
    consumption,
  );
  const nextProviderBalance = decimalOrZero(providerWallet.balance).plus(
    providerCredit,
  );

  await tx.wallet.update({
    where: {
      id: renterWallet.id,
    },
    data: {
      heldBalance: nextHeldBalance,
      balance: nextRenterBalance,
    },
  });

  await tx.wallet.update({
    where: {
      id: providerWallet.id,
    },
    data: {
      balance: nextProviderBalance,
    },
  });

  await tx.ledgerEntry.create({
    data: {
      walletId: renterWallet.id,
      rentalId: rental.id,
      entryType: LedgerEntryType.ESCROW_RELEASE,
      direction: LedgerDirection.CREDIT,
      amount: bookedPrice,
      currencyCode: rental.currencyCode,
      balanceAfter: renterWallet.balance,
      description: `Escrow released for rental settlement: ${rental.listing.title}`,
    },
  });

  await tx.ledgerEntry.create({
    data: {
      walletId: renterWallet.id,
      rentalId: rental.id,
      entryType: LedgerEntryType.RENTAL_CHARGE,
      direction: LedgerDirection.DEBIT,
      amount: consumption,
      currencyCode: rental.currencyCode,
      balanceAfter: nextRenterBalance,
      description: `Rental charge settled for: ${rental.listing.title}`,
    },
  });

  if (refundAmount.greaterThan(0)) {
    await tx.ledgerEntry.create({
      data: {
        walletId: renterWallet.id,
        rentalId: rental.id,
        entryType: LedgerEntryType.REFUND,
        direction: LedgerDirection.CREDIT,
        amount: refundAmount,
        currencyCode: rental.currencyCode,
        balanceAfter: nextRenterBalance,
        description: `Unused escrow returned for: ${rental.listing.title}`,
      },
    });
  }

  await tx.ledgerEntry.create({
    data: {
      walletId: providerWallet.id,
      rentalId: rental.id,
      entryType: LedgerEntryType.PROVIDER_EARNING,
      direction: LedgerDirection.CREDIT,
      amount: providerCredit,
      currencyCode: rental.currencyCode,
      balanceAfter: nextProviderBalance,
      description: `Provider earning from rental: ${rental.listing.title}`,
    },
  });

  return tx.rental.update({
    where: {
      id: rental.id,
    },
    data: {
      status: finalStatus,
      activatedAt: rental.activatedAt ?? new Date(),
      expiredAt: finalStatus === RentalStatus.EXPIRED ? new Date() : undefined,
      revokedAt: finalStatus === RentalStatus.REVOKED ? new Date() : undefined,
      totalCost: consumption,
    },
  });
}

export async function listRenterBookings(userId: string) {
  const rentals = await db.rental.findMany({
    where: {
      renterUserId: userId,
    },
    include: {
      listing: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      provider: {
        select: {
          displayName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rentals.map((rental) => ({
    id: rental.id,
    status: rental.status,
    duration: rental.duration,
    bookedPrice: decimalToNumber(rental.bookedPrice) ?? 0,
    currencyCode: rental.currencyCode,
    startsAt: rental.startsAt?.toISOString() ?? null,
    endsAt: rental.endsAt?.toISOString() ?? null,
    createdAt: rental.createdAt.toISOString(),
    listing: rental.listing,
    providerDisplayName: rental.provider.displayName,
    platformFeeAmount: decimalToNumber(rental.platformFeeAmount) ?? 0,
    providerRevenueAmount: decimalToNumber(rental.providerRevenueAmount) ?? 0,
    totalRequests: rental.totalRequests,
    totalInputTokens: rental.totalInputTokens,
    totalOutputTokens: rental.totalOutputTokens,
    totalCost: decimalToNumber(rental.totalCost) ?? 0,
  }));
}

export async function getRenterRentalWorkspace(
  renterUserId: string,
  rentalId: string,
) {
  const rental = await db.rental.findFirst({
    where: {
      id: rentalId,
      renterUserId,
    },
    include: {
      listing: {
        include: {
          credential: {
            select: {
              supportedModels: true,
            },
          },
        },
      },
      provider: {
        select: {
          displayName: true,
        },
      },
      usageEvents: {
        orderBy: {
          createdAt: "desc",
        },
        take: 12,
      },
      chatMessages: {
        orderBy: {
          createdAt: "asc",
        },
      },
      sessions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  if (!rental) {
    throw new Error("Rental not found.");
  }

  return {
    id: rental.id,
    status: rental.status,
    duration: rental.duration,
    currencyCode: rental.currencyCode,
    bookedPrice: decimalToNumber(rental.bookedPrice) ?? 0,
    totalCost: decimalToNumber(rental.totalCost) ?? 0,
    totalRequests: rental.totalRequests,
    totalInputTokens: rental.totalInputTokens,
    totalOutputTokens: rental.totalOutputTokens,
    startsAt: rental.startsAt?.toISOString() ?? null,
    endsAt: rental.endsAt?.toISOString() ?? null,
    listing: {
      id: rental.listing.id,
      title: rental.listing.title,
      slug: rental.listing.slug,
      modelFamily: rental.listing.modelFamily,
      allowedModels:
        rental.listing.allowedModels.length > 0
          ? rental.listing.allowedModels
          : rental.listing.credential.supportedModels,
    },
    providerDisplayName: rental.provider.displayName,
    latestSession:
      rental.sessions[0] == null
        ? null
        : {
            id: rental.sessions[0].id,
            status: rental.sessions[0].status,
            expiresAt: rental.sessions[0].expiresAt.toISOString(),
            requestCount: rental.sessions[0].requestCount,
            lastUsedAt: rental.sessions[0].lastUsedAt?.toISOString() ?? null,
          },
    usageEvents: rental.usageEvents.map((event) => ({
      id: event.id,
      eventType: event.eventType,
      model: event.model,
      inputTokens: event.inputTokens ?? 0,
      outputTokens: event.outputTokens ?? 0,
      totalTokens: event.totalTokens ?? 0,
      costAmount: decimalToNumber(event.costAmount) ?? 0,
      statusCode: event.statusCode,
      latencyMs: event.latencyMs,
      createdAt: event.createdAt.toISOString(),
    })),
    chatMessages: rental.chatMessages.map((message) => ({
      id: message.id,
      role: mapChatMessageRole(message.role),
      content: message.content,
      model: message.model,
      createdAt: message.createdAt.toISOString(),
    })),
  };
}

export async function createBooking(
  renterUserId: string,
  input: CreateBookingInput,
) {
  return db.$transaction(async (tx) => {
    const wallet = await tx.wallet.upsert({
      where: {
        userId: renterUserId,
      },
      update: {},
      create: {
        userId: renterUserId,
        status: WalletStatus.ACTIVE,
        currencyCode: "USD",
      },
    });

    if (wallet.status !== WalletStatus.ACTIVE) {
      throw new Error("Wallet is not active.");
    }

    const listing = await tx.providerListing.findFirst({
      where: {
        id: input.listingId,
        listingStatus: "ACTIVE",
        visibilityStatus: {
          in: ["PUBLIC", "UNLISTED"],
        },
      },
      include: {
        providerProfile: {
          select: {
            id: true,
            displayName: true,
          },
        },
      },
    });

    if (!listing) {
      throw new Error("Listing is not available for booking.");
    }

    const hours = durationHours[input.duration];
    const bookedPrice = new Prisma.Decimal(listing.hourlyPrice).mul(hours);
    const platformFeeAmount = bookedPrice.mul(listing.platformFeeRate);
    const providerRevenueAmount = bookedPrice.mul(listing.providerRevenueRate);

    const availableBalance = new Prisma.Decimal(wallet.balance).minus(
      wallet.heldBalance,
    );

    const listingMetadata =
      listing.metadata &&
      typeof listing.metadata === "object" &&
      !Array.isArray(listing.metadata)
        ? (listing.metadata as Record<string, unknown>)
        : null;
    const freeTierConfig =
      listingMetadata &&
      typeof listingMetadata.freeTier === "object" &&
      !Array.isArray(listingMetadata.freeTier)
        ? (listingMetadata.freeTier as Record<string, unknown>)
        : null;
    const freeTierEnabled = Boolean(freeTierConfig?.enabled);
    const freeMaxDurationHours =
      typeof freeTierConfig?.maxDurationHours === "number"
        ? freeTierConfig.maxDurationHours
        : 1;
    const freeRequestCap =
      typeof freeTierConfig?.requestCap === "number"
        ? freeTierConfig.requestCap
        : null;

    if (freeTierEnabled && hours > freeMaxDurationHours) {
      throw new Error(
        `Free tier rentals are limited to ${freeMaxDurationHours} hour(s).`,
      );
    }

    if (availableBalance.lessThan(bookedPrice)) {
      throw new Error("Insufficient wallet balance for this booking.");
    }

    const nextHeldBalance = new Prisma.Decimal(wallet.heldBalance).plus(
      bookedPrice,
    );

    const effectiveRequestLimit =
      freeTierEnabled && typeof freeRequestCap === "number"
        ? Math.min(listing.requestLimit ?? freeRequestCap, freeRequestCap)
        : listing.requestLimit;

    const rental = await tx.rental.create({
      data: {
        listingId: listing.id,
        renterUserId,
        providerProfileId: listing.providerProfileId,
        duration: input.duration,
        status: RentalStatus.PENDING,
        currencyCode: listing.currencyCode,
        bookedPrice,
        platformFeeAmount,
        providerRevenueAmount,
        requestLimit: effectiveRequestLimit,
        spendCap: listing.spendCap,
        modelRestriction:
          listing.allowedModels.length === 1 ? listing.allowedModels[0] : null,
        startsAt: null,
        endsAt: null,
      },
      include: {
        listing: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });

    await tx.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        heldBalance: nextHeldBalance,
      },
    });

    await tx.ledgerEntry.create({
      data: {
        walletId: wallet.id,
        rentalId: rental.id,
        entryType: LedgerEntryType.ESCROW_HOLD,
        direction: LedgerDirection.DEBIT,
        amount: bookedPrice,
        currencyCode: listing.currencyCode,
        balanceAfter: wallet.balance,
        description: `Escrow hold for rental booking: ${listing.title}`,
      },
    });

    return {
      id: rental.id,
      status: rental.status,
      duration: rental.duration,
      bookedPrice: decimalToNumber(rental.bookedPrice) ?? 0,
      currencyCode: rental.currencyCode,
      listingTitle: rental.listing.title,
      listingSlug: rental.listing.slug,
      startsAt: rental.startsAt?.toISOString() ?? null,
      endsAt: rental.endsAt?.toISOString() ?? null,
    };
  });
}

export async function cancelBooking(renterUserId: string, rentalId: string) {
  return db.$transaction(async (tx) => {
    const rental = await tx.rental.findFirst({
      where: {
        id: rentalId,
        renterUserId,
      },
      include: {
        listing: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!rental) {
      throw new Error("Booking not found.");
    }

    if (rental.status !== RentalStatus.PENDING) {
      throw new Error("Only pending bookings can be cancelled.");
    }

    const wallet = await tx.wallet.findUniqueOrThrow({
      where: {
        userId: renterUserId,
      },
    });

    const nextHeldBalance = decimalOrZero(wallet.heldBalance).minus(
      rental.bookedPrice,
    );

    await tx.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        heldBalance: nextHeldBalance,
      },
    });

    await tx.ledgerEntry.create({
      data: {
        walletId: wallet.id,
        rentalId: rental.id,
        entryType: LedgerEntryType.ESCROW_RELEASE,
        direction: LedgerDirection.CREDIT,
        amount: rental.bookedPrice,
        currencyCode: rental.currencyCode,
        balanceAfter: wallet.balance,
        description: `Escrow released for cancelled booking: ${rental.listing.title}`,
      },
    });

    await tx.ledgerEntry.create({
      data: {
        walletId: wallet.id,
        rentalId: rental.id,
        entryType: LedgerEntryType.REFUND,
        direction: LedgerDirection.CREDIT,
        amount: rental.bookedPrice,
        currencyCode: rental.currencyCode,
        balanceAfter: wallet.balance,
        description: `Refund recorded for cancelled booking: ${rental.listing.title}`,
      },
    });

    return tx.rental.update({
      where: {
        id: rental.id,
      },
      data: {
        status: RentalStatus.CANCELLED,
        cancelledAt: new Date(),
      },
    });
  });
}

export async function activateBooking(renterUserId: string, rentalId: string) {
  return db.$transaction(async (tx) => {
    const rental = await tx.rental.findFirst({
      where: {
        id: rentalId,
        renterUserId,
        status: RentalStatus.PENDING,
      },
    });

    if (!rental) {
      throw new Error("Pending booking not found.");
    }

    const hours = durationHours[rental.duration];
    const startsAt = new Date();
    const endsAt = new Date(startsAt.getTime() + hours * 60 * 60 * 1000);
    const sessionToken = randomBytes(32).toString("hex");
    const tokenHash = hashSessionToken(sessionToken);

    const updatedRental = await tx.rental.update({
      where: {
        id: rental.id,
      },
      data: {
        status: RentalStatus.ACTIVE,
        activatedAt: startsAt,
        startsAt,
        endsAt,
      },
    });

    await tx.rentalSession.create({
      data: {
        rentalId: rental.id,
        status: SessionStatus.ACTIVE,
        tokenHash,
        issuedAt: startsAt,
        expiresAt: endsAt,
      },
    });

    return {
      rental: updatedRental,
      sessionToken,
    };
  });
}

export async function issueRentalSessionToken(
  renterUserId: string,
  rentalId: string,
) {
  return db.$transaction(async (tx) => {
    const rental = await tx.rental.findFirst({
      where: {
        id: rentalId,
        renterUserId,
        status: RentalStatus.ACTIVE,
      },
    });

    if (!rental) {
      throw new Error("Active rental not found.");
    }

    if (rental.endsAt && rental.endsAt.getTime() <= Date.now()) {
      throw new Error("Rental has already expired.");
    }

    await tx.rentalSession.updateMany({
      where: {
        rentalId,
        status: {
          in: [SessionStatus.PENDING, SessionStatus.ACTIVE],
        },
      },
      data: {
        status: SessionStatus.REVOKED,
        revokedAt: new Date(),
      },
    });

    const sessionToken = randomBytes(32).toString("hex");
    const tokenHash = hashSessionToken(sessionToken);
    const rentalSession = await tx.rentalSession.create({
      data: {
        rentalId,
        status: SessionStatus.ACTIVE,
        tokenHash,
        issuedAt: new Date(),
        expiresAt: rental.endsAt ?? new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    return {
      rentalSessionId: rentalSession.id,
      sessionToken,
      expiresAt: rentalSession.expiresAt.toISOString(),
    };
  });
}

export async function completeBooking(
  renterUserId: string,
  rentalId: string,
  consumedAmount?: number,
) {
  if (consumedAmount != null) {
    await db.rental.update({
      where: {
        id: rentalId,
      },
      data: {
        totalCost: new Prisma.Decimal(consumedAmount),
      },
    });
  }

  return db.$transaction(async (tx) => {
    return settleRentalBalance(
      tx,
      rentalId,
      renterUserId,
      RentalStatus.COMPLETED,
    );
  });
}

export async function getProviderFinanceSummary(
  userId: string,
  providerProfileId: string,
) {
  const wallet = await ensureWallet(userId);
  const earningsEntries = await db.ledgerEntry.findMany({
    where: {
      walletId: wallet.id,
      entryType: LedgerEntryType.PROVIDER_EARNING,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const payouts = await db.payout.findMany({
    where: {
      providerProfileId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const totalEarnings = earningsEntries.reduce(
    (sum, entry) => sum + (decimalToNumber(entry.amount) ?? 0),
    0,
  );

  return {
    walletBalance: decimalToNumber(wallet.balance) ?? 0,
    heldBalance: decimalToNumber(wallet.heldBalance) ?? 0,
    totalRecentEarnings: totalEarnings,
    earningsEntries: earningsEntries.map((entry) => ({
      id: entry.id,
      amount: decimalToNumber(entry.amount) ?? 0,
      currencyCode: entry.currencyCode,
      description: entry.description,
      createdAt: entry.createdAt.toISOString(),
    })),
    payouts: payouts.map((payout) => ({
      id: payout.id,
      amount: decimalToNumber(payout.amount) ?? 0,
      currencyCode: payout.currencyCode,
      status: payout.status,
      externalReference: payout.externalReference,
      failureReason: payout.failureReason,
      requestedAt: payout.requestedAt.toISOString(),
      processedAt: payout.processedAt?.toISOString() ?? null,
    })),
  };
}

export async function getProviderPerformanceSummary(providerProfileId: string) {
  const [rentals, disputes] = await Promise.all([
    db.rental.findMany({
      where: {
        providerProfileId,
      },
      include: {
        listing: {
          select: {
            title: true,
          },
        },
      },
    }),
    db.dispute.findMany({
      where: {
        providerProfileId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    }),
  ]);

  const byListing = new Map<
    string,
    { title: string; revenue: number; requests: number; rentals: number }
  >();

  for (const rental of rentals) {
    const key = rental.listingId;
    const current = byListing.get(key) ?? {
      title: rental.listing.title,
      revenue: 0,
      requests: 0,
      rentals: 0,
    };

    current.revenue += decimalToNumber(rental.providerRevenueAmount) ?? 0;
    current.requests += rental.totalRequests;
    current.rentals += 1;
    byListing.set(key, current);
  }

  return {
    totalRentalCount: rentals.length,
    activeRentalCount: rentals.filter(
      (rental) => rental.status === RentalStatus.ACTIVE,
    ).length,
    disputeCount: disputes.length,
    listingPerformance: [...byListing.values()]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6),
    disputes: disputes.map((dispute) => ({
      id: dispute.id,
      status: dispute.status,
      reason: dispute.reason,
      createdAt: dispute.createdAt.toISOString(),
      resolvedAt: dispute.resolvedAt?.toISOString() ?? null,
    })),
  };
}

export async function getProviderOperationsSummary(providerProfileId: string) {
  const activeRentals = await db.rental.findMany({
    where: {
      providerProfileId,
      status: RentalStatus.ACTIVE,
    },
    include: {
      renter: {
        select: {
          email: true,
          displayName: true,
        },
      },
      listing: {
        select: {
          title: true,
          slug: true,
          modelFamily: true,
        },
      },
      sessions: {
        where: {
          status: SessionStatus.ACTIVE,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      endsAt: "asc",
    },
    take: 12,
  });

  return {
    activeRentals: activeRentals.map((rental) => ({
      id: rental.id,
      status: rental.status,
      listingTitle: rental.listing.title,
      listingSlug: rental.listing.slug,
      modelFamily: rental.listing.modelFamily,
      renterLabel: rental.renter.displayName ?? rental.renter.email,
      endsAt: rental.endsAt?.toISOString() ?? null,
      totalRequests: rental.totalRequests,
      totalCost: decimalToNumber(rental.totalCost) ?? 0,
      currencyCode: rental.currencyCode,
      liveSession:
        rental.sessions[0] == null
          ? null
          : {
              id: rental.sessions[0].id,
              expiresAt: rental.sessions[0].expiresAt.toISOString(),
              requestCount: rental.sessions[0].requestCount,
              lastUsedAt: rental.sessions[0].lastUsedAt?.toISOString() ?? null,
            },
    })),
  };
}

export async function getSystemOperationsSummary() {
  const now = new Date();
  const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    activeRentalCount,
    activeSessionCount,
    pendingRentalCount,
    suspendedRentalCount,
    openDisputeCount,
    rentalsEndingSoon,
    recentPayouts,
    recentRentals,
    recentUsageEvents,
    recentDisputes,
  ] = await Promise.all([
    db.rental.count({
      where: {
        status: RentalStatus.ACTIVE,
      },
    }),
    db.rentalSession.count({
      where: {
        status: SessionStatus.ACTIVE,
      },
    }),
    db.rental.count({
      where: {
        status: RentalStatus.PENDING,
      },
    }),
    db.rental.count({
      where: {
        status: RentalStatus.SUSPENDED,
      },
    }),
    db.dispute.count({
      where: {
        status: DisputeStatus.OPEN,
      },
    }),
    db.rental.findMany({
      where: {
        status: RentalStatus.ACTIVE,
        endsAt: {
          lte: fifteenMinutesFromNow,
          gte: now,
        },
      },
      include: {
        listing: {
          select: {
            title: true,
            slug: true,
          },
        },
        provider: {
          select: {
            displayName: true,
          },
        },
        renter: {
          select: {
            email: true,
            displayName: true,
          },
        },
      },
      orderBy: {
        endsAt: "asc",
      },
      take: 12,
    }),
    db.payout.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
      include: {
        providerProfile: {
          select: {
            displayName: true,
          },
        },
      },
    }),
    db.rental.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        id: true,
        createdAt: true,
        totalCost: true,
        currencyCode: true,
        provider: {
          select: {
            displayName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    db.usageEvent.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        id: true,
        createdAt: true,
        model: true,
        totalTokens: true,
        costAmount: true,
        rental: {
          select: {
            provider: {
              select: {
                displayName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    db.dispute.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        id: true,
        createdAt: true,
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const dailyMap = new Map<
    string,
    {
      rentals: number;
      disputes: number;
      revenue: number;
      tokens: number;
    }
  >();
  const providerRevenueMap = new Map<string, number>();
  const modelUsageMap = new Map<string, { requests: number; tokens: number }>();

  for (let offset = 6; offset >= 0; offset -= 1) {
    const day = new Date(now);
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - offset);
    const key = day.toISOString().slice(0, 10);

    dailyMap.set(key, {
      rentals: 0,
      disputes: 0,
      revenue: 0,
      tokens: 0,
    });
  }

  for (const rental of recentRentals) {
    const key = rental.createdAt.toISOString().slice(0, 10);
    const bucket = dailyMap.get(key);

    if (bucket) {
      bucket.rentals += 1;
      bucket.revenue += decimalToNumber(rental.totalCost) ?? 0;
    }

    const providerName = rental.provider.displayName;
    providerRevenueMap.set(
      providerName,
      (providerRevenueMap.get(providerName) ?? 0) +
        (decimalToNumber(rental.totalCost) ?? 0),
    );
  }

  for (const event of recentUsageEvents) {
    const key = event.createdAt.toISOString().slice(0, 10);
    const bucket = dailyMap.get(key);

    if (bucket) {
      bucket.tokens += event.totalTokens ?? 0;
    }

    const modelStats = modelUsageMap.get(event.model) ?? {
      requests: 0,
      tokens: 0,
    };
    modelStats.requests += 1;
    modelStats.tokens += event.totalTokens ?? 0;
    modelUsageMap.set(event.model, modelStats);
  }

  for (const dispute of recentDisputes) {
    const key = dispute.createdAt.toISOString().slice(0, 10);
    const bucket = dailyMap.get(key);

    if (bucket) {
      bucket.disputes += 1;
    }
  }

  return {
    activeRentalCount,
    activeSessionCount,
    pendingRentalCount,
    suspendedRentalCount,
    openDisputeCount,
    dailyOperations: [...dailyMap.entries()].map(([day, stats]) => ({
      day,
      rentals: stats.rentals,
      disputes: stats.disputes,
      revenue: stats.revenue,
      tokens: stats.tokens,
    })),
    topProviders: [...providerRevenueMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([providerDisplayName, revenue]) => ({
        providerDisplayName,
        revenue,
      })),
    topModels: [...modelUsageMap.entries()]
      .sort((a, b) => b[1].tokens - a[1].tokens)
      .slice(0, 5)
      .map(([model, stats]) => ({
        model,
        requests: stats.requests,
        tokens: stats.tokens,
      })),
    rentalsEndingSoon: rentalsEndingSoon.map((rental) => ({
      id: rental.id,
      listingTitle: rental.listing.title,
      listingSlug: rental.listing.slug,
      providerDisplayName: rental.provider.displayName,
      renterLabel: rental.renter.displayName ?? rental.renter.email,
      endsAt: rental.endsAt?.toISOString() ?? null,
      totalRequests: rental.totalRequests,
      totalCost: decimalToNumber(rental.totalCost) ?? 0,
      currencyCode: rental.currencyCode,
    })),
    recentPayouts: recentPayouts.map((payout) => ({
      id: payout.id,
      providerDisplayName: payout.providerProfile.displayName,
      amount: decimalToNumber(payout.amount) ?? 0,
      currencyCode: payout.currencyCode,
      status: payout.status,
      requestedAt: payout.requestedAt.toISOString(),
      failureReason: payout.failureReason,
    })),
  };
}

export async function getAdminAuditSummary() {
  const [auditLogs, disputes] = await Promise.all([
    db.auditLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      include: {
        user: {
          select: {
            email: true,
            displayName: true,
          },
        },
      },
    }),
    db.dispute.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      include: {
        openedBy: {
          select: {
            email: true,
            displayName: true,
          },
        },
        providerProfile: {
          select: {
            displayName: true,
          },
        },
      },
    }),
  ]);

  return {
    recentAuditLogs: auditLogs.map((log) => ({
      id: log.id,
      action: log.action,
      targetType: log.targetType,
      targetId: log.targetId,
      actorLabel: log.user?.displayName ?? log.user?.email ?? "System",
      createdAt: log.createdAt.toISOString(),
    })),
    disputes: disputes.map((dispute) => ({
      id: dispute.id,
      status: dispute.status,
      reason: dispute.reason,
      openedByLabel:
        dispute.openedBy.displayName ?? dispute.openedBy.email ?? "Unknown",
      providerDisplayName: dispute.providerProfile?.displayName ?? null,
      createdAt: dispute.createdAt.toISOString(),
      resolvedAt: dispute.resolvedAt?.toISOString() ?? null,
    })),
  };
}

export async function listUserDisputes(userId: string, role: PlatformRole) {
  if (role === PlatformRole.ADMIN) {
    return db.dispute.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });
  }

  return db.dispute.findMany({
    where: {
      OR: [
        {
          openedByUserId: userId,
        },
        {
          rental: {
            renterUserId: userId,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });
}

export async function createRentalDispute(
  openedByUserId: string,
  rentalId: string,
  reason: string,
) {
  const rental = await db.rental.findFirst({
    where: {
      id: rentalId,
      renterUserId: openedByUserId,
    },
    select: {
      id: true,
      providerProfileId: true,
    },
  });

  if (!rental) {
    throw new Error("Rental not found for dispute.");
  }

  const dispute = await db.dispute.create({
    data: {
      rentalId: rental.id,
      openedByUserId,
      providerProfileId: rental.providerProfileId,
      status: DisputeStatus.OPEN,
      reason,
    },
  });

  await db.auditLog.create({
    data: {
      userId: openedByUserId,
      rentalId: rental.id,
      action: "open_dispute",
      targetType: "dispute",
      targetId: dispute.id,
      metadata: {
        reason,
      },
    },
  });

  return dispute;
}

export async function sweepExpiredRentals() {
  const now = new Date();

  const expiredSessions = await db.rentalSession.findMany({
    where: {
      status: SessionStatus.ACTIVE,
      expiresAt: {
        lte: now,
      },
    },
    select: {
      id: true,
      rentalId: true,
    },
  });

  if (expiredSessions.length > 0) {
    await db.rentalSession.updateMany({
      where: {
        id: {
          in: expiredSessions.map((session) => session.id),
        },
      },
      data: {
        status: SessionStatus.EXPIRED,
        revokedAt: now,
      },
    });
  }

  const expiredRentals = await db.rental.findMany({
    where: {
      status: RentalStatus.ACTIVE,
      endsAt: {
        lte: now,
      },
    },
    select: {
      id: true,
      renterUserId: true,
    },
  });

  const settledRentalIds: string[] = [];

  for (const rental of expiredRentals) {
    await db.$transaction(async (tx) => {
      await settleRentalBalance(
        tx,
        rental.id,
        rental.renterUserId,
        RentalStatus.EXPIRED,
      );
    });
    settledRentalIds.push(rental.id);
  }

  return {
    expiredSessionCount: expiredSessions.length,
    settledRentalCount: settledRentalIds.length,
    settledRentalIds,
    sweptAt: now.toISOString(),
  };
}

export async function revokeRentalByProvider(
  actorUserId: string,
  providerProfileId: string,
  rentalId: string,
  reason?: string,
) {
  return db.$transaction(async (tx) => {
    const rental = await tx.rental.findFirst({
      where: {
        id: rentalId,
        providerProfileId,
        status: {
          in: [
            RentalStatus.PENDING,
            RentalStatus.ACTIVE,
            RentalStatus.SUSPENDED,
          ],
        },
      },
      select: {
        id: true,
        renterUserId: true,
      },
    });

    if (!rental) {
      throw new Error("Provider rental not found.");
    }

    await tx.rentalSession.updateMany({
      where: {
        rentalId,
        status: {
          in: [
            SessionStatus.PENDING,
            SessionStatus.ACTIVE,
            SessionStatus.SUSPENDED,
          ],
        },
      },
      data: {
        status: SessionStatus.REVOKED,
        revokedAt: new Date(),
      },
    });

    const settled = await settleRentalBalance(
      tx,
      rental.id,
      rental.renterUserId,
      RentalStatus.REVOKED,
    );

    await tx.auditLog.create({
      data: {
        userId: actorUserId,
        rentalId: rental.id,
        action: "provider_revoke_rental",
        targetType: "rental",
        targetId: rental.id,
        metadata: {
          reason: reason ?? null,
        },
      },
    });

    return settled;
  });
}

export async function suspendRentalByAdmin(
  actorUserId: string,
  rentalId: string,
  reason?: string,
) {
  return db.$transaction(async (tx) => {
    const rental = await tx.rental.findFirst({
      where: {
        id: rentalId,
        status: {
          in: [RentalStatus.PENDING, RentalStatus.ACTIVE],
        },
      },
    });

    if (!rental) {
      throw new Error("Rental not found for suspension.");
    }

    await tx.rentalSession.updateMany({
      where: {
        rentalId,
        status: {
          in: [SessionStatus.PENDING, SessionStatus.ACTIVE],
        },
      },
      data: {
        status: SessionStatus.SUSPENDED,
        suspendedAt: new Date(),
      },
    });

    const suspended = await tx.rental.update({
      where: {
        id: rental.id,
      },
      data: {
        status: RentalStatus.SUSPENDED,
      },
    });

    await tx.auditLog.create({
      data: {
        userId: actorUserId,
        rentalId: rental.id,
        action: "admin_suspend_rental",
        targetType: "rental",
        targetId: rental.id,
        metadata: {
          reason: reason ?? null,
        },
      },
    });

    return suspended;
  });
}

export async function revokeRentalByAdmin(
  actorUserId: string,
  rentalId: string,
  reason?: string,
) {
  return db.$transaction(async (tx) => {
    const rental = await tx.rental.findFirst({
      where: {
        id: rentalId,
        status: {
          in: [
            RentalStatus.PENDING,
            RentalStatus.ACTIVE,
            RentalStatus.SUSPENDED,
          ],
        },
      },
      select: {
        id: true,
        renterUserId: true,
      },
    });

    if (!rental) {
      throw new Error("Rental not found for revocation.");
    }

    await tx.rentalSession.updateMany({
      where: {
        rentalId,
        status: {
          in: [
            SessionStatus.PENDING,
            SessionStatus.ACTIVE,
            SessionStatus.SUSPENDED,
          ],
        },
      },
      data: {
        status: SessionStatus.REVOKED,
        revokedAt: new Date(),
      },
    });

    const revoked = await settleRentalBalance(
      tx,
      rental.id,
      rental.renterUserId,
      RentalStatus.REVOKED,
    );

    await tx.auditLog.create({
      data: {
        userId: actorUserId,
        rentalId: rental.id,
        action: "admin_revoke_rental",
        targetType: "rental",
        targetId: rental.id,
        metadata: {
          reason: reason ?? null,
        },
      },
    });

    return revoked;
  });
}

export async function requestProviderPayout(
  userId: string,
  providerProfileId: string,
  input: ProviderPayoutRequestInput,
) {
  const payoutDraft = await db.$transaction(async (tx) => {
    const wallet = await tx.wallet.findUniqueOrThrow({
      where: {
        userId,
      },
    });

    const availableBalance = decimalOrZero(wallet.balance).minus(
      wallet.heldBalance,
    );
    const requestedAmount = new Prisma.Decimal(
      input.amount ?? availableBalance,
    );

    if (requestedAmount.lessThanOrEqualTo(0)) {
      throw new Error("No available balance for payout.");
    }

    if (availableBalance.lessThan(requestedAmount)) {
      throw new Error("Insufficient available balance for payout.");
    }

    const payout = await tx.payout.create({
      data: {
        providerProfileId,
        amount: requestedAmount,
        currencyCode: wallet.currencyCode,
        status: PayoutStatus.PROCESSING,
      },
    });

    return {
      payoutId: payout.id,
      requestedAmount: decimalToNumber(requestedAmount) ?? 0,
      currencyCode: wallet.currencyCode,
      walletId: wallet.id,
      walletBalance: decimalToNumber(wallet.balance) ?? 0,
    };
  });

  try {
    const contact = await createRazorpayXContact({
      name: input.beneficiaryName,
      email: input.beneficiaryEmail || undefined,
    });
    const fundAccount = await createRazorpayXFundAccount({
      contactId: contact.id,
      name: input.beneficiaryName,
      upiId: input.upiId,
    });
    const externalPayout = await createRazorpayXPayout({
      amount: payoutDraft.requestedAmount,
      currencyCode: payoutDraft.currencyCode,
      fundAccountId: fundAccount.id,
      reference: payoutDraft.payoutId,
      narration: "Provider rental payout",
    });

    return db.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUniqueOrThrow({
        where: {
          id: payoutDraft.walletId,
        },
      });
      const nextBalance = decimalOrZero(wallet.balance).minus(
        payoutDraft.requestedAmount,
      );
      const normalizedStatus =
        externalPayout.status === "processed"
          ? PayoutStatus.PAID
          : PayoutStatus.PROCESSING;

      await tx.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          balance: nextBalance,
        },
      });

      await tx.ledgerEntry.create({
        data: {
          walletId: wallet.id,
          payoutId: payoutDraft.payoutId,
          entryType: LedgerEntryType.PAYOUT,
          direction: LedgerDirection.DEBIT,
          amount: new Prisma.Decimal(payoutDraft.requestedAmount),
          currencyCode: payoutDraft.currencyCode,
          balanceAfter: nextBalance,
          reference: externalPayout.id,
          description: "Provider payout executed via RazorpayX",
        },
      });

      return tx.payout.update({
        where: {
          id: payoutDraft.payoutId,
        },
        data: {
          status: normalizedStatus,
          externalReference: externalPayout.reference_id ?? externalPayout.id,
          processedAt:
            normalizedStatus === PayoutStatus.PAID ? new Date() : null,
          failureReason: null,
        },
      });
    });
  } catch (error) {
    await db.payout.update({
      where: {
        id: payoutDraft.payoutId,
      },
      data: {
        status: PayoutStatus.FAILED,
        failureReason:
          error instanceof Error ? error.message : "Unknown payout failure.",
      },
    });

    throw error;
  }
}
