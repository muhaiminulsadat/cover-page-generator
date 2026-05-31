import {Suspense} from "react";
import {getPaginatedUsers} from "@/lib/queries/admin";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {Loader2, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
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

function getRoleBadge(role: string) {
  switch (role) {
    case "superadmin":
      return <Badge className="bg-purple-600 hover:bg-purple-700">Superadmin</Badge>;
    case "admin":
      return <Badge className="bg-blue-600 hover:bg-blue-700">Admin</Badge>;
    case "moderator":
      return <Badge className="bg-amber-600 hover:bg-amber-700">Moderator</Badge>;
    default:
      return <Badge variant="secondary" className="capitalize">{role}</Badge>;
  }
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{page?: string; search?: string}>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUserId = session?.user?.id || "";
  const isSuperadmin = session?.user?.role === "superadmin";
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage user roles and permissions.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <form action="/admin/users" method="GET">
            <Input
              type="search"
              name="search"
              placeholder="Search users..."
              className="pl-8"
              defaultValue={search}
            />
          </form>
        </div>
      </div>

      <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>}>
        <UsersTable 
          page={page} 
          search={search} 
          currentUserId={currentUserId}
          isSuperadmin={isSuperadmin}
        />
      </Suspense>
    </div>
  );
}

async function UsersTable({
  page, 
  search,
  currentUserId,
  isSuperadmin
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
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={u.image || ""} />
                      <AvatarFallback>{u.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{u.name}</span>
                      <span className="text-xs text-muted-foreground">{u.email}</span>
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
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No users found.
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
