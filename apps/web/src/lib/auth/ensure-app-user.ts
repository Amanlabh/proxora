import type { User as SupabaseUser } from "@supabase/supabase-js";
import { db } from "@/lib/server/db";

export async function ensureAppUser(sessionUser: SupabaseUser) {
  const displayName =
    typeof sessionUser.user_metadata?.display_name === "string"
      ? sessionUser.user_metadata.display_name
      : typeof sessionUser.user_metadata?.full_name === "string"
        ? sessionUser.user_metadata.full_name
        : null;

  const avatarUrl =
    typeof sessionUser.user_metadata?.avatar_url === "string"
      ? sessionUser.user_metadata.avatar_url
      : null;

  const email = sessionUser.email ?? `${sessionUser.id}@placeholder.local`;
  const existingUser = await db.user.findUnique({
    where: {
      supabaseAuthUserId: sessionUser.id,
    },
  });

  if (!existingUser) {
    return db.user.create({
      data: {
        supabaseAuthUserId: sessionUser.id,
        email,
        displayName,
        avatarUrl,
      },
    });
  }

  if (
    existingUser.email === email &&
    existingUser.displayName === displayName &&
    existingUser.avatarUrl === avatarUrl
  ) {
    return existingUser;
  }

  return db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      email,
      displayName,
      avatarUrl,
    },
  });
}
