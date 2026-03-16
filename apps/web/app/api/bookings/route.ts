import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { createBookingSchema } from "@/lib/payments/schema";
import { createBooking, listRenterBookings } from "@/lib/payments/service";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

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

  const bookings = await listRenterBookings(appUser.id);
  return NextResponse.json({ data: bookings });
}

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
    const input = createBookingSchema.parse(body);
    const booking = await createBooking(appUser.id, input);

    return NextResponse.json({ data: booking }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Database request failed while creating the booking." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
