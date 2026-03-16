import { redirect } from "next/navigation";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";
import { CredentialForm } from "./provider-credential-form";
import { ProfileForm } from "./provider-profile-form";

export const dynamic = "force-dynamic";

export default async function ProviderOnboardingPage() {
  const { sessionUser, providerProfile } = await getCurrentProviderContext();

  if (!sessionUser) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Provider Onboarding</p>
        <h1>Connect your provider account</h1>
        <p className="lead">
          Complete your provider profile first, then add credentials that will
          power your rentable marketplace listings.
        </p>
      </section>

      <section className="status-card">
        <div className="provider-stack">
          <div className="provider-section">
            <h2>Step 1: Provider profile</h2>
            <p className="section-copy">
              Create the provider record that owns credentials, listings, and
              payouts.
            </p>
            <ProfileForm
              existingProfile={
                providerProfile
                  ? {
                      displayName: providerProfile.displayName,
                      legalName: providerProfile.legalName ?? "",
                      bio: providerProfile.bio ?? "",
                      countryCode: providerProfile.countryCode ?? "",
                      status: providerProfile.status,
                      metadata:
                        providerProfile.metadata &&
                        typeof providerProfile.metadata === "object" &&
                        !Array.isArray(providerProfile.metadata)
                          ? (providerProfile.metadata as {
                              businessType?: string | null;
                              websiteUrl?: string | null;
                              supportEmail?: string | null;
                              supportChannel?: string | null;
                              companyRegistrationNumber?: string | null;
                              taxId?: string | null;
                              billingContact?: {
                                name?: string | null;
                                email?: string | null;
                              } | null;
                              technicalContact?: {
                                name?: string | null;
                                email?: string | null;
                              } | null;
                            })
                          : null,
                    }
                  : null
              }
            />
          </div>

          <div className="provider-section">
            <h2>Step 2: Provider credential</h2>
            <p className="section-copy">
              Credentials are stored encrypted and tied to your provider
              profile.
            </p>
            <CredentialForm
              disabled={!providerProfile}
              existingCredentials={
                providerProfile?.credentials.map((credential) => ({
                  id: credential.id,
                  label: credential.label,
                  providerType: credential.providerType,
                  status: credential.status,
                  supportedModels: credential.supportedModels,
                  metadata:
                    credential.metadata &&
                    typeof credential.metadata === "object" &&
                    !Array.isArray(credential.metadata)
                      ? (credential.metadata as {
                          docsUrl?: string | null;
                          consoleUrl?: string | null;
                          rateLimits?: {
                            requestsPerMinuteLimit?: number | null;
                            tokensPerMinuteLimit?: number | null;
                          } | null;
                        })
                      : null,
                })) ?? []
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}
