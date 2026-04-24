"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import toast from "react-hot-toast";
import {Menu} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();
  const [scrolled, setScrolled] = useState(false);

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
            CoverIt
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1"></div>

        <div className="flex items-center gap-2">
          {session && (
            <Link
              href="/"
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
                  <Link href="/">Dashboard</Link>
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

          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-90 p-0">
              <div className="flex h-full flex-col">
                <SheetHeader className="border-b border-border px-6 py-5">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Quick access to the main pages.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex h-full flex-col px-3 py-4">
                  <div className="space-y-1">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className="flex items-center rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                      >
                        Home
                      </Link>
                    </SheetClose>

                    {session && (
                      <SheetClose asChild>
                        <Link
                          href="/"
                          className="flex items-center rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                        >
                          Dashboard
                        </Link>
                      </SheetClose>
                    )}

                    {session && (
                      <SheetClose asChild>
                        <Link
                          href="/settings"
                          className="flex items-center rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                        >
                          Settings
                        </Link>
                      </SheetClose>
                    )}
                  </div>

                  <div className="mt-auto border-t border-border pt-4">
                    {session ? (
                      <div className="space-y-3 px-3">
                        <div className="rounded-lg border border-border bg-muted/40 p-3">
                          <p className="text-sm font-medium text-foreground truncate">
                            {session.user.name || "User"}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground truncate">
                            {session.user.email}
                          </p>
                        </div>
                        <SheetClose asChild>
                          <button
                            onClick={handleSignOut}
                            className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                          >
                            Sign out
                          </button>
                        </SheetClose>
                      </div>
                    ) : (
                      <div className="space-y-2 px-3">
                        <SheetClose asChild>
                          <Link
                            href="/login"
                            className="flex items-center rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                          >
                            Log in
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/register"
                            className="flex items-center rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                          >
                            Sign up
                          </Link>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
