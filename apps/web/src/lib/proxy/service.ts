import { createHash } from "node:crypto";
import {
  CredentialStatus,
  Prisma,
  ProviderType,
  RentalStatus,
  SessionStatus,
  UsageEventType,
} from "@/generated/prisma";
import { completeBooking } from "@/lib/payments/service";
import { db } from "@/lib/server/db";
import { decryptSecret } from "@/lib/security/decryption";

function hashSessionToken(sessionToken: string) {
  return createHash("sha256").update(sessionToken).digest("hex");
}

function decimalToNumber(value: Prisma.Decimal | number | null | undefined) {
  if (value == null) {
    return 0;
  }

  return Number(value);
}

function getCredentialRuntimeConfig(metadata: Prisma.JsonValue | null) {
  const object =
    metadata && typeof metadata === "object" && !Array.isArray(metadata)
      ? (metadata as Record<string, unknown>)
      : {};
  const pricing =
    object.pricing &&
    typeof object.pricing === "object" &&
    !Array.isArray(object.pricing)
      ? (object.pricing as Record<string, unknown>)
      : {};

  return {
    baseUrl:
      typeof object.baseUrl === "string" && object.baseUrl.length > 0
        ? object.baseUrl
        : "https://api.openai.com/v1",
    inputCostPer1kTokens:
      typeof pricing.inputCostPer1kTokens === "number"
        ? pricing.inputCostPer1kTokens
        : 0,
    outputCostPer1kTokens:
      typeof pricing.outputCostPer1kTokens === "number"
        ? pricing.outputCostPer1kTokens
        : 0,
  };
}

function computeUsageCost({
  inputTokens,
  outputTokens,
  inputCostPer1kTokens,
  outputCostPer1kTokens,
}: {
  inputTokens: number;
  outputTokens: number;
  inputCostPer1kTokens: number;
  outputCostPer1kTokens: number;
}) {
  return (
    (inputTokens / 1000) * inputCostPer1kTokens +
    (outputTokens / 1000) * outputCostPer1kTokens
  );
}

