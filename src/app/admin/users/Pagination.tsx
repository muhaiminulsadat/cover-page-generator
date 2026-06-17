"use client";

import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useRouter} from "next/navigation";

export function Pagination({
  currentPage,
  totalPages,
  search,
}: {
  currentPage: number;
  totalPages: number;
  search: string;
}) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (search) params.set("search", search);
    router.push(`/admin/users?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-end gap-2 pt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="h-8.5 rounded-lg border-border/60 transition-all duration-150 active:scale-[0.97] cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      <div className="text-xs font-medium text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40 select-none">
        Page {currentPage} of {totalPages}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="h-8.5 rounded-lg border-border/60 transition-all duration-150 active:scale-[0.97] cursor-pointer"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>

  );
}
