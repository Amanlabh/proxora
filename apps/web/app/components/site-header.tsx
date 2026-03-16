import Link from "next/link";
import { PlatformRole } from "@/generated/prisma";
import { getCurrentAppContext } from "@/lib/auth/get-current-app-context";
import { SignOutButton } from "../auth/sign-out-button";

export async function SiteHeader() {
  const { sessionUser, appUser } = await getCurrentAppContext();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand-link" href="/">
          <span className="brand-mark" />
          <span className="brand-copy">
            <strong>Proxora AI</strong>
          </span>
        </Link>

        <nav className="site-nav">
          <Link className="nav-link" href="/marketplace">
            Marketplace
          </Link>
          <Link className="nav-link" href="/bookings">
            Bookings
          </Link>
          <Link className="nav-link" href="/provider">
            Provider
          </Link>
          <Link className="nav-link" href="/developer">
            Developer
          </Link>
          <Link className="nav-link" href="/wallet">
            Wallet
          </Link>
        </nav>

        <div className="site-header-actions">
          {sessionUser ? (
            <>
              <span className="nav-user">{sessionUser.email}</span>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link className="nav-link" href="/auth/sign-in">
                Sign in
              </Link>
              <Link className="action-link" href="/auth/sign-up">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
