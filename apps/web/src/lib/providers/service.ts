import { db } from "@/lib/server/db";
import { encryptSecret } from "@/lib/security/encryption";
import type {
  CreateProviderCredentialInput,
  CreateProviderProfileInput,
} from "./schema";

function normalizeBaseUrl(baseUrl: string | null | undefined) {
  const fallback = "https://api.openai.com/v1";
  const value = (baseUrl ?? "").trim();

  if (!value) {
    return fallback;
  }

  return value.endsWith("/") ? value.slice(0, -1) : value;
}

async function validateProviderCredential(
  input: CreateProviderCredentialInput,
) {
  if (input.providerType !== "OPENAI_COMPATIBLE") {
    return {
      normalizedBaseUrl: normalizeBaseUrl(input.baseUrl),
      validatedAt: new Date(),
    };
  }

  const normalizedBaseUrl = normalizeBaseUrl(input.baseUrl);
  const response = await fetch(`${normalizedBaseUrl}/models`, {
    headers: {
      Authorization: `Bearer ${input.secret}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let providerMessage = `Provider validation failed with status ${response.status}.`;

    try {
      const payload = (await response.json()) as {
        error?: { message?: string } | string;
      };
      if (typeof payload.error === "string") {
        providerMessage = payload.error;
      } else if (payload.error?.message) {
        providerMessage = payload.error.message;
      }
    } catch {
      // Keep the generic provider validation error if the body is not JSON.
    }

    throw new Error(
      `We could not validate this provider key. ${providerMessage}`,
    );
  }

  return {
    normalizedBaseUrl,
    validatedAt: new Date(),
  };
}

export async function createProviderProfile(
  userId: string,
  input: CreateProviderProfileInput,
) {
  const existing = await db.providerProfile.findUnique({
    where: {
      userId,
    },
  });

  const metadata = {
    businessType: input.businessType,
    websiteUrl: input.websiteUrl || null,
    supportEmail: input.supportEmail || null,
    supportChannel: input.supportChannel || null,
    companyRegistrationNumber: input.companyRegistrationNumber || null,
    taxId: input.taxId || null,
    billingContact: {
      name: input.billingContactName || null,
      email: input.billingContactEmail || null,
    },
    technicalContact: {
      name: input.technicalContactName || null,
      email: input.technicalContactEmail || null,
    },
  };

  if (!existing) {
    return db.providerProfile.create({
      data: {
        userId,
        displayName: input.displayName,
        legalName: input.legalName || null,
        bio: input.bio || null,
        countryCode: input.countryCode?.toUpperCase() || null,
        metadata,
        status: "PENDING",
      },
    });
  }

  return db.providerProfile.update({
    where: {
      id: existing.id,
    },
    data: {
      displayName: input.displayName,
      legalName: input.legalName || null,
      bio: input.bio || null,
      countryCode: input.countryCode?.toUpperCase() || null,
      metadata,
    },
  });
}

export async function createProviderCredential(
  providerProfileId: string,
  input: CreateProviderCredentialInput,
) {
  const validation = await validateProviderCredential(input);
  const encrypted = encryptSecret(input.secret);
  const pricingMetadata = {
    baseUrl: validation.normalizedBaseUrl,
    docsUrl: input.docsUrl || null,
    consoleUrl: input.consoleUrl || null,
    pricing: {
      inputCostPer1kTokens: input.inputCostPer1kTokens ?? 0,
      outputCostPer1kTokens: input.outputCostPer1kTokens ?? 0,
    },
    rateLimits: {
      requestsPerMinuteLimit: input.requestsPerMinuteLimit ?? null,
      tokensPerMinuteLimit: input.tokensPerMinuteLimit ?? null,
    },
  };

  return db.providerCredential.create({
    data: {
      providerProfileId,
      providerType: input.providerType,
      label: input.label,
      supportedModels: input.supportedModels,
      metadata: {
        ...pricingMetadata,
        ...(input.metadata ?? {}),
      },
      status: input.status,
      ...encrypted,
      lastValidatedAt: validation.validatedAt,
      lastValidationError: null,
    },
  });
}

export async function listProviderCredentials(providerProfileId: string) {
  return db.providerCredential.findMany({
    where: {
      providerProfileId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
