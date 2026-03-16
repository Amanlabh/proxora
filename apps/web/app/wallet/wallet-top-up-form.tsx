"use client";

import { useState } from "react";

type WalletTopUpFormProps = {
  razorpayKeyId: string;
};

type RazorpayHandlerResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export function WalletTopUpForm({ razorpayKeyId }: WalletTopUpFormProps) {
  const [amount, setAmount] = useState("100");
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  async function loadRazorpay() {
    if (typeof window === "undefined") {
      return false;
    }

    if ("Razorpay" in window) {
      return true;
    }

    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState({ status: "submitting" });

    const sdkLoaded = await loadRazorpay();

    if (
      !sdkLoaded ||
      typeof window === "undefined" ||
      !("Razorpay" in window)
    ) {
      setSubmissionState({
        status: "error",
        message: "Failed to load Razorpay checkout.",
      });
      return;
    }

    const orderResponse = await fetch("/api/payments/razorpay/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    });

    const payload = (await orderResponse.json()) as {
      error?: string;
      data?: { orderId: string; amount: number; currency: string };
    };

    if (!orderResponse.ok || !payload.data) {
      setSubmissionState({
        status: "error",
        message: payload.error ?? "Failed to create Razorpay order.",
      });
      return;
    }

    const RazorpayCtor = (
      window as unknown as {
        Razorpay: new (options: Record<string, unknown>) => {
          open: () => void;
        };
      }
    ).Razorpay;

    const razorpay = new RazorpayCtor({
      key: razorpayKeyId,
      amount: Math.round(payload.data.amount * 100),
      currency: payload.data.currency,
      name: "Proxora AI",
      description: "Wallet top-up",
      order_id: payload.data.orderId,
      handler: async (response: RazorpayHandlerResponse) => {
        const verifyResponse = await fetch("/api/payments/razorpay/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });

        const verifyPayload = (await verifyResponse.json()) as {
          error?: string;
          data?: { balance: number; currencyCode: string };
        };

        if (!verifyResponse.ok) {
          setSubmissionState({
            status: "error",
            message:
              verifyPayload.error ?? "Wallet top-up verification failed.",
          });
          return;
        }

        setSubmissionState({
          status: "success",
          message: `Wallet topped up successfully. New balance: ${verifyPayload.data?.balance} ${verifyPayload.data?.currencyCode}. Refresh to see updated history.`,
        });
      },
    });

    razorpay.open();
  }

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      <label>
        Amount
        <input
          min="1"
          step="1"
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <button
        className="submit-button"
        disabled={submissionState.status === "submitting"}
      >
        {submissionState.status === "submitting"
          ? "Adding credits..."
          : "Add credits"}
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
