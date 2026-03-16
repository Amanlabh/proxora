import { RentalDuration } from "@/generated/prisma";
import { z } from "zod";

export const walletTopUpSchema = z.object({
  amount: z.coerce.number().positive().max(10000),
});

export const verifyWalletTopUpSchema = z.object({
  amount: z.coerce.number().positive().max(10000),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export const walletProfileSchema = z.object({
  legalName: z.string().min(2).max(120),
  billingEmail: z.string().email(),
  companyName: z.string().max(120).optional().or(z.literal("")),
  taxId: z.string().max(120).optional().or(z.literal("")),
  countryCode: z.string().length(2),
  addressLine1: z.string().min(3).max(160),
  addressLine2: z.string().max(160).optional().or(z.literal("")),
  city: z.string().min(2).max(120),
  stateRegion: z.string().min(2).max(120),
  postalCode: z.string().min(2).max(40),
  usageAlertEmail: z.string().email().optional().or(z.literal("")),
  invoiceNotes: z.string().max(500).optional().or(z.literal("")),
  purchaseOrderReference: z.string().max(120).optional().or(z.literal("")),
});

export const createBookingSchema = z.object({
  listingId: z.string().uuid("listingId must be a UUID"),
  duration: z.nativeEnum(RentalDuration),
});

export const bookingActionSchema = z.object({
  rentalId: z.string().uuid("rentalId must be a UUID"),
});

export const completeBookingSchema = bookingActionSchema.extend({
  consumedAmount: z.coerce.number().positive().optional(),
});

export const providerPayoutRequestSchema = z.object({
  amount: z.coerce.number().positive().max(100000).optional(),
  beneficiaryName: z.string().min(2).max(120),
  beneficiaryEmail: z.string().email().optional().or(z.literal("")),
  upiId: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+$/, "Invalid UPI ID"),
});

export type WalletTopUpInput = z.infer<typeof walletTopUpSchema>;
export type VerifyWalletTopUpInput = z.infer<typeof verifyWalletTopUpSchema>;
export type WalletProfileInput = z.infer<typeof walletProfileSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type ProviderPayoutRequestInput = z.infer<
  typeof providerPayoutRequestSchema
>;
