import {Suspense} from "react";
import {getPaginatedAdminTemplates} from "@/lib/queries/admin";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {Loader2} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Pagination} from "../users/Pagination";
import {format} from "date-fns";
import {Badge} from "@/components/ui/badge";
import {DeleteTemplateDialog} from "./DeleteTemplateDialog";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function AdminTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{page?: string}>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.role !== "superadmin") {
    redirect("/admin");
  }

  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground">
          Moderate all user-created templates.
        </p>
      </div>

      <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>}>
        <AdminTemplatesTable page={page} />
      </Suspense>
    </div>
  );
}

async function AdminTemplatesTable({page}: {page: number}) {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag("templates");

  const pageSize = 10;
  const {templates, totalCount} = await getPaginatedAdminTemplates(page, pageSize);
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template Info</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((row) => (
              <TableRow key={row.template.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">
                      {row.template.courseNumber} - {row.template.courseTitle}
                    </span>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">
                        {row.template.sessionTerm}
                      </Badge>
                      {row.template.departmentTarget && (
                        <Badge variant="outline" className="text-[10px]">
                          {row.template.departmentTarget}
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {row.creator ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={row.creator.image || ""} />
                        <AvatarFallback>{row.creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{row.creator.name}</span>
                        <span className="text-xs text-muted-foreground">{row.creator.role}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Unknown</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(row.template.createdAt), "MMM d, yyyy")}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/templates/${row.template.id}`}>View</Link>
                    </Button>
                    <DeleteTemplateDialog templateId={row.template.id} courseNumber={row.template.courseNumber} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {templates.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No templates found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} search="" />
      )}
    </div>
  );
}
