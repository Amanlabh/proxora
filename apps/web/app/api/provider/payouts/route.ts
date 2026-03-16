import { NextResponse } from "next/server";
import {
  getProviderFinanceSummary,
  requestProviderPayout,
} from "@/lib/payments/service";
import { providerPayoutRequestSchema } from "@/lib/payments/schema";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

export async function GET() {
  const { sessionUser, appUser, providerProfile } =
    await getCurrentProviderContext();

  if (!sessionUser) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  if (!appUser || !providerProfile) {
    return NextResponse.json(
      { error: "Provider profile required for payouts." },
      { status: 403 },
    );
  }

  const summary = await getProviderFinanceSummary(
    appUser.id,
    providerProfile.id,
  );
  return NextResponse.json({ data: summary });
}

export async function POST(request: Request) {
  const { sessionUser, appUser, providerProfile } =
    await getCurrentProviderContext();

  if (!sessionUser) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  if (!appUser || !providerProfile) {
    return NextResponse.json(
      { error: "Provider profile required for payouts." },
      { status: 403 },
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const input = providerPayoutRequestSchema.parse(body);
    const payout = await requestProviderPayout(
      appUser.id,
      providerProfile.id,
      input,
    );
    return NextResponse.json({ data: payout }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
