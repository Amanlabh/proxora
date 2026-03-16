"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthFormState } from "./actions";
import { signInWithPassword, signUpWithPassword } from "./actions";

const initialState: AuthFormState = {
  status: "idle",
};

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(
    mode === "sign-in" ? signInWithPassword : signUpWithPassword,
    initialState,
  );

  return (
    <form action={formAction} className="auth-form">
      {mode === "sign-up" ? (
        <label>
          Full name
          <input
            name="fullName"
            placeholder="Aman Sharma"
            type="text"
            autoComplete="name"
          />
        </label>
      ) : null}
      <label>
        Email address
        <input
          name="email"
          required
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
        />
      </label>
      <label>
        Password
        <input
          name="password"
          required
          minLength={8}
          placeholder="At least 8 characters"
          type="password"
          autoComplete={
            mode === "sign-in" ? "current-password" : "new-password"
          }
        />
      </label>
      {mode === "sign-up" ? (
        <label>
          Confirm password
          <input
            name="confirmPassword"
            required
            minLength={8}
            placeholder="Repeat your password"
            type="password"
            autoComplete="new-password"
          />
        </label>
      ) : null}
      <button className="submit-button" disabled={pending}>
        {pending
          ? mode === "sign-in"
            ? "Signing in..."
            : "Creating account..."
          : mode === "sign-in"
            ? "Sign in"
            : "Create account"}
      </button>
      {state.message ? (
        <p
          className={
            state.status === "error" ? "form-message error" : "form-message"
          }
        >
          {state.message}
        </p>
      ) : null}
      <p className="form-message">
        {mode === "sign-in" ? (
          <>
            Need an account? <Link href="/auth/sign-up">Create one</Link>.
          </>
        ) : (
          <>
            Already registered? <Link href="/auth/sign-in">Sign in</Link>.
          </>
        )}
      </p>
    </form>
  );
}
