import { NextResponse } from "next/server";
import { z } from "zod";
import { revokeRentalByProvider } from "@/lib/payments/service";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

const revokeSchema = z.object({
  reason: z.string().max(500).optional(),
});

type RouteContext = {
  params: Promise<{
    rentalId: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
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
      { error: "Provider profile required." },
      { status: 403 },
    );
  }

  try {
    const body = revokeSchema.parse(await request.json().catch(() => ({})));
    const { rentalId } = await context.params;
    const rental = await revokeRentalByProvider(
      appUser.id,
      providerProfile.id,
      rentalId,
      body.reason,
    );
    return NextResponse.json({ data: rental });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
