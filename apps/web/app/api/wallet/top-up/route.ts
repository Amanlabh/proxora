import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { walletTopUpSchema } from "@/lib/payments/schema";
import { topUpWallet } from "@/lib/payments/service";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

export async function POST(request: Request) {
  try {
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

    const body = await request.json();
    const input = walletTopUpSchema.parse(body);
    const wallet = await topUpWallet(appUser.id, input.amount);

    return NextResponse.json(
      {
        data: {
          id: wallet.id,
          balance: Number(wallet.balance),
          heldBalance: Number(wallet.heldBalance),
          currencyCode: wallet.currencyCode,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Database request failed while topping up the wallet." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
