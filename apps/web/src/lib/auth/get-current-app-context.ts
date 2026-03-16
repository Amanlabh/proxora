import { cache } from "react";
import { db } from "@/lib/server/db";
import { ensureAppUser } from "./ensure-app-user";
import { getSessionUser } from "./get-session-user";

export const getCurrentAppContext = cache(async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    return {
      sessionUser: null,
      appUser: null,
    };
  }

  const appUser = await ensureAppUser(sessionUser);

  return {
    sessionUser,
    appUser: await db.user.findUnique({
      where: {
        id: appUser.id,
      },
    }),
  };
});
