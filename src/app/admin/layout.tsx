import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import Link from "next/link";
import {LayoutDashboard, Users, Layers, Activity} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin" && session.user.role !== "superadmin") {
    redirect("/dashboard");
  }

  const isSuperadmin = session.user.role === "superadmin";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row mt-16 w-full max-w-7xl mx-auto">
      <aside className="w-full md:w-64 border-r bg-muted/20 p-4">
        <nav className="space-y-2 flex flex-col">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <Users className="w-4 h-4" />
            Users
          </Link>
          {isSuperadmin && (
            <>
              <Link
                href="/admin/templates"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
              >
                <Layers className="w-4 h-4" />
                Templates
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
              >
                <Activity className="w-4 h-4" />
                Analytics
              </Link>
            </>
          )}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
