import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";
import { createProviderCredentialSchema } from "@/lib/providers/schema";
import {
  createProviderCredential,
  listProviderCredentials,
} from "@/lib/providers/service";

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
      { error: "Provider profile required before adding credentials." },
      { status: 403 },
    );
  }

  const credentials = await listProviderCredentials(providerProfile.id);
  return NextResponse.json({ data: credentials });
}

export async function POST(request: Request) {
  try {
    const { sessionUser, providerProfile } = await getCurrentProviderContext();

    if (!sessionUser) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }

    if (!providerProfile) {
      return NextResponse.json(
        { error: "Provider profile required before adding credentials." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const input = createProviderCredentialSchema.parse(body);
    const credential = await createProviderCredential(
      providerProfile.id,
      input,
    );

    return NextResponse.json({ data: credential }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error:
            "Database request failed while creating the provider credential.",
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
