import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { getPublicListingBySlug } from "@/lib/listings/service";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const listing = await getPublicListingBySlug(slug);

    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: listing });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Database request failed while loading the listing." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
