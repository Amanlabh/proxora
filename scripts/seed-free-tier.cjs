const { PrismaClient, Prisma } = require("../apps/web/src/generated/prisma");

const providerProfileId = process.env.FREE_TIER_PROVIDER_PROFILE_ID;
const providerCredentialId = process.env.FREE_TIER_PROVIDER_CREDENTIAL_ID;

if (!providerProfileId || !providerCredentialId) {
  console.error(
    "Missing FREE_TIER_PROVIDER_PROFILE_ID or FREE_TIER_PROVIDER_CREDENTIAL_ID.",
  );
  process.exit(1);
}

const slug = process.env.FREE_TIER_SLUG || "free-tier-llm";
const title = process.env.FREE_TIER_TITLE || "Proxora Free Tier";
const description =
  process.env.FREE_TIER_DESCRIPTION ||
  "Free-tier LLM access with token caps and session limits.";
const modelFamily = process.env.FREE_TIER_MODEL_FAMILY || "opencode-zen";
const allowedModels = (process.env.FREE_TIER_ALLOWED_MODELS || "big-pickle")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const providerType = process.env.FREE_TIER_PROVIDER_TYPE || "OPENAI_COMPATIBLE";
const currencyCode = process.env.FREE_TIER_CURRENCY_CODE || "USD";
const hourlyPrice = new Prisma.Decimal(
  process.env.FREE_TIER_HOURLY_PRICE || "0",
);
const listingStatus = process.env.FREE_TIER_LISTING_STATUS || "ACTIVE";
const visibilityStatus = process.env.FREE_TIER_VISIBILITY_STATUS || "PUBLIC";
const platformFeeRate = new Prisma.Decimal(
  process.env.FREE_TIER_PLATFORM_FEE_RATE || "0",
);
const providerRevenueRate = new Prisma.Decimal(
  process.env.FREE_TIER_PROVIDER_REVENUE_RATE || "0",
);
const concurrencyLimit = Number(process.env.FREE_TIER_CONCURRENCY_LIMIT || 1);
const freeTokenCap = Number(process.env.FREE_TIER_TOKEN_CAP || 30000);
const freeRequestCap = Number(process.env.FREE_TIER_REQUEST_CAP || 100);
const freeMaxDurationHours = Number(process.env.FREE_TIER_MAX_HOURS || 1);

const prisma = new PrismaClient();

async function main() {
  const metadata = {
    freeTier: {
      enabled: true,
      tokenCap: freeTokenCap,
      requestCap: freeRequestCap,
      maxDurationHours: freeMaxDurationHours,
    },
  };

  const existing = await prisma.providerListing.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existing) {
    await prisma.providerListing.update({
      where: { id: existing.id },
      data: {
        providerProfileId,
        providerCredentialId,
        title,
        description,
        providerType,
        modelFamily,
        allowedModels,
        currencyCode,
        hourlyPrice,
        platformFeeRate,
        providerRevenueRate,
        requestLimit: freeRequestCap,
        spendCap: null,
        concurrencyLimit,
        listingStatus,
        visibilityStatus,
        isFeatured: true,
        metadata,
      },
    });
    console.log(`Updated free-tier listing: ${slug}`);
    return;
  }

  await prisma.providerListing.create({
    data: {
      providerProfileId,
      providerCredentialId,
      title,
      slug,
      description,
      providerType,
      modelFamily,
      allowedModels,
      currencyCode,
      hourlyPrice,
      platformFeeRate,
      providerRevenueRate,
      requestLimit: freeRequestCap,
      spendCap: null,
      concurrencyLimit,
      listingStatus,
      visibilityStatus,
      isFeatured: true,
      metadata,
    },
  });

  console.log(`Created free-tier listing: ${slug}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
