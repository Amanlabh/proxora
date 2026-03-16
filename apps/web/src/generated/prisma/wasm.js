
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
