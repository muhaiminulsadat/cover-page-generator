"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import {authClient} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import toast from "react-hot-toast";
import {resetPasswordSchema} from "@/lib/validations/auth";

interface ResetPasswordFormProps {
  token: string | null;
}

export function ResetPasswordForm({token}: ResetPasswordFormProps) {
  const router = useRouter();
  const {data: session, isPending: sessionPending} = authClient.useSession();
  const [form, setForm] = useState({password: "", confirmPassword: ""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!sessionPending && session) {
      router.push("/dashboard");
    }
  }, [sessionPending, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Reset token is missing. Please request a new link.");
      return;
    }

    const validation = resetPasswordSchema.safeParse(form);
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid input.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const {error: resetError} = await authClient.resetPassword({
        newPassword: form.password,
        token,
      });

      if (resetError) {
        setError(resetError.message ?? "Failed to reset password. The link may have expired.");
        return;
      }

      toast.success("Password reset successfully. Please log in.");
      router.push("/login");
    } catch {
      setError("Unable to reset password right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <main className="flex px-6 py-12 flex-col w-full max-w-md mx-auto relative z-10">
        <div className="flex flex-col gap-4">
          <div className="inline-flex rounded-full bg-secondary/60 border border-border px-3 py-1 self-start items-center gap-2">
            <GraduationCap className="size-3.5 text-muted-foreground" />
            <span className="font-medium text-muted-foreground text-xs leading-4">
              Verification error
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl tracking-tight mt-2">
              Invalid Link
            </h1>
            <p className="leading-relaxed text-muted-foreground text-sm">
              The password reset token is missing or invalid. Please request a new reset link.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/forgot-password">
              Request new link
            </Link>
          </Button>
          <Link
            className="text-center inline-flex items-center justify-center gap-1.5 underline-offset-2 underline font-semibold text-foreground hover:text-primary text-sm"
            href="/login"
          >
            <ArrowLeft className="size-4" />
            Back to log in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex px-6 py-12 flex-col w-full max-w-md mx-auto relative z-10">
      <div className="flex flex-col gap-4">
        <div className="inline-flex rounded-full bg-secondary/60 border border-border px-3 py-1 self-start items-center gap-2">
          <GraduationCap className="size-3.5 text-muted-foreground" />
          <span className="font-medium text-muted-foreground text-xs leading-4">
            Security update
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl tracking-tight mt-2">
            Reset password
          </h1>
          <p className="leading-relaxed text-muted-foreground text-sm">
            Enter your new password below to update and secure your account.
          </p>
        </div>
      </div>

      <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label className="font-medium text-sm" htmlFor="password">
            New password
          </Label>
          <div className="relative">
            <Lock className="top-1/2 -translate-y-1/2 size-4 text-muted-foreground absolute left-3" />
            <Input
              className="px-10"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-1"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="font-medium text-sm" htmlFor="confirmPassword">
            Confirm password
          </Label>
          <div className="relative">
            <Lock className="top-1/2 -translate-y-1/2 size-4 text-muted-foreground absolute left-3" />
            <Input
              className="px-10"
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-1"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="font-semibold text-sm mt-4 justify-center gap-2 w-full"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            "Reset password"
          )}
        </Button>
      </form>

      <p className="text-center mt-6 text-muted-foreground text-sm">
        <Link
          className="inline-flex items-center gap-1.5 underline-offset-2 underline font-semibold text-foreground hover:text-primary"
          href="/login"
        >
          <ArrowLeft className="size-4" />
          Back to log in
        </Link>
      </p>

      <div className="rounded-lg bg-secondary/30 border border-border flex mt-8 px-4 py-3 justify-center items-center gap-2">
        <ShieldCheck className="size-4 text-muted-foreground" />
        <span className="text-muted-foreground text-xs">
          Your academic data stays private and secure.
        </span>
      </div>
    </main>
  );
}
