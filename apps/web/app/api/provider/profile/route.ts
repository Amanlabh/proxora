import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { createProviderProfileSchema } from "@/lib/providers/schema";
import { createProviderProfile } from "@/lib/providers/service";
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

  return NextResponse.json({
    data: {
      appUser,
      providerProfile,
    },
  });
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
        {
          error: "Signed-in user is not linked to an application user record.",
        },
        { status: 403 },
      );
    }

    const body = await request.json();
    const input = createProviderProfileSchema.parse(body);
    const created = await createProviderProfile(appUser.id, input);

    return NextResponse.json({ data: created }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: "Database request failed while creating the provider profile.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
