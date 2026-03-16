import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/get-session-user";
import { AuthForm } from "./auth-form";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="page-shell auth-shell">
      <section className="hero-card auth-card">
        <p className="eyebrow">Authentication</p>
        <h1>Sign in to Proxora AI</h1>
        <p className="lead">
          Use your email and password to access listings, wallet controls,
          provider ownership, and live rental sessions.
        </p>
        <AuthForm mode="sign-in" />
      </section>
    </main>
  );
}
