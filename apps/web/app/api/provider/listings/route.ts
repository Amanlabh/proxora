import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { createListingRequestSchema } from "@/lib/listings/schema";
import {
  createListing,
  listProviderOwnedListings,
} from "@/lib/listings/service";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

export async function GET() {
  const { sessionUser, providerProfile } = await getCurrentProviderContext();

  if (!sessionUser) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  if (!providerProfile) {
    return NextResponse.json(
      { error: "Provider profile required before listing management." },
      { status: 403 },
    );
  }

  const listings = await listProviderOwnedListings(providerProfile.id);
  return NextResponse.json({ data: listings });
}

export async function POST(request: Request) {
  try {
    const { sessionUser, appUser, providerProfile } =
      await getCurrentProviderContext();

    if (!sessionUser) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }

    if (!appUser) {
      return NextResponse.json(
        {
          error:
            "Signed-in user is not linked to an application user record yet.",
        },
        { status: 403 },
      );
    }

    if (!providerProfile) {
      return NextResponse.json(
        { error: "Signed-in user does not have a provider profile yet." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const input = createListingRequestSchema.parse(body);
    const listing = await createListing({
      ...input,
      providerProfileId: providerProfile.id,
    });

    return NextResponse.json({ data: listing }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Database request failed while creating the listing." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
