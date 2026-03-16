import { NextResponse } from "next/server";
import { z } from "zod";
import { createRentalDispute, listUserDisputes } from "@/lib/payments/service";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

const createDisputeSchema = z.object({
  rentalId: z.string().uuid(),
  reason: z.string().min(10).max(2000),
});

export async function GET() {
  const { sessionUser, appUser } = await getCurrentProviderContext();

  if (!sessionUser || !appUser) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const disputes = await listUserDisputes(appUser.id, appUser.role);
  return NextResponse.json({ data: disputes });
}

export async function POST(request: Request) {
  const { sessionUser, appUser } = await getCurrentProviderContext();

  if (!sessionUser || !appUser) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  try {
    const input = createDisputeSchema.parse(await request.json());
    const dispute = await createRentalDispute(
      appUser.id,
      input.rentalId,
      input.reason,
    );
    return NextResponse.json({ data: dispute }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
