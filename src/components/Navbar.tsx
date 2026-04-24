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
import {House, LogIn, LogOut, Menu, Settings, UserPlus} from "lucide-react";

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
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full ring-2 ring-transparent hover:ring-border"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={session.user.image ?? ""}
                      alt={session.user.name ?? ""}
                    />
                    <AvatarFallback className="bg-muted text-foreground text-xs font-medium">
                      {session.user.name ? getInitials(session.user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
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
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden ml-1 text-muted-foreground hover:text-foreground"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-0">
              <div className="flex h-full flex-col bg-background">
                <SheetHeader className="border-b border-border bg-muted/30 px-6 py-5 text-left">
                  <SheetTitle className="text-base">Navigation</SheetTitle>
                  <SheetDescription>
                    Quick access to your account and pages.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex h-full flex-col p-4">
                  {session ? (
                    <div className="mb-4 rounded-xl border border-border bg-card p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={session.user.image ?? ""}
                            alt={session.user.name ?? ""}
                          />
                          <AvatarFallback className="bg-muted text-foreground text-xs font-medium">
                            {session.user.name
                              ? getInitials(session.user.name)
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {session.user.name || "User"}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        className="h-10 w-full justify-start gap-2 rounded-lg"
                        asChild
                      >
                        <Link href="/">
                          <House className="h-4 w-4" />
                          Home
                        </Link>
                      </Button>
                    </SheetClose>

                    {session && (
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className="h-10 w-full justify-start gap-2 rounded-lg"
                          asChild
                        >
                          <Link href="/settings">
                            <Settings className="h-4 w-4" />
                            Settings
                          </Link>
                        </Button>
                      </SheetClose>
                    )}
                  </div>

                  <div className="mt-auto border-t border-border pt-4">
                    {session ? (
                      <div className="px-1">
                        <SheetClose asChild>
                          <Button
                            variant="ghost"
                            onClick={handleSignOut}
                            className="h-10 w-full justify-start gap-2 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign out
                          </Button>
                        </SheetClose>
                      </div>
                    ) : (
                      <div className="space-y-2 px-1">
                        <SheetClose asChild>
                          <Button
                            variant="outline"
                            className="h-10 w-full justify-start gap-2 rounded-lg"
                            asChild
                          >
                            <Link href="/login">
                              <LogIn className="h-4 w-4" />
                              Log in
                            </Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            className="h-10 w-full justify-start gap-2 rounded-lg"
                            asChild
                          >
                            <Link href="/register">
                              <UserPlus className="h-4 w-4" />
                              Sign up
                            </Link>
                          </Button>
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
