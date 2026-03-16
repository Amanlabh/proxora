import { redirect } from "next/navigation";
import { ProviderType } from "@/generated/prisma";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";
import { ListingCreationForm } from "./listing-creation-form";

export const dynamic = "force-dynamic";

const providerOptions = Object.values(ProviderType);

export default async function NewProviderListingPage() {
  const { sessionUser, appUser, providerProfile } =
    await getCurrentProviderContext();

  if (!sessionUser) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Provider Console</p>
        <h1>Create a rental listing</h1>
        <p className="lead">
          This provider flow now uses the active Supabase session. Listing
          creation is tied to the signed-in provider profile instead of trusting
          a client-supplied profile ID.
        </p>
      </section>

      <section className="status-card">
        <h2>Listing form</h2>
        {!appUser ? (
          <div className="empty-state">
            <p>
              Your Supabase account is not linked to an app user record yet.
            </p>
            <p>
              The next backend step is syncing authenticated Supabase users into
              the `users` table.
            </p>
          </div>
        ) : !providerProfile ? (
          <div className="empty-state">
            <p>You do not have a provider profile yet.</p>
            <p>
              Phase 4 still needs provider onboarding for creating
              `provider_profiles` and `provider_credentials`.
            </p>
          </div>
        ) : (
          <>
            <p className="section-copy">
              Signed in as <strong>{sessionUser.email}</strong>.
            </p>
            <p className="section-copy">
              Provider profile: <strong>{providerProfile.displayName}</strong>
            </p>
            <p className="section-copy">
              Active credential count:{" "}
              <strong>{providerProfile.credentials.length}</strong>
            </p>
            <ListingCreationForm
              activeCredentials={providerProfile.credentials.map(
                (credential) => ({
                  id: credential.id,
                  label: credential.label,
                  providerType: credential.providerType,
                }),
              )}
              providerOptions={providerOptions}
            />
          </>
        )}
      </section>
    </main>
  );
}
