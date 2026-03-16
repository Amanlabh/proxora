import {
  CredentialStatus,
  ProviderStatus,
  ProviderType,
} from "@/generated/prisma";
import { z } from "zod";

const providerBusinessTypeSchema = z.enum(["INDIVIDUAL", "BUSINESS"]);

export const createProviderProfileSchema = z.object({
  displayName: z.string().min(3).max(80),
  legalName: z.string().max(120).optional().or(z.literal("")),
  bio: z.string().max(1000).optional().or(z.literal("")),
  countryCode: z.string().length(2).optional().or(z.literal("")),
  businessType: providerBusinessTypeSchema,
  websiteUrl: z.string().url().optional().or(z.literal("")),
  supportEmail: z.string().email().optional().or(z.literal("")),
  supportChannel: z.string().max(120).optional().or(z.literal("")),
  companyRegistrationNumber: z.string().max(120).optional().or(z.literal("")),
  taxId: z.string().max(120).optional().or(z.literal("")),
  billingContactName: z.string().max(120).optional().or(z.literal("")),
  billingContactEmail: z.string().email().optional().or(z.literal("")),
  technicalContactName: z.string().max(120).optional().or(z.literal("")),
  technicalContactEmail: z.string().email().optional().or(z.literal("")),
});

export const createProviderCredentialSchema = z.object({
  label: z.string().min(2).max(80),
  providerType: z.nativeEnum(ProviderType),
  secret: z.string().min(8),
  supportedModels: z.array(z.string().min(1)).min(1),
  baseUrl: z.string().url().optional().or(z.literal("")),
  docsUrl: z.string().url().optional().or(z.literal("")),
  consoleUrl: z.string().url().optional().or(z.literal("")),
  inputCostPer1kTokens: z.coerce.number().min(0).optional(),
  outputCostPer1kTokens: z.coerce.number().min(0).optional(),
  requestsPerMinuteLimit: z.coerce.number().int().min(0).optional(),
  tokensPerMinuteLimit: z.coerce.number().int().min(0).optional(),
  metadata: z.record(z.any()).optional(),
  status: z.nativeEnum(CredentialStatus).default(CredentialStatus.ACTIVE),
});

export const updateProviderProfileStatusSchema = z.object({
  status: z.nativeEnum(ProviderStatus),
});

export type CreateProviderProfileInput = z.infer<
  typeof createProviderProfileSchema
>;
export type CreateProviderCredentialInput = z.infer<
  typeof createProviderCredentialSchema
>;
