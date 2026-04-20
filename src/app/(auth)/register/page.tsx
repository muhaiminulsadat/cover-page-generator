"use client";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import {authClient} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {toast} from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({name: "", email: "", password: ""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
    setError("");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
          toast.success(
            "Account created successfully! Please check your email to verify your account.",
          );
          router.push("/");
        },
      },
    );

    setLoading(false);

    if (error) {
      setError(error.message ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your details below to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </CardContent>

          <CardFooter>
            <p className="text-sm text-muted-foreground text-center w-full">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-foreground font-medium underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
