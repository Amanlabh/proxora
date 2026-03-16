import {
  ListingStatus,
  ProviderType,
  VisibilityStatus,
} from "@/generated/prisma";
import { z } from "zod";

export const createListingSchema = z.object({
  providerProfileId: z.string().uuid("providerProfileId must be a UUID"),
  providerCredentialId: z.string().uuid("providerCredentialId must be a UUID"),
  title: z.string().min(4).max(120),
  description: z.string().max(2000).optional().or(z.literal("")),
  providerType: z.nativeEnum(ProviderType),
  modelFamily: z.string().min(2).max(80),
  allowedModels: z.array(z.string().min(1)).min(1),
  currencyCode: z.string().length(3).default("USD"),
  hourlyPrice: z.coerce.number().min(0),
  platformFeeRate: z.coerce.number().min(0).max(1).default(0.2),
  providerRevenueRate: z.coerce.number().min(0).max(1).default(0.8),
  requestLimit: z.coerce.number().int().positive().optional(),
  spendCap: z.coerce.number().positive().optional(),
  concurrencyLimit: z.coerce.number().int().positive().default(1),
  listingStatus: z.nativeEnum(ListingStatus).default(ListingStatus.DRAFT),
  visibilityStatus: z
    .nativeEnum(VisibilityStatus)
    .default(VisibilityStatus.PRIVATE),
  isFeatured: z.boolean().default(false),
  freeTierEnabled: z.coerce.boolean().optional().default(false),
  freeTokenCap: z.coerce.number().int().positive().optional(),
  freeRequestCap: z.coerce.number().int().positive().optional(),
  freeMaxDurationHours: z.coerce.number().int().positive().optional(),
});

export const createListingRequestSchema = createListingSchema.omit({
  providerProfileId: true,
});

export const listingsQuerySchema = z.object({
  providerType: z.nativeEnum(ProviderType).optional(),
  modelFamily: z.string().min(1).optional(),
  featuredOnly: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type CreateListingRequestInput = z.infer<
  typeof createListingRequestSchema
>;
export type ListingsQueryInput = z.infer<typeof listingsQuerySchema>;
