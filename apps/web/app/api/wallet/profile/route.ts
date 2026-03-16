import { NextResponse } from "next/server";
import { getCurrentAppContext } from "@/lib/auth/get-current-app-context";
import { walletProfileSchema } from "@/lib/payments/schema";
import { getWalletSummary, updateWalletProfile } from "@/lib/payments/service";

export async function GET() {
  const { sessionUser, appUser } = await getCurrentAppContext();

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

  const wallet = await getWalletSummary(appUser.id);
  return NextResponse.json({ data: wallet.profile });
}

export async function POST(request: Request) {
  try {
    const { sessionUser, appUser } = await getCurrentAppContext();

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
    const input = walletProfileSchema.parse(body);
    const wallet = await updateWalletProfile(appUser.id, input);

    return NextResponse.json({ data: wallet });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
