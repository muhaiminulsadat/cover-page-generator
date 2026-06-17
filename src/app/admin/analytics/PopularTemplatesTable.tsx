import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";

interface TemplateItem {
  id: string;
  courseNumber: string;
  courseTitle: string;
  downloads: number;
}

interface Props {
  templates: TemplateItem[];
}

export function PopularTemplatesTable({templates}: Props) {
  return (
    <Card className="flex-1 border-border/50 bg-card/60 backdrop-blur-md transition-all duration-200 hover:shadow-md hover:border-border/80">
      <CardHeader>
        <CardTitle className="font-heading font-semibold text-base text-foreground">
          Popular Templates
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Top course templates by generation count
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border border-border/40 bg-card/40">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Template</TableHead>
                <TableHead className="text-right">Downloads</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((t) => (
                <TableRow key={t.id} className="border-border/40 hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm text-foreground truncate">{t.courseNumber}</span>
                      <span className="text-xs text-muted-foreground truncate">{t.courseTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-sm text-foreground pr-4">
                    {t.downloads}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild
                      className="h-8.5 rounded-lg transition-all duration-150 active:scale-[0.97] cursor-pointer"
                    >
                      <Link href={`/templates/${t.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {templates.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={3} className="h-28 text-center text-muted-foreground text-xs">
                    No templates downloaded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
