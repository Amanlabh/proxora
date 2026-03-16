import { NextResponse } from "next/server";
import { activateBooking } from "@/lib/payments/service";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

type RouteContext = {
  params: Promise<{
    rentalId: string;
  }>;
};

export async function POST(_request: Request, context: RouteContext) {
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
    const result = await activateBooking(appUser.id, rentalId);
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
