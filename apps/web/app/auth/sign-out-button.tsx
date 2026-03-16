import { signOut } from "./sign-in/actions";

export async function SignOutButton() {
  return (
    <form action={signOut}>
      <button className="nav-link action-link-button" type="submit">
        Sign out
      </button>
    </form>
  );
}
