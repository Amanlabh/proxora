import { NextResponse } from "next/server";
import { walletTopUpSchema } from "@/lib/payments/schema";
import { createRazorpayOrder } from "@/lib/payments/razorpay";
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
    const input = walletTopUpSchema.parse(body);
    const receipt = `wallet-${appUser.id.slice(0, 8)}-${Date.now().toString(36)}`;
    const order = await createRazorpayOrder(input.amount, receipt);

    return NextResponse.json({
      data: {
        orderId: order.id,
        amount: input.amount,
        currency: order.currency,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
