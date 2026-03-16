import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { listPublicListings } from "@/lib/listings/service";
import { listingsQuerySchema } from "@/lib/listings/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = listingsQuerySchema.parse({
      providerType: searchParams.get("providerType") ?? undefined,
      modelFamily: searchParams.get("modelFamily") ?? undefined,
      featuredOnly: searchParams.get("featuredOnly") ?? undefined,
    });

    const listings = await listPublicListings(filters);

    return NextResponse.json({ data: listings });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Database request failed while loading listings." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
