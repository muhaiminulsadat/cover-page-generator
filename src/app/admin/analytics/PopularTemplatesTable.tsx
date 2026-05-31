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

export function PopularTemplatesTable({
  templates,
}: {
  templates: {id: string; courseNumber: string; courseTitle: string; downloads: number}[];
}) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Popular Templates</CardTitle>
        <CardDescription>Most downloaded templates</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template</TableHead>
              <TableHead className="text-right">Downloads</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{t.courseNumber}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">{t.courseTitle}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{t.downloads}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/templates/${t.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {templates.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  No templates downloaded yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
