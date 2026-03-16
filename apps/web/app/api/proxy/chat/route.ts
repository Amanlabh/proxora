import { NextResponse } from "next/server";
import { proxyChatCompletion } from "@/lib/proxy/service";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Bearer rental session token is required." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const result = await proxyChatCompletion(
      authorization.slice("Bearer ".length),
      body,
      {
        requesterIp:
          request.headers.get("x-forwarded-for") ??
          request.headers.get("x-real-ip"),
        userAgent: request.headers.get("user-agent"),
      },
    );

    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
