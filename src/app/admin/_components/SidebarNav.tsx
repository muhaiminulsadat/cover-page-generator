"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {Users, Layers, Activity} from "lucide-react";

interface Props {
  isSuperadmin: boolean;
}

export function SidebarNav({isSuperadmin}: Props) {
  const pathname = usePathname();

  // Helper to determine if link is active
  const isActive = (href: string) => {
    return pathname === href;
  };

  const navItems = [
    {
      href: "/admin/users",
      label: "Users",
      icon: Users,
      show: true,
    },
    {
      href: "/admin/templates",
      label: "Templates",
      icon: Layers,
      show: isSuperadmin,
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: Activity,
      show: isSuperadmin,
    },
  ];

  return (
    <nav className="flex flex-row md:flex-col gap-1.5 md:space-y-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {navItems
        .filter((item) => item.show)
        .map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ease-out shrink-0",
                "active:scale-[0.98] outline-hidden",
                active
                  ? "bg-primary text-primary-foreground shadow-xs shadow-primary/10"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("w-4.5 h-4.5 transition-transform duration-200", active && "scale-110")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
    </nav>
  );
}
