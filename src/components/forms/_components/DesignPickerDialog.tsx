"use client";

import {useState} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DEFAULT_TOP_SHEET_DESIGN,
  TOP_SHEET_DESIGNS,
} from "@/lib/constants/top-sheet-designs";
import {DesignCardSelector} from "./DesignCardSelector";

interface DesignPickerDialogProps {
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function DesignPickerDialog({
  value,
  onValueChange,
  error,
  disabled = false,
}: DesignPickerDialogProps) {
  const [open, setOpen] = useState(false);

  const selectedDesign =
    TOP_SHEET_DESIGNS.find((design) => design.value === value) ||
    TOP_SHEET_DESIGNS.find(
      (design) => design.value === DEFAULT_TOP_SHEET_DESIGN,
    ) ||
    TOP_SHEET_DESIGNS[0];

  function handleSelect(nextValue: string) {
    onValueChange(nextValue);
    setOpen(false);
  }

  return (
    <div className="space-y-3">
      <Card className="border">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded border border-border bg-muted">
                <Image
                  src={selectedDesign.previewImage}
                  alt={`${selectedDesign.label} preview`}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Selected design</p>
                <p className="text-sm font-medium truncate">
                  {selectedDesign.label}
                </p>
              </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" disabled={disabled}>
                  Change Design
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Choose Top Sheet Design</DialogTitle>
                  <DialogDescription>
                    Pick one design style for this template.
                  </DialogDescription>
                </DialogHeader>
                <DesignCardSelector
                  value={value}
                  onValueChange={handleSelect}
                  disabled={disabled}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      {error && <p className="text-sm text-destructive font-medium">{error}</p>}
    </div>
  );
}
