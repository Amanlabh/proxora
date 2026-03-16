import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/get-session-user";
import { AuthForm } from "../sign-in/auth-form";

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="page-shell auth-shell">
      <section className="auth-panel-grid">
        <article className="hero-card auth-side-panel">
          <p className="eyebrow">Create account</p>
          <h1 className="auth-title">Create your rental platform account</h1>
          <p className="lead auth-lead">
            Register once, then use the same account for renter bookings,
            provider listings, wallet funding, and rental workspaces.
          </p>

          <div className="auth-benefits">
            <div className="auth-benefit-card">
              <strong>For renters</strong>
              <p>
                Book listings, track spend, open disputes, and resume chats.
              </p>
            </div>
            <div className="auth-benefit-card">
              <strong>For providers</strong>
              <p>Manage credentials, publish listings, and review earnings.</p>
            </div>
            <div className="auth-benefit-card">
              <strong>Verification note</strong>
              <p>
                If Supabase email confirmation is enabled, verify first and then
                return to <Link href="/auth/sign-in">sign in</Link>.
              </p>
            </div>
          </div>
        </article>

        <article className="hero-card auth-form-card">
          <div className="auth-form-header">
            <p className="eyebrow">Account setup</p>
            <h2>Create account</h2>
            <p className="section-copy">
              Use a strong password. You can onboard as a provider after
              registration from your dashboard.
            </p>
          </div>
          <AuthForm mode="sign-up" />
        </article>
      </section>
    </main>
  );
}
