import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {SidebarNav} from "./_components/SidebarNav";

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({children}: Props) {
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
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-8 py-6">
      <aside className="w-full md:w-64 shrink-0">
        <div className="md:rounded-xl md:border md:bg-card/60 md:backdrop-blur-md md:p-4 sticky top-16 md:top-22 md:shadow-xs md:border-border/50 p-1 bg-transparent border-none">
          <div className="px-3 mb-4 hidden md:block">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Admin Portal
            </h2>
          </div>
          <SidebarNav isSuperadmin={isSuperadmin} />
        </div>
      </aside>
      <main className="flex-1 min-w-0 bg-background/40">
        {children}
      </main>
    </div>
  );
}

