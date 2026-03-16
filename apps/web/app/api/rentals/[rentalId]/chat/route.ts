import { NextResponse } from "next/server";
import { z } from "zod";
import { sendRentalChatMessage } from "@/lib/rentals/chat";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

const rentalChatSchema = z.object({
  model: z.string().min(1),
  prompt: z.string().min(1).max(20000),
});

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
    const body = rentalChatSchema.parse(await request.json());
    const { rentalId } = await context.params;
    const result = await sendRentalChatMessage({
      renterUserId: appUser.id,
      rentalId,
      model: body.model,
      prompt: body.prompt,
      requesterIp:
        request.headers.get("x-forwarded-for") ??
        request.headers.get("x-real-ip"),
      userAgent: request.headers.get("user-agent"),
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
