import {Suspense} from "react";
import {cn, getAvatarBgColor} from "@/lib/utils";
import {getPaginatedUsers} from "@/lib/queries/admin";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {RoleManager} from "./RoleManager";
import {Pagination} from "./Pagination";
import {format} from "date-fns";
import {Badge} from "@/components/ui/badge";
import {UsersSearch} from "./UsersSearch";
import {UsersTableSkeleton} from "./UsersTableSkeleton";

interface PageProps {
  searchParams: Promise<{page?: string; search?: string}>;
}

function getRoleBadge(role: string) {
  switch (role) {
    case "superadmin":
      return (
        <Badge variant="outline" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 font-medium">
          Superadmin
        </Badge>
      );
    case "admin":
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 font-medium">
          Admin
        </Badge>
      );
    case "moderator":
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-medium">
          Moderator
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20 font-medium capitalize">
          {role}
        </Badge>
      );
  }
}

export default function AdminUsersPage({searchParams}: PageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">Users</h1>
          <p className="text-muted-foreground text-sm">
            Manage user roles and platform access permissions.
          </p>
        </div>
        <UsersSearch />
      </div>

      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersPageContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function UsersPageContent({searchParams}: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin" && session.user.role !== "superadmin") {
    redirect("/dashboard");
  }

  const currentUserId = session?.user?.id || "";
  const isSuperadmin = session?.user?.role === "superadmin";

  return (
    <UsersTable 
      page={page}
      search={search}
      currentUserId={currentUserId}
      isSuperadmin={isSuperadmin}
    />
  );
}

async function UsersTable({
  page,
  search,
  currentUserId,
  isSuperadmin,
}: {
  page: number;
  search: string;
  currentUserId: string;
  isSuperadmin: boolean;
}) {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag("users");

  const pageSize = 10;
  const {users, totalCount} = await getPaginatedUsers(page, pageSize, search);
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-4">
      {/* Mobile Card View (md:hidden) */}
      <div className="md:hidden space-y-3">
        {users.map((u) => (
          <div key={u.id} className="rounded-xl border bg-card/90 md:bg-card/60 md:backdrop-blur-md p-4 border-border/50 shadow-xs flex flex-col gap-3 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-border/60">
                <AvatarImage src={u.image || ""} />
                <AvatarFallback className={cn("font-semibold border text-xs", getAvatarBgColor(u.name))}>
                  {u.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm text-foreground truncate">{u.name}</span>
                <span className="text-xs text-muted-foreground truncate">{u.email}</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border/40 pt-2.5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Joined</span>
                <span className="text-xs text-foreground font-medium">
                  {format(new Date(u.createdAt), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 items-end">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Role</span>
                <RoleManager 
                  userId={u.id} 
                  currentRole={u.role} 
                  isSelf={u.id === currentUserId}
                  isSuperadmin={isSuperadmin}
                />
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="rounded-xl border bg-card/60 backdrop-blur-md p-8 text-center text-muted-foreground border-border/50 shadow-xs">
            <p className="font-medium">No users found</p>
            <p className="text-xs mt-1">Try refining your search terms.</p>
          </div>
        )}
      </div>

      {/* Desktop Table View (hidden md:block) */}
      <div className="hidden md:block rounded-xl border bg-card/60 backdrop-blur-md overflow-hidden border-border/50 shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id} className="border-border/40 hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border/60">
                      <AvatarImage src={u.image || ""} />
                      <AvatarFallback className={cn("font-semibold border text-xs", getAvatarBgColor(u.name))}>
                        {u.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm text-foreground truncate">{u.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{u.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getRoleBadge(u.role)}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(u.createdAt), "MMM d, yyyy")}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <RoleManager 
                    userId={u.id} 
                    currentRole={u.role} 
                    isSelf={u.id === currentUserId}
                    isSuperadmin={isSuperadmin}
                  />
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <p className="font-medium">No users found</p>
                    <p className="text-xs">Try refining your search terms.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} search={search} />
      )}
    </div>
  );
}
