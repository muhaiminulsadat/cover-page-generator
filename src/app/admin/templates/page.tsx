import {Suspense} from "react";
import {cn, getAvatarBgColor} from "@/lib/utils";
import {getPaginatedAdminTemplates} from "@/lib/queries/admin";
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
import {Pagination} from "../users/Pagination";
import {format} from "date-fns";
import {Badge} from "@/components/ui/badge";
import {DeleteTemplateDialog} from "./DeleteTemplateDialog";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {TemplatesTableSkeleton} from "./TemplatesTableSkeleton";

interface PageProps {
  searchParams: Promise<{page?: string}>;
}

export default async function AdminTemplatesPage({searchParams}: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">Templates</h1>
        <p className="text-muted-foreground text-sm">
          Moderate and manage all user-created course cover templates.
        </p>
      </div>

      <Suspense fallback={<TemplatesTableSkeleton />}>
        <AdminTemplatesTableWrapper page={page} />
      </Suspense>
    </div>
  );
}

async function AdminTemplatesTableWrapper({page}: {page: number}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.role !== "superadmin") {
    redirect("/admin");
  }

  return <AdminTemplatesTable page={page} />;
}

async function AdminTemplatesTable({
  page,
}: {
  page: number;
}) {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag("templates");

  const pageSize = 10;
  const {templates, totalCount} = await getPaginatedAdminTemplates(page, pageSize);
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card/60 backdrop-blur-md overflow-hidden border-border/50 shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Template Info</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((row) => (
              <TableRow key={row.template.id} className="border-border/40 hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-foreground">
                      {row.template.courseNumber} - {row.template.courseTitle}
                    </span>
                    <div className="flex gap-1.5 mt-1.5">
                      <Badge variant="secondary" className="text-[10px] py-0.5 px-2 bg-muted/60 text-muted-foreground">
                        {row.template.sessionTerm}
                      </Badge>
                      {row.template.departmentTarget && (
                        <Badge variant="outline" className="text-[10px] py-0.5 px-2 bg-primary/5 text-primary/80 border-primary/10">
                          {row.template.departmentTarget}
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {row.creator ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-border/60">
                        <AvatarImage src={row.creator.image || ""} />
                        <AvatarFallback className={cn("font-semibold border text-[10px]", getAvatarBgColor(row.creator.name))}>
                          {row.creator.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-foreground truncate">{row.creator.name}</span>
                        <span className="text-[10px] text-muted-foreground capitalize truncate">{row.creator.role}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs">Unknown</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(row.template.createdAt), "MMM d, yyyy")}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild 
                      className="h-8.5 rounded-lg border-border/60 transition-all duration-150 active:scale-[0.97] cursor-pointer"
                    >
                      <Link href={`/templates/${row.template.id}`}>View</Link>
                    </Button>
                    <DeleteTemplateDialog templateId={row.template.id} courseNumber={row.template.courseNumber} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {templates.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <p className="font-medium">No templates found</p>
                    <p className="text-xs">User created templates will appear here.</p>
                  </div>
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
