
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  supabaseAuthUserId: 'supabaseAuthUserId',
  email: 'email',
  displayName: 'displayName',
  avatarUrl: 'avatarUrl',
  role: 'role',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProviderProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  legalName: 'legalName',
  displayName: 'displayName',
  bio: 'bio',
  countryCode: 'countryCode',
  status: 'status',
  verifiedAt: 'verifiedAt',
  suspendedAt: 'suspendedAt',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProviderCredentialScalarFieldEnum = {
  id: 'id',
  providerProfileId: 'providerProfileId',
  providerType: 'providerType',
  label: 'label',
  encryptedSecret: 'encryptedSecret',
  encryptionIv: 'encryptionIv',
  encryptionTag: 'encryptionTag',
  encryptionKeyVersion: 'encryptionKeyVersion',
  metadata: 'metadata',
  supportedModels: 'supportedModels',
  status: 'status',
  lastValidatedAt: 'lastValidatedAt',
  lastValidationError: 'lastValidationError',
  revokedAt: 'revokedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProviderListingScalarFieldEnum = {
  id: 'id',
  providerProfileId: 'providerProfileId',
  providerCredentialId: 'providerCredentialId',
  title: 'title',
  slug: 'slug',
  description: 'description',
  providerType: 'providerType',
  modelFamily: 'modelFamily',
  allowedModels: 'allowedModels',
  currencyCode: 'currencyCode',
  hourlyPrice: 'hourlyPrice',
  platformFeeRate: 'platformFeeRate',
  providerRevenueRate: 'providerRevenueRate',
  requestLimit: 'requestLimit',
  spendCap: 'spendCap',
  concurrencyLimit: 'concurrencyLimit',
  listingStatus: 'listingStatus',
  visibilityStatus: 'visibilityStatus',
  isFeatured: 'isFeatured',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RentalScalarFieldEnum = {
  id: 'id',
  listingId: 'listingId',
  renterUserId: 'renterUserId',
  providerProfileId: 'providerProfileId',
  duration: 'duration',
  status: 'status',
  currencyCode: 'currencyCode',
  bookedPrice: 'bookedPrice',
  platformFeeAmount: 'platformFeeAmount',
  providerRevenueAmount: 'providerRevenueAmount',
  requestLimit: 'requestLimit',
  spendCap: 'spendCap',
  modelRestriction: 'modelRestriction',
  startsAt: 'startsAt',
  endsAt: 'endsAt',
  activatedAt: 'activatedAt',
  expiredAt: 'expiredAt',
  cancelledAt: 'cancelledAt',
  revokedAt: 'revokedAt',
  totalRequests: 'totalRequests',
  totalInputTokens: 'totalInputTokens',
  totalOutputTokens: 'totalOutputTokens',
  totalCost: 'totalCost',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RentalSessionScalarFieldEnum = {
  id: 'id',
  rentalId: 'rentalId',
  status: 'status',
  tokenHash: 'tokenHash',
  issuedAt: 'issuedAt',
  expiresAt: 'expiresAt',
  revokedAt: 'revokedAt',
  suspendedAt: 'suspendedAt',
  lastUsedAt: 'lastUsedAt',
  requesterIp: 'requesterIp',
  userAgent: 'userAgent',
  requestCount: 'requestCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UsageEventScalarFieldEnum = {
  id: 'id',
  rentalId: 'rentalId',
  rentalSessionId: 'rentalSessionId',
  eventType: 'eventType',
  providerType: 'providerType',
  model: 'model',
  requestId: 'requestId',
  inputTokens: 'inputTokens',
  outputTokens: 'outputTokens',
  totalTokens: 'totalTokens',
  costAmount: 'costAmount',
  currencyCode: 'currencyCode',
  statusCode: 'statusCode',
  latencyMs: 'latencyMs',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.RentalChatMessageScalarFieldEnum = {
  id: 'id',
  rentalId: 'rentalId',
  rentalSessionId: 'rentalSessionId',
  role: 'role',
  model: 'model',
  content: 'content',
  requestId: 'requestId',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.WalletScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  status: 'status',
  currencyCode: 'currencyCode',
  balance: 'balance',
  heldBalance: 'heldBalance',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LedgerEntryScalarFieldEnum = {
  id: 'id',
  walletId: 'walletId',
  rentalId: 'rentalId',
  payoutId: 'payoutId',
  entryType: 'entryType',
  direction: 'direction',
  amount: 'amount',
  currencyCode: 'currencyCode',
  balanceAfter: 'balanceAfter',
  reference: 'reference',
  description: 'description',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.PayoutScalarFieldEnum = {
  id: 'id',
  providerProfileId: 'providerProfileId',
  amount: 'amount',
  currencyCode: 'currencyCode',
  status: 'status',
  externalReference: 'externalReference',
  requestedAt: 'requestedAt',
  processedAt: 'processedAt',
  failureReason: 'failureReason',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DisputeScalarFieldEnum = {
  id: 'id',
  rentalId: 'rentalId',
  openedByUserId: 'openedByUserId',
  providerProfileId: 'providerProfileId',
  status: 'status',
  reason: 'reason',
  resolution: 'resolution',
  resolvedAt: 'resolvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  rentalId: 'rentalId',
  action: 'action',
  targetType: 'targetType',
  targetId: 'targetId',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.PlatformRole = exports.$Enums.PlatformRole = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.UserStatus = exports.$Enums.UserStatus = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED'
};

exports.ProviderStatus = exports.$Enums.ProviderStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
  SUSPENDED: 'SUSPENDED'
};

exports.ProviderType = exports.$Enums.ProviderType = {
  OPENAI_COMPATIBLE: 'OPENAI_COMPATIBLE',
  ANTHROPIC: 'ANTHROPIC',
  GOOGLE: 'GOOGLE',
  OTHER: 'OTHER'
};

exports.CredentialStatus = exports.$Enums.CredentialStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INVALID: 'INVALID',
  REVOKED: 'REVOKED'
};

exports.ListingStatus = exports.$Enums.ListingStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  ARCHIVED: 'ARCHIVED'
};

exports.VisibilityStatus = exports.$Enums.VisibilityStatus = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
  UNLISTED: 'UNLISTED'
};

exports.RentalDuration = exports.$Enums.RentalDuration = {
  ONE_HOUR: 'ONE_HOUR',
  TWO_HOURS: 'TWO_HOURS',
  SIX_HOURS: 'SIX_HOURS',
  TWENTY_FOUR_HOURS: 'TWENTY_FOUR_HOURS'
};

exports.RentalStatus = exports.$Enums.RentalStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  SUSPENDED: 'SUSPENDED',
  REVOKED: 'REVOKED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.SessionStatus = exports.$Enums.SessionStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  SUSPENDED: 'SUSPENDED',
  REVOKED: 'REVOKED'
};

exports.UsageEventType = exports.$Enums.UsageEventType = {
  REQUEST: 'REQUEST',
  RESPONSE: 'RESPONSE',
  BILLING: 'BILLING',
  ADJUSTMENT: 'ADJUSTMENT',
  ERROR: 'ERROR'
};

exports.ChatMessageRole = exports.$Enums.ChatMessageRole = {
  SYSTEM: 'SYSTEM',
  USER: 'USER',
  ASSISTANT: 'ASSISTANT'
};

exports.WalletStatus = exports.$Enums.WalletStatus = {
  ACTIVE: 'ACTIVE',
  FROZEN: 'FROZEN',
  CLOSED: 'CLOSED'
};

exports.LedgerEntryType = exports.$Enums.LedgerEntryType = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
  ESCROW_HOLD: 'ESCROW_HOLD',
  ESCROW_RELEASE: 'ESCROW_RELEASE',
  RENTAL_CHARGE: 'RENTAL_CHARGE',
  PROVIDER_EARNING: 'PROVIDER_EARNING',
  PLATFORM_FEE: 'PLATFORM_FEE',
  REFUND: 'REFUND',
  PAYOUT: 'PAYOUT',
  ADJUSTMENT: 'ADJUSTMENT'
};

