import { NextResponse } from "next/server";
import { PlatformRole } from "@/generated/prisma";
import { getServerEnv } from "@/env/server";
import { sweepExpiredRentals } from "@/lib/payments/service";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";

function isAuthorizedCronRequest(request: Request) {
  const { CRON_SECRET } = getServerEnv();

  if (!CRON_SECRET) {
    return false;
  }

  return request.headers.get("x-cron-secret") === CRON_SECRET;
}

export async function POST(request: Request) {
  const cronAuthorized = isAuthorizedCronRequest(request);

  if (!cronAuthorized) {
    const { sessionUser, appUser } = await getCurrentProviderContext();

    if (!sessionUser || !appUser || appUser.role !== PlatformRole.ADMIN) {
      return NextResponse.json(
        { error: "Admin or cron authorization required." },
        { status: 403 },
      );
    }
  }

  try {
    const result = await sweepExpiredRentals();
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error." },
      { status: 400 },
    );
  }
}
