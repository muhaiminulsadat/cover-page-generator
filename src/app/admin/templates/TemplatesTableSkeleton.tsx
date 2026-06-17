import {Skeleton} from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TemplatesTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card/60 backdrop-blur-md overflow-hidden border-border/50 shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[45%]">Template Info</TableHead>
              <TableHead className="w-[20%]">Creator</TableHead>
              <TableHead className="w-[15%]">Created At</TableHead>
              <TableHead className="text-right w-[20%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({length: 6}).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent border-border/40">
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[240px] rounded-sm" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4.5 w-14 rounded-full" />
                      <Skeleton className="h-4.5 w-16 rounded-full" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-3 w-[70px] rounded-sm" />
                      <Skeleton className="h-2 w-[40px] rounded-sm" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20 rounded-sm" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-14 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