exports.LedgerDirection = exports.$Enums.LedgerDirection = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT'
};

exports.PayoutStatus = exports.$Enums.PayoutStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

exports.DisputeStatus = exports.$Enums.DisputeStatus = {
  OPEN: 'OPEN',
  IN_REVIEW: 'IN_REVIEW',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED'
};

exports.Prisma.ModelName = {
  User: 'User',
  ProviderProfile: 'ProviderProfile',
  ProviderCredential: 'ProviderCredential',
  ProviderListing: 'ProviderListing',
  Rental: 'Rental',
  RentalSession: 'RentalSession',
  UsageEvent: 'UsageEvent',
  RentalChatMessage: 'RentalChatMessage',
  Wallet: 'Wallet',
  LedgerEntry: 'LedgerEntry',
  Payout: 'Payout',
  Dispute: 'Dispute',
  AuditLog: 'AuditLog'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/aman/Developer/agent-collect/apps/web/src/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/aman/Developer/agent-collect/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../../../../prisma",
  "clientVersion": "6.4.1",
  "engineVersion": "a9055b89e58b4b5bfb59600785423b1db3d0e75d",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../apps/web/src/generated/prisma\"\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\")\n  directUrl = env(\"DIRECT_URL\")\n}\n\nenum PlatformRole {\n  USER\n  ADMIN\n\n  @@map(\"platform_role\")\n}\n\nenum UserStatus {\n  ACTIVE\n  SUSPENDED\n  DELETED\n\n  @@map(\"user_status\")\n}\n\nenum ProviderStatus {\n  PENDING\n  VERIFIED\n  REJECTED\n  SUSPENDED\n\n  @@map(\"provider_status\")\n}\n\nenum ProviderType {\n  OPENAI_COMPATIBLE\n  ANTHROPIC\n  GOOGLE\n  OTHER\n\n  @@map(\"provider_type\")\n}\n\nenum CredentialStatus {\n  PENDING\n  ACTIVE\n  INVALID\n  REVOKED\n\n  @@map(\"credential_status\")\n}\n\nenum ListingStatus {\n  DRAFT\n  ACTIVE\n  PAUSED\n  ARCHIVED\n\n  @@map(\"listing_status\")\n}\n\nenum VisibilityStatus {\n  PRIVATE\n  PUBLIC\n  UNLISTED\n\n  @@map(\"visibility_status\")\n}\n\nenum RentalDuration {\n  ONE_HOUR\n  TWO_HOURS\n  SIX_HOURS\n  TWENTY_FOUR_HOURS\n\n  @@map(\"rental_duration\")\n}\n\nenum RentalStatus {\n  PENDING\n  ACTIVE\n  EXPIRED\n  SUSPENDED\n  REVOKED\n  COMPLETED\n  CANCELLED\n\n  @@map(\"rental_status\")\n}\n\nenum SessionStatus {\n  PENDING\n  ACTIVE\n  EXPIRED\n  SUSPENDED\n  REVOKED\n\n  @@map(\"session_status\")\n}\n\nenum UsageEventType {\n  REQUEST\n  RESPONSE\n  BILLING\n  ADJUSTMENT\n  ERROR\n\n  @@map(\"usage_event_type\")\n}\n\nenum ChatMessageRole {\n  SYSTEM\n  USER\n  ASSISTANT\n\n  @@map(\"chat_message_role\")\n}\n\nenum WalletStatus {\n  ACTIVE\n  FROZEN\n  CLOSED\n\n  @@map(\"wallet_status\")\n}\n\nenum LedgerEntryType {\n  DEPOSIT\n  WITHDRAWAL\n  ESCROW_HOLD\n  ESCROW_RELEASE\n  RENTAL_CHARGE\n  PROVIDER_EARNING\n  PLATFORM_FEE\n  REFUND\n  PAYOUT\n  ADJUSTMENT\n\n  @@map(\"ledger_entry_type\")\n}\n\nenum LedgerDirection {\n  CREDIT\n  DEBIT\n\n  @@map(\"ledger_direction\")\n}\n\nenum PayoutStatus {\n  PENDING\n  PROCESSING\n  PAID\n  FAILED\n  CANCELLED\n\n  @@map(\"payout_status\")\n}\n\nenum DisputeStatus {\n  OPEN\n  IN_REVIEW\n  RESOLVED\n  REJECTED\n\n  @@map(\"dispute_status\")\n}\n\nmodel User {\n  id                 String       @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  supabaseAuthUserId String       @unique @map(\"supabase_auth_user_id\") @db.Uuid\n  email              String       @unique\n  displayName        String?      @map(\"display_name\")\n  avatarUrl          String?      @map(\"avatar_url\")\n  role               PlatformRole @default(USER)\n  status             UserStatus   @default(ACTIVE)\n  createdAt          DateTime     @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt          DateTime     @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  providerProfile ProviderProfile?\n  wallet          Wallet?\n  rentals         Rental[]\n  disputes        Dispute[]\n  auditLogs       AuditLog[]\n\n  @@index([status])\n  @@map(\"users\")\n}\n\nmodel ProviderProfile {\n  id          String         @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  userId      String         @unique @map(\"user_id\") @db.Uuid\n  legalName   String?        @map(\"legal_name\")\n  displayName String         @map(\"display_name\")\n  bio         String?\n  countryCode String?        @map(\"country_code\")\n  status      ProviderStatus @default(PENDING)\n  verifiedAt  DateTime?      @map(\"verified_at\") @db.Timestamptz(6)\n  suspendedAt DateTime?      @map(\"suspended_at\") @db.Timestamptz(6)\n  metadata    Json?          @map(\"metadata\")\n  createdAt   DateTime       @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt   DateTime       @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  user        User                 @relation(fields: [userId], references: [id], onDelete: Cascade)\n  credentials ProviderCredential[]\n  listings    ProviderListing[]\n  payouts     Payout[]\n  rentals     Rental[]\n  disputes    Dispute[]\n\n  @@index([status])\n  @@map(\"provider_profiles\")\n}\n\nmodel ProviderCredential {\n  id                   String           @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  providerProfileId    String           @map(\"provider_profile_id\") @db.Uuid\n  providerType         ProviderType     @map(\"provider_type\")\n  label                String\n  encryptedSecret      String           @map(\"encrypted_secret\")\n  encryptionIv         String           @map(\"encryption_iv\")\n  encryptionTag        String           @map(\"encryption_tag\")\n  encryptionKeyVersion String           @map(\"encryption_key_version\")\n  metadata             Json?\n  supportedModels      String[]         @map(\"supported_models\")\n  status               CredentialStatus @default(PENDING)\n  lastValidatedAt      DateTime?        @map(\"last_validated_at\") @db.Timestamptz(6)\n  lastValidationError  String?          @map(\"last_validation_error\")\n  revokedAt            DateTime?        @map(\"revoked_at\") @db.Timestamptz(6)\n  createdAt            DateTime         @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt            DateTime         @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  providerProfile ProviderProfile   @relation(fields: [providerProfileId], references: [id], onDelete: Cascade)\n  listings        ProviderListing[]\n\n  @@index([providerProfileId, status])\n  @@index([providerType])\n  @@map(\"provider_credentials\")\n}\n\nmodel ProviderListing {\n  id                   String           @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  providerProfileId    String           @map(\"provider_profile_id\") @db.Uuid\n  providerCredentialId String           @map(\"provider_credential_id\") @db.Uuid\n  title                String\n  slug                 String           @unique\n  description          String?\n  providerType         ProviderType     @map(\"provider_type\")\n  modelFamily          String           @map(\"model_family\")\n  allowedModels        String[]         @map(\"allowed_models\")\n  currencyCode         String           @default(\"USD\") @map(\"currency_code\")\n  hourlyPrice          Decimal          @map(\"hourly_price\") @db.Decimal(18, 6)\n  platformFeeRate      Decimal          @map(\"platform_fee_rate\") @db.Decimal(5, 4)\n  providerRevenueRate  Decimal          @map(\"provider_revenue_rate\") @db.Decimal(5, 4)\n  requestLimit         Int?             @map(\"request_limit\")\n  spendCap             Decimal?         @map(\"spend_cap\") @db.Decimal(18, 6)\n  concurrencyLimit     Int              @default(1) @map(\"concurrency_limit\")\n  listingStatus        ListingStatus    @default(DRAFT) @map(\"listing_status\")\n  visibilityStatus     VisibilityStatus @default(PRIVATE) @map(\"visibility_status\")\n  isFeatured           Boolean          @default(false) @map(\"is_featured\")\n  metadata             Json?            @map(\"metadata\")\n  createdAt            DateTime         @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt            DateTime         @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  providerProfile ProviderProfile    @relation(fields: [providerProfileId], references: [id], onDelete: Cascade)\n  credential      ProviderCredential @relation(fields: [providerCredentialId], references: [id], onDelete: Restrict)\n  rentals         Rental[]\n\n  @@index([providerProfileId, listingStatus])\n  @@index([visibilityStatus, listingStatus])\n  @@index([providerType, modelFamily])\n  @@map(\"provider_listings\")\n}\n\nmodel Rental {\n  id                    String         @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  listingId             String         @map(\"listing_id\") @db.Uuid\n  renterUserId          String         @map(\"renter_user_id\") @db.Uuid\n  providerProfileId     String         @map(\"provider_profile_id\") @db.Uuid\n  duration              RentalDuration\n  status                RentalStatus   @default(PENDING)\n  currencyCode          String         @default(\"USD\") @map(\"currency_code\")\n  bookedPrice           Decimal        @map(\"booked_price\") @db.Decimal(18, 6)\n  platformFeeAmount     Decimal        @map(\"platform_fee_amount\") @db.Decimal(18, 6)\n  providerRevenueAmount Decimal        @map(\"provider_revenue_amount\") @db.Decimal(18, 6)\n  requestLimit          Int?           @map(\"request_limit\")\n  spendCap              Decimal?       @map(\"spend_cap\") @db.Decimal(18, 6)\n  modelRestriction      String?        @map(\"model_restriction\")\n  startsAt              DateTime?      @map(\"starts_at\") @db.Timestamptz(6)\n  endsAt                DateTime?      @map(\"ends_at\") @db.Timestamptz(6)\n  activatedAt           DateTime?      @map(\"activated_at\") @db.Timestamptz(6)\n  expiredAt             DateTime?      @map(\"expired_at\") @db.Timestamptz(6)\n  cancelledAt           DateTime?      @map(\"cancelled_at\") @db.Timestamptz(6)\n  revokedAt             DateTime?      @map(\"revoked_at\") @db.Timestamptz(6)\n  totalRequests         Int            @default(0) @map(\"total_requests\")\n  totalInputTokens      Int            @default(0) @map(\"total_input_tokens\")\n  totalOutputTokens     Int            @default(0) @map(\"total_output_tokens\")\n  totalCost             Decimal        @default(0) @map(\"total_cost\") @db.Decimal(18, 6)\n  createdAt             DateTime       @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt             DateTime       @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  listing       ProviderListing     @relation(fields: [listingId], references: [id], onDelete: Restrict)\n  renter        User                @relation(fields: [renterUserId], references: [id], onDelete: Restrict)\n  provider      ProviderProfile     @relation(fields: [providerProfileId], references: [id], onDelete: Restrict)\n  sessions      RentalSession[]\n  usageEvents   UsageEvent[]\n  chatMessages  RentalChatMessage[]\n  ledgerEntries LedgerEntry[]\n  disputes      Dispute[]\n  auditLogs     AuditLog[]\n\n  @@index([renterUserId, status])\n  @@index([providerProfileId, status])\n  @@index([listingId, status])\n  @@index([startsAt, endsAt])\n  @@map(\"rentals\")\n}\n\nmodel RentalSession {\n  id           String        @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  rentalId     String        @map(\"rental_id\") @db.Uuid\n  status       SessionStatus @default(PENDING)\n  tokenHash    String        @unique @map(\"token_hash\")\n  issuedAt     DateTime?     @map(\"issued_at\") @db.Timestamptz(6)\n  expiresAt    DateTime      @map(\"expires_at\") @db.Timestamptz(6)\n  revokedAt    DateTime?     @map(\"revoked_at\") @db.Timestamptz(6)\n  suspendedAt  DateTime?     @map(\"suspended_at\") @db.Timestamptz(6)\n  lastUsedAt   DateTime?     @map(\"last_used_at\") @db.Timestamptz(6)\n  requesterIp  String?       @map(\"requester_ip\")\n  userAgent    String?       @map(\"user_agent\")\n  requestCount Int           @default(0) @map(\"request_count\")\n  createdAt    DateTime      @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt    DateTime      @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  rental       Rental              @relation(fields: [rentalId], references: [id], onDelete: Cascade)\n  usageEvents  UsageEvent[]\n  chatMessages RentalChatMessage[]\n\n  @@index([rentalId, status])\n  @@index([expiresAt])\n  @@map(\"rental_sessions\")\n}\n\nmodel UsageEvent {\n  id              String         @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  rentalId        String         @map(\"rental_id\") @db.Uuid\n  rentalSessionId String?        @map(\"rental_session_id\") @db.Uuid\n  eventType       UsageEventType @map(\"event_type\")\n  providerType    ProviderType   @map(\"provider_type\")\n  model           String\n  requestId       String?        @map(\"request_id\")\n  inputTokens     Int?           @map(\"input_tokens\")\n  outputTokens    Int?           @map(\"output_tokens\")\n  totalTokens     Int?           @map(\"total_tokens\")\n  costAmount      Decimal?       @map(\"cost_amount\") @db.Decimal(18, 6)\n  currencyCode    String?        @default(\"USD\") @map(\"currency_code\")\n  statusCode      Int?           @map(\"status_code\")\n  latencyMs       Int?           @map(\"latency_ms\")\n  metadata        Json?\n  createdAt       DateTime       @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n\n  rental        Rental         @relation(fields: [rentalId], references: [id], onDelete: Cascade)\n  rentalSession RentalSession? @relation(fields: [rentalSessionId], references: [id], onDelete: SetNull)\n\n  @@index([rentalId, createdAt])\n  @@index([rentalSessionId])\n  @@index([providerType, model])\n  @@map(\"usage_events\")\n}\n\nmodel RentalChatMessage {\n  id              String          @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  rentalId        String          @map(\"rental_id\") @db.Uuid\n  rentalSessionId String?         @map(\"rental_session_id\") @db.Uuid\n  role            ChatMessageRole\n  model           String?\n  content         String\n  requestId       String?         @map(\"request_id\")\n  metadata        Json?\n  createdAt       DateTime        @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n\n  rental        Rental         @relation(fields: [rentalId], references: [id], onDelete: Cascade)\n  rentalSession RentalSession? @relation(fields: [rentalSessionId], references: [id], onDelete: SetNull)\n\n  @@index([rentalId, createdAt])\n  @@index([rentalSessionId])\n  @@map(\"rental_chat_messages\")\n}\n\nmodel Wallet {\n  id           String       @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  userId       String       @unique @map(\"user_id\") @db.Uuid\n  status       WalletStatus @default(ACTIVE)\n  currencyCode String       @default(\"USD\") @map(\"currency_code\")\n  balance      Decimal      @default(0) @db.Decimal(18, 6)\n  heldBalance  Decimal      @default(0) @map(\"held_balance\") @db.Decimal(18, 6)\n  metadata     Json?        @map(\"metadata\")\n  createdAt    DateTime     @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt    DateTime     @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  user          User          @relation(fields: [userId], references: [id], onDelete: Cascade)\n  ledgerEntries LedgerEntry[]\n\n  @@index([status])\n  @@map(\"wallets\")\n}\n\nmodel LedgerEntry {\n  id           String          @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  walletId     String          @map(\"wallet_id\") @db.Uuid\n  rentalId     String?         @map(\"rental_id\") @db.Uuid\n  payoutId     String?         @map(\"payout_id\") @db.Uuid\n  entryType    LedgerEntryType @map(\"entry_type\")\n  direction    LedgerDirection\n  amount       Decimal         @db.Decimal(18, 6)\n  currencyCode String          @default(\"USD\") @map(\"currency_code\")\n  balanceAfter Decimal?        @map(\"balance_after\") @db.Decimal(18, 6)\n  reference    String?\n  description  String?\n  metadata     Json?\n  createdAt    DateTime        @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n\n  wallet Wallet  @relation(fields: [walletId], references: [id], onDelete: Cascade)\n  rental Rental? @relation(fields: [rentalId], references: [id], onDelete: SetNull)\n  payout Payout? @relation(fields: [payoutId], references: [id], onDelete: SetNull)\n\n  @@index([walletId, createdAt])\n  @@index([rentalId])\n  @@index([payoutId])\n  @@map(\"ledger_entries\")\n}\n\nmodel Payout {\n  id                String       @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  providerProfileId String       @map(\"provider_profile_id\") @db.Uuid\n  amount            Decimal      @db.Decimal(18, 6)\n  currencyCode      String       @default(\"USD\") @map(\"currency_code\")\n  status            PayoutStatus @default(PENDING)\n  externalReference String?      @map(\"external_reference\")\n  requestedAt       DateTime     @default(now()) @map(\"requested_at\") @db.Timestamptz(6)\n  processedAt       DateTime?    @map(\"processed_at\") @db.Timestamptz(6)\n  failureReason     String?      @map(\"failure_reason\")\n  createdAt         DateTime     @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt         DateTime     @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  providerProfile ProviderProfile @relation(fields: [providerProfileId], references: [id], onDelete: Restrict)\n  ledgerEntries   LedgerEntry[]\n\n  @@index([providerProfileId, status])\n  @@map(\"payouts\")\n}\n\nmodel Dispute {\n  id                String        @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  rentalId          String        @map(\"rental_id\") @db.Uuid\n  openedByUserId    String        @map(\"opened_by_user_id\") @db.Uuid\n  providerProfileId String?       @map(\"provider_profile_id\") @db.Uuid\n  status            DisputeStatus @default(OPEN)\n  reason            String\n  resolution        String?\n  resolvedAt        DateTime?     @map(\"resolved_at\") @db.Timestamptz(6)\n  createdAt         DateTime      @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt         DateTime      @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  rental          Rental           @relation(fields: [rentalId], references: [id], onDelete: Cascade)\n  openedBy        User             @relation(fields: [openedByUserId], references: [id], onDelete: Restrict)\n  providerProfile ProviderProfile? @relation(fields: [providerProfileId], references: [id], onDelete: SetNull)\n\n  @@index([rentalId, status])\n  @@index([openedByUserId])\n  @@map(\"disputes\")\n}\n\nmodel AuditLog {\n  id         String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  userId     String?  @map(\"user_id\") @db.Uuid\n  rentalId   String?  @map(\"rental_id\") @db.Uuid\n  action     String\n  targetType String   @map(\"target_type\")\n  targetId   String?  @map(\"target_id\")\n  ipAddress  String?  @map(\"ip_address\")\n  userAgent  String?  @map(\"user_agent\")\n  metadata   Json?\n  createdAt  DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n\n  user   User?   @relation(fields: [userId], references: [id], onDelete: SetNull)\n  rental Rental? @relation(fields: [rentalId], references: [id], onDelete: SetNull)\n\n  @@index([userId, createdAt])\n  @@index([rentalId, createdAt])\n  @@index([targetType, targetId])\n  @@map(\"audit_logs\")\n}\n",
  "inlineSchemaHash": "cb4f6a5c821344f554f1d2f98efeb7ca3598da7e7218aca8721cfcc25f402deb",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "apps/web/src/generated/prisma",
    "web/src/generated/prisma",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":\"users\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supabaseAuthUserId\",\"dbName\":\"supabase_auth_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"displayName\",\"dbName\":\"display_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avatarUrl\",\"dbName\":\"avatar_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PlatformRole\",\"nativeType\":null,\"default\":\"USER\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"UserStatus\",\"nativeType\":null,\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"providerProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderProfile\",\"nativeType\":null,\"relationName\":\"ProviderProfileToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wallet\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Wallet\",\"nativeType\":null,\"relationName\":\"UserToWallet\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Rental\",\"nativeType\":null,\"relationName\":\"RentalToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"disputes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Dispute\",\"nativeType\":null,\"relationName\":\"DisputeToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auditLogs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuditLog\",\"nativeType\":null,\"relationName\":\"AuditLogToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProviderProfile\":{\"dbName\":\"provider_profiles\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"legalName\",\"dbName\":\"legal_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"displayName\",\"dbName\":\"display_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bio\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"dbName\":\"country_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ProviderStatus\",\"nativeType\":null,\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verifiedAt\",\"dbName\":\"verified_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"suspendedAt\",\"dbName\":\"suspended_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"dbName\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"ProviderProfileToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"credentials\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderCredential\",\"nativeType\":null,\"relationName\":\"ProviderCredentialToProviderProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"listings\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderListing\",\"nativeType\":null,\"relationName\":\"ProviderListingToProviderProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payouts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payout\",\"nativeType\":null,\"relationName\":\"PayoutToProviderProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Rental\",\"nativeType\":null,\"relationName\":\"ProviderProfileToRental\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"disputes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Dispute\",\"nativeType\":null,\"relationName\":\"DisputeToProviderProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProviderCredential\":{\"dbName\":\"provider_credentials\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerProfileId\",\"dbName\":\"provider_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerType\",\"dbName\":\"provider_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"encryptedSecret\",\"dbName\":\"encrypted_secret\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"encryptionIv\",\"dbName\":\"encryption_iv\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"encryptionTag\",\"dbName\":\"encryption_tag\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"encryptionKeyVersion\",\"dbName\":\"encryption_key_version\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supportedModels\",\"dbName\":\"supported_models\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CredentialStatus\",\"nativeType\":null,\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastValidatedAt\",\"dbName\":\"last_validated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastValidationError\",\"dbName\":\"last_validation_error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"revokedAt\",\"dbName\":\"revoked_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"providerProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderProfile\",\"nativeType\":null,\"relationName\":\"ProviderCredentialToProviderProfile\",\"relationFromFields\":[\"providerProfileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"listings\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderListing\",\"nativeType\":null,\"relationName\":\"ProviderCredentialToProviderListing\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProviderListing\":{\"dbName\":\"provider_listings\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerProfileId\",\"dbName\":\"provider_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerCredentialId\",\"dbName\":\"provider_credential_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerType\",\"dbName\":\"provider_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modelFamily\",\"dbName\":\"model_family\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"allowedModels\",\"dbName\":\"allowed_models\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyCode\",\"dbName\":\"currency_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"USD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hourlyPrice\",\"dbName\":\"hourly_price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"platformFeeRate\",\"dbName\":\"platform_fee_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"5\",\"4\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerRevenueRate\",\"dbName\":\"provider_revenue_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"5\",\"4\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestLimit\",\"dbName\":\"request_limit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spendCap\",\"dbName\":\"spend_cap\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"concurrencyLimit\",\"dbName\":\"concurrency_limit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"listingStatus\",\"dbName\":\"listing_status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ListingStatus\",\"nativeType\":null,\"default\":\"DRAFT\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"visibilityStatus\",\"dbName\":\"visibility_status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"VisibilityStatus\",\"nativeType\":null,\"default\":\"PRIVATE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isFeatured\",\"dbName\":\"is_featured\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"dbName\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"providerProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderProfile\",\"nativeType\":null,\"relationName\":\"ProviderListingToProviderProfile\",\"relationFromFields\":[\"providerProfileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"credential\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderCredential\",\"nativeType\":null,\"relationName\":\"ProviderCredentialToProviderListing\",\"relationFromFields\":[\"providerCredentialId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Rental\",\"nativeType\":null,\"relationName\":\"ProviderListingToRental\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Rental\":{\"dbName\":\"rentals\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"listingId\",\"dbName\":\"listing_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"renterUserId\",\"dbName\":\"renter_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerProfileId\",\"dbName\":\"provider_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"duration\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RentalDuration\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"RentalStatus\",\"nativeType\":null,\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyCode\",\"dbName\":\"currency_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"USD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bookedPrice\",\"dbName\":\"booked_price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"platformFeeAmount\",\"dbName\":\"platform_fee_amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerRevenueAmount\",\"dbName\":\"provider_revenue_amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestLimit\",\"dbName\":\"request_limit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spendCap\",\"dbName\":\"spend_cap\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modelRestriction\",\"dbName\":\"model_restriction\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startsAt\",\"dbName\":\"starts_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endsAt\",\"dbName\":\"ends_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"activatedAt\",\"dbName\":\"activated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiredAt\",\"dbName\":\"expired_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cancelledAt\",\"dbName\":\"cancelled_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"revokedAt\",\"dbName\":\"revoked_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalRequests\",\"dbName\":\"total_requests\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalInputTokens\",\"dbName\":\"total_input_tokens\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalOutputTokens\",\"dbName\":\"total_output_tokens\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalCost\",\"dbName\":\"total_cost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"listing\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderListing\",\"nativeType\":null,\"relationName\":\"ProviderListingToRental\",\"relationFromFields\":[\"listingId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"renter\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"RentalToUser\",\"relationFromFields\":[\"renterUserId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderProfile\",\"nativeType\":null,\"relationName\":\"ProviderProfileToRental\",\"relationFromFields\":[\"providerProfileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RentalSession\",\"nativeType\":null,\"relationName\":\"RentalToRentalSession\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usageEvents\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UsageEvent\",\"nativeType\":null,\"relationName\":\"RentalToUsageEvent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chatMessages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RentalChatMessage\",\"nativeType\":null,\"relationName\":\"RentalToRentalChatMessage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ledgerEntries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LedgerEntry\",\"nativeType\":null,\"relationName\":\"LedgerEntryToRental\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"disputes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Dispute\",\"nativeType\":null,\"relationName\":\"DisputeToRental\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auditLogs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuditLog\",\"nativeType\":null,\"relationName\":\"AuditLogToRental\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RentalSession\":{\"dbName\":\"rental_sessions\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentalId\",\"dbName\":\"rental_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"SessionStatus\",\"nativeType\":null,\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tokenHash\",\"dbName\":\"token_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"issuedAt\",\"dbName\":\"issued_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"revokedAt\",\"dbName\":\"revoked_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"suspendedAt\",\"dbName\":\"suspended_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastUsedAt\",\"dbName\":\"last_used_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requesterIp\",\"dbName\":\"requester_ip\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"dbName\":\"user_agent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestCount\",\"dbName\":\"request_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"rental\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Rental\",\"nativeType\":null,\"relationName\":\"RentalToRentalSession\",\"relationFromFields\":[\"rentalId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usageEvents\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UsageEvent\",\"nativeType\":null,\"relationName\":\"RentalSessionToUsageEvent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chatMessages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RentalChatMessage\",\"nativeType\":null,\"relationName\":\"RentalChatMessageToRentalSession\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UsageEvent\":{\"dbName\":\"usage_events\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentalId\",\"dbName\":\"rental_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentalSessionId\",\"dbName\":\"rental_session_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventType\",\"dbName\":\"event_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UsageEventType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerType\",\"dbName\":\"provider_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"model\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"dbName\":\"request_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"inputTokens\",\"dbName\":\"input_tokens\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"outputTokens\",\"dbName\":\"output_tokens\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalTokens\",\"dbName\":\"total_tokens\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"costAmount\",\"dbName\":\"cost_amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyCode\",\"dbName\":\"currency_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"USD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"statusCode\",\"dbName\":\"status_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latencyMs\",\"dbName\":\"latency_ms\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rental\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Rental\",\"nativeType\":null,\"relationName\":\"RentalToUsageEvent\",\"relationFromFields\":[\"rentalId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentalSession\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RentalSession\",\"nativeType\":null,\"relationName\":\"RentalSessionToUsageEvent\",\"relationFromFields\":[\"rentalSessionId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RentalChatMessage\":{\"dbName\":\"rental_chat_messages\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentalId\",\"dbName\":\"rental_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentalSessionId\",\"dbName\":\"rental_session_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChatMessageRole\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"model\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"dbName\":\"request_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rental\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Rental\",\"nativeType\":null,\"relationName\":\"RentalToRentalChatMessage\",\"relationFromFields\":[\"rentalId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentalSession\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RentalSession\",\"nativeType\":null,\"relationName\":\"RentalChatMessageToRentalSession\",\"relationFromFields\":[\"rentalSessionId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Wallet\":{\"dbName\":\"wallets\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"WalletStatus\",\"nativeType\":null,\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyCode\",\"dbName\":\"currency_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"USD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"balance\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"heldBalance\",\"dbName\":\"held_balance\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"dbName\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"UserToWallet\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ledgerEntries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LedgerEntry\",\"nativeType\":null,\"relationName\":\"LedgerEntryToWallet\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"LedgerEntry\":{\"dbName\":\"ledger_entries\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"walletId\",\"dbName\":\"wallet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentalId\",\"dbName\":\"rental_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payoutId\",\"dbName\":\"payout_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entryType\",\"dbName\":\"entry_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LedgerEntryType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"direction\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LedgerDirection\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyCode\",\"dbName\":\"currency_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"USD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"balanceAfter\",\"dbName\":\"balance_after\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reference\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wallet\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Wallet\",\"nativeType\":null,\"relationName\":\"LedgerEntryToWallet\",\"relationFromFields\":[\"walletId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rental\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Rental\",\"nativeType\":null,\"relationName\":\"LedgerEntryToRental\",\"relationFromFields\":[\"rentalId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payout\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payout\",\"nativeType\":null,\"relationName\":\"LedgerEntryToPayout\",\"relationFromFields\":[\"payoutId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Payout\":{\"dbName\":\"payouts\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerProfileId\",\"dbName\":\"provider_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyCode\",\"dbName\":\"currency_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"USD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PayoutStatus\",\"nativeType\":null,\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"externalReference\",\"dbName\":\"external_reference\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestedAt\",\"dbName\":\"requested_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"processedAt\",\"dbName\":\"processed_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"failureReason\",\"dbName\":\"failure_reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"providerProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderProfile\",\"nativeType\":null,\"relationName\":\"PayoutToProviderProfile\",\"relationFromFields\":[\"providerProfileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ledgerEntries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LedgerEntry\",\"nativeType\":null,\"relationName\":\"LedgerEntryToPayout\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Dispute\":{\"dbName\":\"disputes\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentalId\",\"dbName\":\"rental_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"openedByUserId\",\"dbName\":\"opened_by_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerProfileId\",\"dbName\":\"provider_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DisputeStatus\",\"nativeType\":null,\"default\":\"OPEN\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resolution\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resolvedAt\",\"dbName\":\"resolved_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"rental\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Rental\",\"nativeType\":null,\"relationName\":\"DisputeToRental\",\"relationFromFields\":[\"rentalId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"openedBy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"DisputeToUser\",\"relationFromFields\":[\"openedByUserId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProviderProfile\",\"nativeType\":null,\"relationName\":\"DisputeToProviderProfile\",\"relationFromFields\":[\"providerProfileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AuditLog\":{\"dbName\":\"audit_logs\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rentalId\",\"dbName\":\"rental_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Uuid\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"action\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetType\",\"dbName\":\"target_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetId\",\"dbName\":\"target_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"dbName\":\"ip_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"dbName\":\"user_agent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"AuditLogToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rental\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Rental\",\"nativeType\":null,\"relationName\":\"AuditLogToRental\",\"relationFromFields\":[\"rentalId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"PlatformRole\":{\"values\":[{\"name\":\"USER\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null}],\"dbName\":\"platform_role\"},\"UserStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"SUSPENDED\",\"dbName\":null},{\"name\":\"DELETED\",\"dbName\":null}],\"dbName\":\"user_status\"},\"ProviderStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"VERIFIED\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null},{\"name\":\"SUSPENDED\",\"dbName\":null}],\"dbName\":\"provider_status\"},\"ProviderType\":{\"values\":[{\"name\":\"OPENAI_COMPATIBLE\",\"dbName\":null},{\"name\":\"ANTHROPIC\",\"dbName\":null},{\"name\":\"GOOGLE\",\"dbName\":null},{\"name\":\"OTHER\",\"dbName\":null}],\"dbName\":\"provider_type\"},\"CredentialStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"INVALID\",\"dbName\":null},{\"name\":\"REVOKED\",\"dbName\":null}],\"dbName\":\"credential_status\"},\"ListingStatus\":{\"values\":[{\"name\":\"DRAFT\",\"dbName\":null},{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"PAUSED\",\"dbName\":null},{\"name\":\"ARCHIVED\",\"dbName\":null}],\"dbName\":\"listing_status\"},\"VisibilityStatus\":{\"values\":[{\"name\":\"PRIVATE\",\"dbName\":null},{\"name\":\"PUBLIC\",\"dbName\":null},{\"name\":\"UNLISTED\",\"dbName\":null}],\"dbName\":\"visibility_status\"},\"RentalDuration\":{\"values\":[{\"name\":\"ONE_HOUR\",\"dbName\":null},{\"name\":\"TWO_HOURS\",\"dbName\":null},{\"name\":\"SIX_HOURS\",\"dbName\":null},{\"name\":\"TWENTY_FOUR_HOURS\",\"dbName\":null}],\"dbName\":\"rental_duration\"},\"RentalStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"EXPIRED\",\"dbName\":null},{\"name\":\"SUSPENDED\",\"dbName\":null},{\"name\":\"REVOKED\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null}],\"dbName\":\"rental_status\"},\"SessionStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"EXPIRED\",\"dbName\":null},{\"name\":\"SUSPENDED\",\"dbName\":null},{\"name\":\"REVOKED\",\"dbName\":null}],\"dbName\":\"session_status\"},\"UsageEventType\":{\"values\":[{\"name\":\"REQUEST\",\"dbName\":null},{\"name\":\"RESPONSE\",\"dbName\":null},{\"name\":\"BILLING\",\"dbName\":null},{\"name\":\"ADJUSTMENT\",\"dbName\":null},{\"name\":\"ERROR\",\"dbName\":null}],\"dbName\":\"usage_event_type\"},\"ChatMessageRole\":{\"values\":[{\"name\":\"SYSTEM\",\"dbName\":null},{\"name\":\"USER\",\"dbName\":null},{\"name\":\"ASSISTANT\",\"dbName\":null}],\"dbName\":\"chat_message_role\"},\"WalletStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"FROZEN\",\"dbName\":null},{\"name\":\"CLOSED\",\"dbName\":null}],\"dbName\":\"wallet_status\"},\"LedgerEntryType\":{\"values\":[{\"name\":\"DEPOSIT\",\"dbName\":null},{\"name\":\"WITHDRAWAL\",\"dbName\":null},{\"name\":\"ESCROW_HOLD\",\"dbName\":null},{\"name\":\"ESCROW_RELEASE\",\"dbName\":null},{\"name\":\"RENTAL_CHARGE\",\"dbName\":null},{\"name\":\"PROVIDER_EARNING\",\"dbName\":null},{\"name\":\"PLATFORM_FEE\",\"dbName\":null},{\"name\":\"REFUND\",\"dbName\":null},{\"name\":\"PAYOUT\",\"dbName\":null},{\"name\":\"ADJUSTMENT\",\"dbName\":null}],\"dbName\":\"ledger_entry_type\"},\"LedgerDirection\":{\"values\":[{\"name\":\"CREDIT\",\"dbName\":null},{\"name\":\"DEBIT\",\"dbName\":null}],\"dbName\":\"ledger_direction\"},\"PayoutStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"PROCESSING\",\"dbName\":null},{\"name\":\"PAID\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null}],\"dbName\":\"payout_status\"},\"DisputeStatus\":{\"values\":[{\"name\":\"OPEN\",\"dbName\":null},{\"name\":\"IN_REVIEW\",\"dbName\":null},{\"name\":\"RESOLVED\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null}],\"dbName\":\"dispute_status\"}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "apps/web/src/generated/prisma/libquery_engine-darwin-arm64.dylib.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "apps/web/src/generated/prisma/schema.prisma")
