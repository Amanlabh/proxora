import { ListingStatus, Prisma, VisibilityStatus } from "@/generated/prisma";
import { db } from "@/lib/server/db";
import type { CreateListingInput, ListingsQueryInput } from "./schema";
import { serializeListing } from "./serializers";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function generateUniqueSlug(title: string) {
  const base = slugify(title);

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const candidate = attempt === 0 ? base : `${base}-${attempt + 1}`;
    const existing = await db.providerListing.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }
  }

  return `${base}-${crypto.randomUUID().slice(0, 8)}`;
}

export async function listPublicListings(filters: ListingsQueryInput = {}) {
  const where: Prisma.ProviderListingWhereInput = {
    listingStatus: ListingStatus.ACTIVE,
    visibilityStatus: VisibilityStatus.PUBLIC,
  };

  if (filters.providerType) {
    where.providerType = filters.providerType;
  }

  if (filters.modelFamily) {
    where.modelFamily = {
      contains: filters.modelFamily,
      mode: "insensitive",
    };
  }

  if (filters.featuredOnly) {
    where.isFeatured = true;
  }

  const listings = await db.providerListing.findMany({
    where,
    include: {
      providerProfile: {
        select: {
          displayName: true,
        },
      },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return listings.map(serializeListing);
}

export async function listProviderOwnedListings(providerProfileId: string) {
  const listings = await db.providerListing.findMany({
    where: {
      providerProfileId,
    },
    include: {
      providerProfile: {
        select: {
          displayName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return listings.map(serializeListing);
}

export async function getPublicListingBySlug(slug: string) {
  const listing = await db.providerListing.findFirst({
    where: {
      slug,
      listingStatus: ListingStatus.ACTIVE,
      visibilityStatus: {
        in: [VisibilityStatus.PUBLIC, VisibilityStatus.UNLISTED],
      },
    },
    include: {
      providerProfile: {
        select: {
          displayName: true,
          bio: true,
          countryCode: true,
        },
      },
    },
  });

  return listing ? serializeListing(listing) : null;
}

export async function createListing(input: CreateListingInput) {
  const credential = await db.providerCredential.findFirst({
    where: {
      id: input.providerCredentialId,
      providerProfileId: input.providerProfileId,
      status: "ACTIVE",
    },
    select: {
      id: true,
    },
  });

  if (!credential) {
    throw new Error(
      "Active provider credential not found for this provider profile.",
    );
  }

  const slug = await generateUniqueSlug(input.title);

  const freeTier =
    input.freeTierEnabled ||
    typeof input.freeTokenCap === "number" ||
    typeof input.freeRequestCap === "number";
  const metadata = freeTier
    ? {
        freeTier: {
          enabled: Boolean(input.freeTierEnabled),
          tokenCap: input.freeTokenCap ?? null,
          requestCap: input.freeRequestCap ?? null,
          maxDurationHours: input.freeMaxDurationHours ?? 1,
        },
      }
    : null;

  const listing = await db.providerListing.create({
    data: {
      providerProfileId: input.providerProfileId,
      providerCredentialId: input.providerCredentialId,
      title: input.title,
      slug,
      description: input.description || null,
      providerType: input.providerType,
      modelFamily: input.modelFamily,
      allowedModels: input.allowedModels,
      currencyCode: input.currencyCode.toUpperCase(),
      hourlyPrice: new Prisma.Decimal(input.hourlyPrice),
      platformFeeRate: new Prisma.Decimal(input.platformFeeRate),
      providerRevenueRate: new Prisma.Decimal(input.providerRevenueRate),
      requestLimit: input.requestLimit,
      spendCap:
        typeof input.spendCap === "number"
          ? new Prisma.Decimal(input.spendCap)
          : null,
      concurrencyLimit: input.concurrencyLimit,
      listingStatus: input.listingStatus,
      visibilityStatus: input.visibilityStatus,
      isFeatured: input.isFeatured,
      metadata: metadata ?? Prisma.JsonNull,
    },
    include: {
      providerProfile: {
        select: {
          displayName: true,
        },
      },
    },
  });

  return serializeListing(listing);
}
