import { NextResponse } from "next/server";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";
import { getWalletSummary } from "@/lib/payments/service";

export async function GET() {
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

  const wallet = await getWalletSummary(appUser.id);
  return NextResponse.json({ data: wallet });
}
