"use client";

import {Control, FieldValues, useController, Path} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Check, FileText, Layout, List} from "lucide-react";
import {Label} from "@/components/ui/label";

interface PageSelectionProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  disabled?: boolean;
}

interface SelectionCardProps<TFieldValues extends FieldValues = FieldValues> {
  title: string;
  description: string;
  icon: React.ElementType;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  disabled?: boolean;
}

function SelectionCard<TFieldValues extends FieldValues>({
  title,
  description,
  icon: Icon,
  name,
  control,
  disabled,
}: SelectionCardProps<TFieldValues>) {
  const {
    field: {value, onChange},
  } = useController({
    name,
    control,
  });

  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!value)}
      className={cn(
        "relative flex cursor-pointer text-left flex-col gap-3 rounded-xl border-2 p-4 transition-all duration-150 active:scale-[0.98] ease-out hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        value
          ? "border-primary bg-primary/5 shadow-sm scale-[1.01]"
          : "border-muted bg-transparent opacity-70 grayscale-[0.5] hover:opacity-100 hover:grayscale-0",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <div className="flex items-center justify-between w-full">
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
    </button>
  );
}

export function PageSelection<TFieldValues extends FieldValues>({
  control,
  disabled,
}: PageSelectionProps<TFieldValues>) {
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
          name={"includeTopPage" as Path<TFieldValues>}
          control={control}
          title="Top Page"
          description="Standard academic top sheet with student details."
          icon={FileText}
          disabled={disabled}
        />
        <SelectionCard
          name={"includeCoverPage" as Path<TFieldValues>}
          control={control}
          title="Cover Page"
          description="Visual cover page with course info and artwork."
          icon={Layout}
          disabled={disabled}
        />
        <SelectionCard
          name={"includeIndexPage" as Path<TFieldValues>}
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
