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
  Layers,
  Menu,
  Moon,
  Settings,
  Shield,
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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-out",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-xs"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group select-none">
          <div className="size-7 rounded-lg bg-foreground text-background flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-105 active:scale-95">
            <Layers className="size-4" />
          </div>
          <span className="text-foreground font-bold text-sm tracking-widest uppercase font-mono bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
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
                    className="rounded-full ring-2 ring-transparent transition-[ring-color] duration-150 ease-out hover:ring-border/80 data-[state=open]:ring-border"
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
                          "cursor-pointer rounded-md px-2.5 py-2",
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
                          "cursor-pointer rounded-md px-2.5 py-2",
                          pathname === "/settings" &&
                            "bg-accent text-accent-foreground",
                        )}
                      >
                        <Link href="/settings">
                          <Settings className="size-4 text-muted-foreground" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      {(session.user.role === "admin" || session.user.role === "superadmin") && (
                        <DropdownMenuItem
                          asChild
                          className={cn(
                            "cursor-pointer rounded-md px-2.5 py-2",
                            pathname.startsWith("/admin") &&
                              "bg-accent text-accent-foreground",
                          )}
                        >
                          <Link href="/admin">
                            <Shield className="size-4 text-muted-foreground" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                  )}

                  <DropdownMenuSeparator className="mx-0" />

                  <div className="p-1.5">
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={handleSignOut}
                      className="cursor-pointer rounded-md px-2.5 py-2"
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
                className="ml-1 size-9 rounded-md border border-border/40 bg-background/50 backdrop-blur-xs text-muted-foreground shadow-2xs hover:bg-muted hover:text-foreground active:scale-95 transition-[transform,background-color,color] duration-150 ease-out md:hidden"
              >
                <Menu
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    mobileMenuOpen && "rotate-90",
                  )}
                />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] max-w-xs p-0 border-l border-border/40 bg-background shadow-2xl">
              <div className="flex h-full flex-col">
                <SheetHeader className="border-b border-border/40 px-5 pb-5 pt-8 text-left bg-muted/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="size-6 rounded-md bg-foreground text-background flex items-center justify-center">
                      <Layers className="size-3.5" />
                    </div>
                    <span className="text-foreground font-bold text-xs tracking-widest uppercase font-mono bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                      CoverDe
                    </span>
                  </div>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground/80 font-normal">
                    Everything you need, optimized for mobile.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex h-full flex-col px-4 pb-6 pt-5">
                  {session ? (
                    <div className="mb-5 rounded-lg border border-border/40 bg-muted/20 p-3.5 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-2 ring-border/10">
                          <AvatarImage
                            src={session.user.image ?? ""}
                            alt={session.user.name ?? ""}
                          />
                          <AvatarFallback className="bg-muted text-foreground text-xs font-semibold">
                            {session.user.name
                              ? getInitials(session.user.name)
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {session.user.name || "User"}
                          </p>
                          <p className="truncate text-xs text-muted-foreground/85">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="space-y-1.5">
                    <p className="px-3 mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
                      Navigation
                    </p>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "h-11 w-full justify-between rounded-md px-3 transition-all active:scale-[0.98]",
                          pathname === "/"
                            ? "bg-secondary text-secondary-foreground font-semibold"
                            : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                        )}
                        asChild
                      >
                        <Link href="/">
                          <span className="flex items-center gap-2.5">
                            <House className={cn("h-4 w-4 transition-transform", pathname === "/" ? "text-foreground" : "text-muted-foreground/75")} />
                            Home
                          </span>
                          {pathname === "/" && (
                            <span className="size-1.5 rounded-full bg-foreground" />
                          )}
                        </Link>
                      </Button>
                    </SheetClose>

                    <Button
                      variant="ghost"
                      className="h-11 w-full justify-between rounded-md px-3 text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-all active:scale-[0.98]"
                      onClick={() =>
                        setTheme(resolvedTheme === "dark" ? "light" : "dark")
                      }
                    >
                      <span className="flex items-center gap-2.5">
                        {resolvedTheme === "dark" ? (
                          <Sun className="h-4 w-4 text-muted-foreground/75" />
                        ) : (
                          <Moon className="h-4 w-4 text-muted-foreground/75" />
                        )}
                        Theme
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 bg-muted px-2 py-0.5 rounded-md border border-border/30">
                        {resolvedTheme === "dark" ? "Dark" : "Light"}
                      </span>
                    </Button>

                    {session && profileComplete !== false && (
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "h-11 w-full justify-between rounded-md px-3 transition-all active:scale-[0.98]",
                            pathname === "/dashboard"
                              ? "bg-secondary text-secondary-foreground font-semibold"
                              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                          )}
                          asChild
                        >
                          <Link href="/dashboard">
                            <span className="flex items-center gap-2.5">
                              <LayoutDashboard className={cn("h-4 w-4 transition-transform", pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground/75")} />
                              Dashboard
                            </span>
                            {pathname === "/dashboard" ? (
                              <span className="size-1.5 rounded-full bg-foreground" />
                            ) : (
                              <span className="text-xs text-muted-foreground/50 font-normal">Templates</span>
                            )}
                          </Link>
                        </Button>
                      </SheetClose>
                    )}

                    {session && profileComplete !== false && (
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "h-11 w-full justify-between rounded-md px-3 transition-all active:scale-[0.98]",
                            pathname === "/settings"
                              ? "bg-secondary text-secondary-foreground font-semibold"
                              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                          )}
                          asChild
                        >
                          <Link href="/settings">
                            <span className="flex items-center gap-2.5">
                              <Settings className={cn("h-4 w-4 transition-transform", pathname === "/settings" ? "text-foreground" : "text-muted-foreground/75")} />
                              Settings
                            </span>
                            {pathname === "/settings" ? (
                              <span className="size-1.5 rounded-full bg-foreground" />
                            ) : (
                              <span className="text-xs text-muted-foreground/50 font-normal">Account</span>
                            )}
                          </Link>
                        </Button>
                      </SheetClose>
                    )}

                    {session && (session.user.role === "admin" || session.user.role === "superadmin") && (
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "h-11 w-full justify-between rounded-md px-3 transition-all active:scale-[0.98]",
                            pathname.startsWith("/admin")
                              ? "bg-secondary text-secondary-foreground font-semibold"
                              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                          )}
                          asChild
                        >
                          <Link href="/admin">
                            <span className="flex items-center gap-2.5">
                              <Shield className={cn("h-4 w-4 transition-transform", pathname.startsWith("/admin") ? "text-foreground" : "text-muted-foreground/75")} />
                              Admin Panel
                            </span>
                            {pathname.startsWith("/admin") ? (
                              <span className="size-1.5 rounded-full bg-foreground" />
                            ) : (
                              <span className="text-xs text-muted-foreground/50 font-normal">Manage</span>
                            )}
                          </Link>
                        </Button>
                      </SheetClose>
                    )}
                  </div>

                  <div className="mt-auto border-t border-border/40 pt-5">
                    {session ? (
                      <div className="px-1">
                        <SheetClose asChild>
                          <Button
                            variant="ghost"
                            onClick={handleSignOut}
                            className="h-11 w-full justify-start gap-2.5 rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive transition-all active:scale-[0.98] px-3 font-medium text-sm"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign out
                          </Button>
                        </SheetClose>
                      </div>
                    ) : (
                      <div className="space-y-3 px-1">
                        <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
                          Account
                        </p>
                        <SheetClose asChild>
                          <Button
                            className="h-11 w-full justify-start gap-2.5 rounded-md transition-all active:scale-[0.98] font-medium text-sm shadow-sm cursor-pointer"
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
                            className="h-11 w-full justify-start gap-2.5 rounded-md border-border/60 hover:bg-muted/40 hover:text-foreground transition-all active:scale-[0.98] font-medium text-sm cursor-pointer"
                            asChild
                          >
                            <Link href="/login">
                              <LogIn className="h-4 w-4 text-muted-foreground/75" />
                              Log in
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
