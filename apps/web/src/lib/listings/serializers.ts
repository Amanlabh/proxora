import type { ProviderListing } from "@/generated/prisma";

type ListingWithProvider = ProviderListing & {
  providerProfile?: {
    displayName: string;
  };
};

export function serializeListing(listing: ListingWithProvider) {
  const metadata =
    listing.metadata && typeof listing.metadata === "object"
      ? (listing.metadata as Record<string, unknown>)
      : null;
  const freeTier =
    metadata && typeof metadata.freeTier === "object"
      ? (metadata.freeTier as Record<string, unknown>)
      : null;

  return {
    id: listing.id,
    slug: listing.slug,
    title: listing.title,
    description: listing.description,
    providerType: listing.providerType,
    modelFamily: listing.modelFamily,
    allowedModels: listing.allowedModels,
    currencyCode: listing.currencyCode,
    hourlyPrice: Number(listing.hourlyPrice),
    platformFeeRate: Number(listing.platformFeeRate),
    providerRevenueRate: Number(listing.providerRevenueRate),
    requestLimit: listing.requestLimit,
    spendCap: listing.spendCap ? Number(listing.spendCap) : null,
    concurrencyLimit: listing.concurrencyLimit,
    listingStatus: listing.listingStatus,
    visibilityStatus: listing.visibilityStatus,
    isFeatured: listing.isFeatured,
    freeTier: freeTier
      ? {
          enabled: Boolean(freeTier.enabled),
          tokenCap:
            typeof freeTier.tokenCap === "number" ? freeTier.tokenCap : null,
          requestCap:
            typeof freeTier.requestCap === "number"
              ? freeTier.requestCap
              : null,
          maxDurationHours:
            typeof freeTier.maxDurationHours === "number"
              ? freeTier.maxDurationHours
              : null,
        }
      : null,
    providerDisplayName: listing.providerProfile?.displayName ?? null,
    createdAt: listing.createdAt.toISOString(),
    updatedAt: listing.updatedAt.toISOString(),
  };
}
