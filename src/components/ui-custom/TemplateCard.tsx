import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ArrowRight, BookOpen, Layers, Pencil} from "lucide-react";
import {templates} from "@/db/schema";
import {getDepartmentLabel} from "@/lib/constants/departments";

interface TemplateCardProps {
  template: typeof templates.$inferSelect;
  userId: string;
  userRole?: string;
}

export function TemplateCard({template, userId, userRole}: TemplateCardProps) {
  const isOwner = template.createdBy === userId;
  const canEdit = isOwner || userRole === "superadmin";
  return (
    <Card className="flex flex-col flex-1 h-full overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="flex-1 pb-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <Badge variant="secondary" className="font-mono">
            {template.courseNumber}
          </Badge>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Layers className="w-3 h-3" />
            {template.sessionTerm}
          </div>
        </div>
        <CardTitle className="text-lg leading-tight line-clamp-2">
          {template.courseTitle}
        </CardTitle>
        <CardDescription className="flex flex-col gap-1 mt-2 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5" />
            {template.teacher1Name}{" "}
            {template.teacher2Name && `& ${template.teacher2Name}`}
          </span>
        </CardDescription>
        {/* Simple badges for targeting meta */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {template.departmentTarget && (
            <Badge
              variant="outline"
              className="text-[10px] uppercase tracking-wider"
            >
              {getDepartmentLabel(template.departmentTarget)}
            </Badge>
          )}
          {template.levelTarget && (
            <Badge
              variant="outline"
              className="text-[10px] uppercase tracking-wider"
            >
              Level {template.levelTarget}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardFooter className="pt-0 border-t bg-muted/20 px-6 py-4 gap-2">
        <Button variant="default" className="flex-1" asChild>
          <Link href={`/templates/${template.id}`}>
            Preview & Generate <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
        {canEdit && (
          <Button variant="outline" size="icon" asChild title="Edit template">
            <Link href={`/templates/${template.id}/edit`}>
              <Pencil className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
