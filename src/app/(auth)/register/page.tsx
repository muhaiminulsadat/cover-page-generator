"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  User,
  Loader2,
} from "lucide-react";
import {authClient} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const {data: session, isPending: sessionPending} = authClient.useSession();
  const [form, setForm] = useState({name: "", email: "", password: ""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (!sessionPending && session) {
      router.push("/onboarding");
    }
  }, [sessionPending, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
    setError("");
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setGoogleLoading(true);

      const {error} = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (error) {
        setError(error.message ?? "Google sign in is currently unavailable.");
      }
    } catch {
      setError("Google sign in is currently unavailable.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent,
  ) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const {error} = await authClient.signUp.email(
      {
        name: form.name,
        email: form.email,
        password: form.password,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully!");
          router.push("/onboarding");
        },
      },
    );

    setLoading(false);

    if (error) {
      setError(error.message ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/onboarding");
    router.refresh();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <main className="flex px-6 py-12 flex-col w-full max-w-md mx-auto relative z-10">
        <div className="flex flex-col gap-2">
          <div className="rounded-full bg-secondary/60 border border-border flex px-3 py-1 items-center gap-2 w-fit">
            <GraduationCap className="size-3.5 text-muted-foreground" />
            <span className="font-medium text-muted-foreground text-xs leading-4">
              For university students
            </span>
          </div>
          <h1 className="leading-tight font-bold text-3xl tracking-tight mt-4">
            Create your account
          </h1>
          <p className="leading-relaxed text-muted-foreground text-sm">
            Set up your profile once and generate perfectly formatted lab PDFs
            in seconds.
          </p>
        </div>

        <div className="flex mt-8 flex-col gap-3">
          <Button
            className="font-medium text-sm justify-center gap-3 w-full"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
          >
            {googleLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.1a6.6 6.6 0 0 1 0-4.22V7.04H2.18a11 11 0 0 0 0 9.92l3.66-2.86z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Continue with Google
          </Button>
        </div>

        <div className="flex my-6 items-center gap-4">
          <div className="bg-border flex-1 h-px" />
          <span className="text-muted-foreground text-xs">
            or sign up with email
          </span>
          <div className="bg-border flex-1 h-px" />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label className="font-medium text-sm" htmlFor="name">
              Full name
            </Label>
            <div className="relative">
              <User className="top-1/2 size-4 -translate-y-1/2 text-muted-foreground absolute left-3" />
              <Input
                className="pl-10"
                id="name"
                name="name"
                placeholder="e.g. Muhaiminul Islam Sadat"
                value={form.name}
                onChange={handleChange}
                disabled={loading || googleLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-medium text-sm" htmlFor="email">
              Email address
            </Label>
            <div className="relative">
              <Mail className="top-1/2 size-4 -translate-y-1/2 text-muted-foreground absolute left-3" />
              <Input
                className="pl-10"
                id="email"
                name="email"
                type="email"
                placeholder="e.g. sadat@handsome.beshi"
                value={form.email}
                onChange={handleChange}
                disabled={loading || googleLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-medium text-sm" htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <Lock className="top-1/2 size-4 -translate-y-1/2 text-muted-foreground absolute left-3" />
              <Input
                className="px-10"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                disabled={loading || googleLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
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
            disabled={loading || googleLoading}
          >
            {loading ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <>
                Create account
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>

        <div className="text-sm flex mt-6 justify-center items-center gap-1">
          <span className="text-muted-foreground">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="underline font-semibold text-foreground hover:text-primary"
          >
            Log in
          </Link>
        </div>

        <div className="rounded-lg bg-secondary/30 border border-border flex mt-8 px-4 py-3 justify-center items-center gap-2">
          <ShieldCheck className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground text-xs">
            Your academic data stays private and secure.
          </span>
        </div>
      </main>
    </div>
  );
}
