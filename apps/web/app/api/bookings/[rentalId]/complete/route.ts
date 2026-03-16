import { NextResponse } from "next/server";
import { completeBookingSchema } from "@/lib/payments/schema";
import { completeBooking } from "@/lib/payments/service";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

type RouteContext = {
  params: Promise<{
    rentalId: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
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
    const { rentalId } = await context.params;
    const body = await request.json().catch(() => ({}));
    const input = completeBookingSchema.parse({
      rentalId,
      consumedAmount: body.consumedAmount,
    });
    const rental = await completeBooking(
      appUser.id,
      input.rentalId,
      input.consumedAmount,
    );
    return NextResponse.json({ data: rental });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
