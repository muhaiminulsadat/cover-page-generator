"use client";

import {useState, useEffect} from "react";
import {
  Mail,
  Loader2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import {authClient} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {forgotPasswordSchema} from "@/lib/validations/auth";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const savedCooldown = sessionStorage.getItem("forgot-password-cooldown");
    if (savedCooldown) {
      const remaining = Math.round((parseInt(savedCooldown, 10) - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;

    const validation = forgotPasswordSchema.safeParse({email});
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });

      const expiry = Date.now() + 30 * 1000;
      sessionStorage.setItem("forgot-password-cooldown", expiry.toString());
      setCooldown(30);
      setSuccess(true);
    } catch {
      setError("Unable to process request right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col gap-6 mt-8 w-full">
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-4 flex gap-3">
          <CheckCircle className="size-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm text-emerald-500">
              Check your inbox
            </span>
            <p className="text-muted-foreground text-xs leading-relaxed">
              If an account exists with this email, we have sent a secure link to reset your password.
            </p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={cooldown > 0 || loading}
          className="font-semibold text-sm justify-center gap-2 w-full"
        >
          {loading ? (
            <Loader2 className="animate-spin size-4" />
          ) : cooldown > 0 ? (
            `Resend in ${cooldown}s`
          ) : (
            "Resend email"
          )}
        </Button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4 mt-8 w-full" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label className="font-medium text-sm" htmlFor="email">
          Email address
        </Label>
        <div className="relative">
          <Mail className="top-1/2 -translate-y-1/2 size-4 text-muted-foreground absolute left-3" />
          <Input
            className="pl-10"
            id="email"
            name="email"
            type="email"
            placeholder="you@university.edu"
            value={email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="font-semibold text-sm mt-4 justify-center gap-2 w-full"
        disabled={loading || cooldown > 0}
      >
        {loading ? (
          <Loader2 className="animate-spin size-4" />
        ) : cooldown > 0 ? (
          `Resend in ${cooldown}s`
        ) : (
          <>
            Send recovery link
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
