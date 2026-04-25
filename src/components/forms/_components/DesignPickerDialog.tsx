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
import {DesignCardSelector} from "./DesignCardSelector";

interface DesignOption {
  value: string;
  label: string;
  previewImage: string;
}

interface DesignPickerDialogProps {
  value: string;
  designs: readonly DesignOption[];
  defaultDesign: string;
  pickerTitle: string;
  pickerDescription: string;
  buttonText?: string;
  onValueChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function DesignPickerDialog({
  value,
  designs,
  defaultDesign,
  pickerTitle,
  pickerDescription,
  buttonText = "Change Design",
  onValueChange,
  error,
  disabled = false,
}: DesignPickerDialogProps) {
  const [open, setOpen] = useState(false);

  const selectedDesign =
    designs.find((design) => design.value === value) ||
    designs.find((design) => design.value === defaultDesign) ||
    designs[0];

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
                  {buttonText}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{pickerTitle}</DialogTitle>
                  <DialogDescription>{pickerDescription}</DialogDescription>
                </DialogHeader>
                <DesignCardSelector
                  value={value}
                  designs={designs}
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
