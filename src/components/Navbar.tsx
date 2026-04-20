"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {authClient} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {toast} from "sonner";

export default function Navbar() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully.");
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background border-b border-border"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path
                d="M12 2L2 7l10 5 10-5-10-5z"
                fill="currentColor"
                className="text-background"
              />
              <path
                d="M2 17l10 5 10-5"
                stroke="currentColor"
                className="text-background"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2 12l10 5 10-5"
                stroke="currentColor"
                className="text-background"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-foreground font-semibold text-base tracking-tight font-mono">
            starter
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1"></div>

        <div className="flex items-center gap-2">
          {session && (
            <Link
              href="/dashboard"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-all duration-150"
            >
              Dashboard
            </Link>
          )}
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full outline-none ring-2 ring-transparent hover:ring-border transition-all duration-150">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={session.user.image ?? ""}
                      alt={session.user.name ?? ""}
                    />
                    <AvatarFallback className="bg-muted text-foreground text-xs font-medium">
                      {session.user.name ? getInitials(session.user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 mt-1">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {session.user.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {session.user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:flex"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-1 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-1">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
          >
            Home
          </Link>
          {session && (
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
            >
              Dashboard
            </Link>
          )}
          {!session && (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