export async function proxyChatCompletion(
  sessionToken: string,
  payload: Record<string, unknown>,
  requestMeta: {
    requesterIp: string | null;
    userAgent: string | null;
  },
) {
  const hashed = hashSessionToken(sessionToken);
  const session = await db.rentalSession.findUnique({
    where: {
      tokenHash: hashed,
    },
    include: {
      rental: {
        include: {
          listing: {
            include: {
              credential: true,
            },
          },
        },
      },
    },
  });

  if (!session) {
    throw new Error("Rental session token is invalid.");
  }

  if (session.status !== SessionStatus.ACTIVE) {
    throw new Error("Rental session is not active.");
  }

  if (session.expiresAt.getTime() <= Date.now()) {
    await db.rentalSession.update({
      where: { id: session.id },
      data: {
        status: SessionStatus.EXPIRED,
        revokedAt: new Date(),
      },
    });

    await completeBooking(session.rental.renterUserId, session.rental.id);
    throw new Error("Rental session has expired.");
  }

  if (session.rental.status !== RentalStatus.ACTIVE) {
    throw new Error("Rental is not active.");
  }

  const credential = session.rental.listing.credential;

  if (credential.status !== CredentialStatus.ACTIVE) {
    throw new Error("Provider credential is not active.");
  }

  if (credential.providerType !== ProviderType.OPENAI_COMPATIBLE) {
    throw new Error(
      "This proxy currently supports OPENAI_COMPATIBLE credentials only.",
    );
  }

  const runtime = getCredentialRuntimeConfig(credential.metadata);
  const providerSecret = decryptSecret({
    encryptedSecret: credential.encryptedSecret,
    encryptionIv: credential.encryptionIv,
    encryptionTag: credential.encryptionTag,
  });

  const requestStartedAt = Date.now();
  const response = await fetch(`${runtime.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${providerSecret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = (await response.json()) as Record<string, unknown>;
  const usage =
    responseBody.usage &&
    typeof responseBody.usage === "object" &&
    !Array.isArray(responseBody.usage)
      ? (responseBody.usage as Record<string, unknown>)
      : {};

  const inputTokens =
    typeof usage.prompt_tokens === "number" ? usage.prompt_tokens : 0;
  const outputTokens =
    typeof usage.completion_tokens === "number" ? usage.completion_tokens : 0;
  const totalTokens =
    typeof usage.total_tokens === "number"
      ? usage.total_tokens
      : inputTokens + outputTokens;
  const costAmount = computeUsageCost({
    inputTokens,
    outputTokens,
    inputCostPer1kTokens: runtime.inputCostPer1kTokens,
    outputCostPer1kTokens: runtime.outputCostPer1kTokens,
  });
  const latencyMs = Date.now() - requestStartedAt;

  const updatedRental = await db.$transaction(async (tx) => {
    await tx.usageEvent.create({
      data: {
        rentalId: session.rental.id,
        rentalSessionId: session.id,
        eventType: response.ok ? UsageEventType.BILLING : UsageEventType.ERROR,
        providerType: credential.providerType,
        model:
          typeof payload.model === "string"
            ? payload.model
            : (session.rental.modelRestriction ??
              session.rental.listing.modelFamily),
        requestId:
          typeof responseBody.id === "string" ? responseBody.id : undefined,
        inputTokens,
        outputTokens,
        totalTokens,
        costAmount: new Prisma.Decimal(costAmount),
        currencyCode: session.rental.currencyCode,
        statusCode: response.status,
        latencyMs,
        metadata: {
          requesterIp: requestMeta.requesterIp,
          userAgent: requestMeta.userAgent,
        },
      },
    });

    await tx.rentalSession.update({
      where: {
        id: session.id,
      },
      data: {
        lastUsedAt: new Date(),
        requesterIp: requestMeta.requesterIp,
        userAgent: requestMeta.userAgent,
        requestCount: {
          increment: 1,
        },
      },
    });

    return tx.rental.update({
      where: {
        id: session.rental.id,
      },
      data: {
        totalRequests: {
          increment: 1,
        },
        totalInputTokens: {
          increment: inputTokens,
        },
        totalOutputTokens: {
          increment: outputTokens,
        },
        totalCost: decimalOrIncrement(session.rental.totalCost, costAmount),
      },
    });
  });

  const nextRequestCount = updatedRental.totalRequests;
  const nextTotalCost = decimalToNumber(updatedRental.totalCost);
  const nextTotalTokens =
    updatedRental.totalInputTokens + updatedRental.totalOutputTokens;
  const spendCap = decimalToNumber(updatedRental.spendCap);
  const listingMetadata =
    session.rental.listing.metadata &&
    typeof session.rental.listing.metadata === "object" &&
    !Array.isArray(session.rental.listing.metadata)
      ? (session.rental.listing.metadata as Record<string, unknown>)
      : null;
  const freeTier =
    listingMetadata &&
    typeof listingMetadata.freeTier === "object" &&
    !Array.isArray(listingMetadata.freeTier)
      ? (listingMetadata.freeTier as Record<string, unknown>)
      : null;
  const tokenCap =
    typeof freeTier?.tokenCap === "number" ? freeTier.tokenCap : null;
  const shouldAutoComplete =
    (updatedRental.requestLimit !== null &&
      nextRequestCount >= updatedRental.requestLimit) ||
    (spendCap > 0 && nextTotalCost >= spendCap) ||
    (tokenCap !== null && nextTotalTokens >= tokenCap) ||
    (updatedRental.endsAt !== null &&
      updatedRental.endsAt.getTime() <= Date.now());

  if (shouldAutoComplete) {
    await db.rentalSession.update({
      where: {
        id: session.id,
      },
      data: {
        status: SessionStatus.EXPIRED,
        revokedAt: new Date(),
      },
    });

    await completeBooking(session.rental.renterUserId, session.rental.id);
  }

  return {
    status: response.status,
    body: responseBody,
  };
}

function decimalOrIncrement(
  current: Prisma.Decimal | number,
  increment: number,
) {
  return new Prisma.Decimal(current).plus(increment);
}
