"use client";

import { useState } from "react";

type BookingPanelProps = {
  currencyCode: string;
  listingId: string;
  title: string;
  freeTier?: {
    enabled: boolean;
    tokenCap: number | null;
    requestCap: number | null;
    maxDurationHours: number | null;
  } | null;
};

const durationOptions = [
  { value: "ONE_HOUR", label: "1 hour" },
  { value: "TWO_HOURS", label: "2 hours" },
  { value: "SIX_HOURS", label: "6 hours" },
  { value: "TWENTY_FOUR_HOURS", label: "24 hours" },
] as const;

const durationHoursMap: Record<
  (typeof durationOptions)[number]["value"],
  number
> = {
  ONE_HOUR: 1,
  TWO_HOURS: 2,
  SIX_HOURS: 6,
  TWENTY_FOUR_HOURS: 24,
};

export function BookingPanel({
  currencyCode,
  listingId,
  title,
  freeTier,
}: BookingPanelProps) {
  const maxFreeHours = freeTier?.enabled
    ? (freeTier.maxDurationHours ?? 1)
    : null;
  const allowedDurationOptions = durationOptions.filter((option) => {
    if (!maxFreeHours) {
      return true;
    }
    return durationHoursMap[option.value] <= maxFreeHours;
  });
  const [duration, setDuration] =
    useState<(typeof durationOptions)[number]["value"]>("ONE_HOUR");
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState({ status: "submitting" });

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listingId,
        duration,
      }),
    });

    const payload = (await response.json()) as {
      error?: string;
      data?: { id: string; bookedPrice: number };
    };

    if (!response.ok) {
      setSubmissionState({
        status: "error",
        message: payload.error ?? "Booking failed.",
      });
      return;
    }

    setSubmissionState({
      status: "success",
      message: `Booking created for ${title}. Reserved amount: ${payload.data?.bookedPrice} ${currencyCode}.`,
    });
  }

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      <label>
        Rental duration
        <select
          value={duration}
          onChange={(event) =>
            setDuration(event.target.value as typeof duration)
          }
        >
          {allowedDurationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {freeTier?.enabled ? (
        <p className="form-message">
          Free tier limits:{" "}
          {freeTier.tokenCap ? `${freeTier.tokenCap} tokens` : null}
          {freeTier.tokenCap && freeTier.requestCap ? " · " : null}
          {freeTier.requestCap ? `${freeTier.requestCap} requests` : null}
        </p>
      ) : null}
      <button
        className="submit-button"
        disabled={submissionState.status === "submitting"}
      >
        {submissionState.status === "submitting" ? "Booking..." : "Book rental"}
      </button>
      {submissionState.message ? (
        <p
          className={
            submissionState.status === "error"
              ? "form-message error"
              : "form-message"
          }
        >
          {submissionState.message}
        </p>
      ) : null}
    </form>
  );
}
