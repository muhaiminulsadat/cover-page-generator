import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {formatDistanceToNow} from "date-fns";

export function RecentDownloadsTable({
  downloads,
}: {
  downloads: {id: string; templateName: string | null; userName: string | null; downloadedAt: Date}[];
}) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Recent Downloads</CardTitle>
        <CardDescription>Latest generated PDFs</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {downloads.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-medium text-sm">
                  {d.templateName || "Unknown Template"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {d.userName || "Unknown User"}
                </TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(d.downloadedAt), {addSuffix: true})}
                </TableCell>
              </TableRow>
            ))}
            {downloads.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  No downloads recorded.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
