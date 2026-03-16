import { NextResponse } from "next/server";
import { verifyWalletTopUpSchema } from "@/lib/payments/schema";
import { topUpWalletWithReference } from "@/lib/payments/service";
import { verifyRazorpayPaymentSignature } from "@/lib/payments/razorpay";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

export async function POST(request: Request) {
  const { sessionUser, appUser } = await getCurrentProviderContext();

  if (!sessionUser) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  if (!appUser) {
    return NextResponse.json(
      { error: "Signed-in user is not linked to an app user record yet." },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();
    const input = verifyWalletTopUpSchema.parse(body);

    const valid = verifyRazorpayPaymentSignature({
      orderId: input.razorpayOrderId,
      paymentId: input.razorpayPaymentId,
      signature: input.razorpaySignature,
    });

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid Razorpay payment signature." },
        { status: 400 },
      );
    }

    const wallet = await topUpWalletWithReference(
      appUser.id,
      input.amount,
      input.razorpayPaymentId,
    );

    return NextResponse.json({
      data: {
        balance: Number(wallet.balance),
        heldBalance: Number(wallet.heldBalance),
        currencyCode: wallet.currencyCode,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
