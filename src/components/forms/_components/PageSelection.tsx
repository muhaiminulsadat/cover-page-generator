"use client";

import {Control, useController} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Check, FileText, Layout, List} from "lucide-react";
import {Label} from "@/components/ui/label";

interface PageSelectionProps {
  control: Control<any>;
  disabled?: boolean;
}

interface SelectionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  name: string;
  control: Control<any>;
  disabled?: boolean;
}

function SelectionCard({
  title,
  description,
  icon: Icon,
  name,
  control,
  disabled,
}: SelectionCardProps) {
  const {
    field: {value, onChange},
  } = useController({
    name,
    control,
  });

  return (
    <div
      onClick={() => !disabled && onChange(!value)}
      className={cn(
        "relative flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition-all duration-200 hover:border-primary/50",
        value
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-muted bg-transparent opacity-70 grayscale-[0.5]",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "rounded-lg p-2 transition-colors",
            value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {value && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground animate-in zoom-in duration-200">
            <Check className="h-3 w-3" strokeWidth={3} />
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-sm leading-none">{title}</p>
        <p className="text-xs text-muted-foreground leading-snug">{description}</p>
      </div>
    </div>
  );
}

export function PageSelection({control, disabled}: PageSelectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <Label className="text-base font-semibold">Included Pages</Label>
        <p className="text-[0.8rem] text-muted-foreground">
          Choose which pages should be generated in the final document.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SelectionCard
          name="includeTopPage"
          control={control}
          title="Top Page"
          description="Standard academic top sheet with student details."
          icon={FileText}
          disabled={disabled}
        />
        <SelectionCard
          name="includeCoverPage"
          control={control}
          title="Cover Page"
          description="Visual cover page with course info and artwork."
          icon={Layout}
          disabled={disabled}
        />
        <SelectionCard
          name="includeIndexPage"
          control={control}
          title="Index Page"
          description="Generated index table for experiment tracking."
          icon={List}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
