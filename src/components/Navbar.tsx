"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
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
import {
  House,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  UserPlus,
} from "lucide-react";
import {useTheme} from "next-themes";
import {cn} from "@/lib/utils";

const ThemeToggle = dynamic(
  () => import("@/components/theme-toggle").then((mod) => mod.ThemeToggle),
  {ssr: false},
);

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const {data: session, isPending} = authClient.useSession();
  const {resolvedTheme, setTheme} = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
            CoverDe
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1"></div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle className="text-muted-foreground hover:text-foreground" />

          {isPending ? (
            <div className="hidden h-8 w-8 animate-pulse rounded-full bg-muted md:block" />
          ) : session ? (
            <div className="hidden md:block">
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
                        {session.user.name
                          ? getInitials(session.user.name)
                          : "U"}
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
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden md:flex"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild className="hidden md:flex">
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 rounded-full border border-border/70 bg-background text-muted-foreground shadow-xs hover:bg-muted hover:text-foreground md:hidden"
              >
                <Menu
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    mobileMenuOpen && "rotate-90",
                  )}
                />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[92vw] max-w-sm p-0">
              <div className="flex h-full flex-col bg-background">
                <SheetHeader className="border-b border-border/70 bg-muted/30 px-5 pb-4 pt-8 text-left">
                  <SheetTitle className="text-base tracking-tight">
                    Menu
                  </SheetTitle>
                  <SheetDescription>
                    Everything you need, optimized for mobile.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex h-full flex-col px-4 pb-4 pt-4">
                  {session ? (
                    <div className="mb-4 rounded-2xl border border-border/70 bg-card/80 p-3.5">
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

                  <div className="space-y-2.5">
                    <p className="px-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      Navigation
                    </p>
                    <SheetClose asChild>
                      <Button
                        variant={pathname === "/" ? "secondary" : "ghost"}
                        className="h-11 w-full justify-between rounded-xl px-3"
                        asChild
                      >
                        <Link href="/">
                          <span className="flex items-center gap-2.5">
                            <House className="h-4 w-4" />
                            Home
                          </span>
                          <span className="text-xs text-muted-foreground"></span>
                        </Link>
                      </Button>
                    </SheetClose>

                    <Button
                      variant="ghost"
                      className="h-11 w-full justify-between rounded-xl px-3"
                      onClick={() =>
                        setTheme(resolvedTheme === "dark" ? "light" : "dark")
                      }
                    >
                      <span className="flex items-center gap-2.5">
                        {resolvedTheme === "dark" ? (
                          <Sun className="h-4 w-4" />
                        ) : (
                          <Moon className="h-4 w-4" />
                        )}
                        {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Theme
                      </span>
                    </Button>

                    {session && (
                      <SheetClose asChild>
                        <Button
                          variant={
                            pathname === "/settings" ? "secondary" : "ghost"
                          }
                          className="h-11 w-full justify-between rounded-xl px-3"
                          asChild
                        >
                          <Link href="/settings">
                            <span className="flex items-center gap-2.5">
                              <Settings className="h-4 w-4" />
                              Settings
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Account
                            </span>
                          </Link>
                        </Button>
                      </SheetClose>
                    )}
                  </div>

                  <div className="mt-auto border-t border-border/70 pt-4">
                    {session ? (
                      <div className="px-1">
                        <SheetClose asChild>
                          <Button
                            variant="ghost"
                            onClick={handleSignOut}
                            className="h-11 w-full justify-start gap-2 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign out
                          </Button>
                        </SheetClose>
                      </div>
                    ) : (
                      <div className="space-y-2.5 px-1">
                        <p className="px-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Account
                        </p>
                        <SheetClose asChild>
                          <Button
                            className="h-11 w-full justify-start gap-2 rounded-xl"
                            asChild
                          >
                            <Link href="/register">
                              <UserPlus className="h-4 w-4" />
                              Create account
                            </Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant="outline"
                            className="h-10 w-full justify-start gap-2 rounded-lg"
                            asChild
                          >
                            <Link href="/login">
                              <LogIn className="h-4 w-4" />I already have an
                              account
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
