import { createHmac } from "node:crypto";
import { getServerEnv } from "@/env/server";

function getBasicAuthHeader() {
  const { NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = getServerEnv();

  return `Basic ${Buffer.from(
    `${NEXT_PUBLIC_RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`,
  ).toString("base64")}`;
}

export async function createRazorpayOrder(amount: number, receipt: string) {
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: getBasicAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to create Razorpay order: ${errorBody || response.statusText}`,
    );
  }

  return (await response.json()) as {
    id: string;
    amount: number;
    currency: string;
  };
}

export function verifyRazorpayPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const { RAZORPAY_KEY_SECRET } = getServerEnv();

  const expected = createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expected === signature;
}

async function razorpayRequest<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`https://api.razorpay.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: getBasicAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Razorpay request failed for ${path}: ${errorBody || response.statusText}`,
    );
  }

  return (await response.json()) as T;
}

export async function createRazorpayXContact(input: {
  name: string;
  email?: string;
}) {
  return razorpayRequest<{
    id: string;
  }>("contacts", {
    name: input.name,
    email: input.email,
    type: "vendor",
    reference_id: `provider-contact-${Date.now()}`,
  });
}

export async function createRazorpayXFundAccount(input: {
  contactId: string;
  name: string;
  upiId: string;
}) {
  return razorpayRequest<{
    id: string;
  }>("fund_accounts", {
    contact_id: input.contactId,
    account_type: "vpa",
    vpa: {
      address: input.upiId,
    },
    name: input.name,
  });
}

export async function createRazorpayXPayout(input: {
  amount: number;
  currencyCode: string;
  fundAccountId: string;
  reference: string;
  narration: string;
}) {
  const { RAZORPAYX_ACCOUNT_NUMBER } = getServerEnv();

  if (!RAZORPAYX_ACCOUNT_NUMBER) {
    throw new Error(
      "RAZORPAYX_ACCOUNT_NUMBER is not configured. Real payouts cannot run yet.",
    );
  }

  return razorpayRequest<{
    id: string;
    status: string;
    reference_id?: string | null;
  }>("payouts", {
    account_number: RAZORPAYX_ACCOUNT_NUMBER,
    fund_account_id: input.fundAccountId,
    amount: Math.round(input.amount * 100),
    currency: input.currencyCode,
    mode: "UPI",
    purpose: "payout",
    queue_if_low_balance: true,
    reference_id: input.reference,
    narration: input.narration,
  });
}
