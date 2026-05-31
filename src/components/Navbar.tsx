"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {authClient} from "@/lib/auth-client";
import useSWR from "swr";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  LayoutDashboard,
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
import {fetcher} from "@/lib/fetcher";

const ThemeToggle = dynamic(
  () => import("@/components/theme-toggle").then((mod) => mod.ThemeToggle),
  {ssr: false},
);

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const {data: session, isPending} = authClient.useSession();

  const {data: dashboardData} = useSWR(
    session?.user && !isPending ? "/api/home/dashboard" : null,
    fetcher,
  );

  const profileComplete = dashboardData?.profileComplete;

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
                    className="rounded-full ring-2 ring-transparent transition-all hover:ring-border/80 data-[state=open]:ring-border"
                  >
                    <Avatar className="size-8">
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
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-64 overflow-hidden p-0"
                >
                  <div className="flex items-center gap-3 border-b border-border/70 bg-muted/30 px-4 py-3">
                    <Avatar className="size-10 shrink-0 ring-2 ring-background">
                      <AvatarImage
                        src={session.user.image ?? ""}
                        alt={session.user.name ?? ""}
                      />
                      <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
                        {session.user.name
                          ? getInitials(session.user.name)
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {session.user.name || "User"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>

                  {profileComplete !== false && (
                    <DropdownMenuGroup className="p-1.5">
                      <DropdownMenuLabel className="px-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        Workspace
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        asChild
                        className={cn(
                          "cursor-pointer rounded-lg px-2.5 py-2",
                          pathname === "/dashboard" &&
                            "bg-accent text-accent-foreground",
                        )}
                      >
                        <Link href="/dashboard">
                          <LayoutDashboard className="size-4 text-muted-foreground" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className={cn(
                          "cursor-pointer rounded-lg px-2.5 py-2",
                          pathname === "/settings" &&
                            "bg-accent text-accent-foreground",
                        )}
                      >
                        <Link href="/settings">
                          <Settings className="size-4 text-muted-foreground" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  )}

                  <DropdownMenuSeparator className="mx-0" />

                  <div className="p-1.5">
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={handleSignOut}
                      className="cursor-pointer rounded-lg px-2.5 py-2"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </DropdownMenuItem>
                  </div>
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
            <SheetContent side="right" className="w-[80vw] max-w-xs p-0">
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

                    {session && profileComplete !== false && (
                      <SheetClose asChild>
                        <Button
                          variant={
                            pathname === "/dashboard" ? "secondary" : "ghost"
                          }
                          className="h-11 w-full justify-between rounded-xl px-3"
                          asChild
                        >
                          <Link href="/dashboard">
                            <span className="flex items-center gap-2.5">
                              <LayoutDashboard className="h-4 w-4" />
                              Dashboard
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Templates
                            </span>
                          </Link>
                        </Button>
                      </SheetClose>
                    )}

                    {session && profileComplete !== false && (
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
