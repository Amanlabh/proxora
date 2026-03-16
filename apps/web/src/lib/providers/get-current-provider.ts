import { db } from "@/lib/server/db";
import { getCurrentAppContext } from "@/lib/auth/get-current-app-context";

export async function getCurrentProviderContext() {
  const { sessionUser, appUser } = await getCurrentAppContext();

  if (!sessionUser || !appUser) {
    return {
      sessionUser,
      appUser,
      providerProfile: null,
    };
  }

  const providerProfile = await db.providerProfile.findUnique({
    where: {
      userId: appUser.id,
    },
    include: {
      credentials: {
        orderBy: {
          createdAt: "desc",
        },
      },
      listings: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return {
    sessionUser,
    appUser,
    providerProfile,
  };
}
