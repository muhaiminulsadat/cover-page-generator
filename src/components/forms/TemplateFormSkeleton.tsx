"use client";

import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

interface TemplateFormSkeletonProps {
  isEdit?: boolean;
}

export function TemplateFormSkeleton({isEdit = false}: TemplateFormSkeletonProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto border border-border/85 shadow-md md:shadow-lg bg-card/70 backdrop-blur-md rounded-2xl py-0 gap-0">
      <CardHeader className="space-y-1.5 p-6 sm:p-8 pb-5 border-b border-border/50">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72 mt-1" />
      </CardHeader>
      <CardContent className="p-6 sm:p-8 pt-6 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>

        <div className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-64" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        <div className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3.5 w-72" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-border/60 bg-muted/15 p-4 rounded-xl">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-9 w-full" />
            </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-border/60 bg-muted/15 p-4 rounded-xl">
              <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </div>
      </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-full" />
          {isEdit && (
            <div className="pt-4 border-t mt-4 space-y-2">
              <Skeleton className="h-10 w-full bg-destructive/10" />
              <div className="flex justify-center">
                <Skeleton className="h-3 w-64" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
