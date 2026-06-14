"use client";

import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, BookOpen, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperimentNamesInputProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  disabled?: boolean;
}

export function ExperimentNamesInput<TFieldValues extends FieldValues>({
  form,
  name,
  disabled,
}: ExperimentNamesInputProps<TFieldValues>) {
  const values = (form.watch(name) as string[]) || [];
  const errors = form.formState.errors[name] as Array<{ message?: string } | undefined> | undefined;

  const handleAppend = () => {
    form.setValue(
      name,
      [...values, ""] as PathValue<TFieldValues, Path<TFieldValues>>,
      { shouldValidate: true, shouldDirty: true }
    );
  };

  const handleRemove = (index: number) => {
    form.setValue(
      name,
      values.filter((_, i) => i !== index) as PathValue<TFieldValues, Path<TFieldValues>>,
      { shouldValidate: true, shouldDirty: true }
    );
  };

  const handleChange = (index: number, val: string) => {
    const updated = [...values];
    updated[index] = val;
    form.setValue(
      name,
      updated as PathValue<TFieldValues, Path<TFieldValues>>,
      { shouldValidate: true, shouldDirty: true }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListOrdered className="size-5 text-primary" />
          <h3 className="font-medium text-lg">Experiments (Index Page)</h3>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAppend}
          className="gap-2"
          disabled={disabled}
        >
          <Plus className="size-4" />
          Add Experiment
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Add experiment names to pre-fill the index page. Leave empty for
        manual handwriting (12 rows provided by default).
      </p>

      <div className={cn("space-y-3", values.length > 0 && "border p-4 rounded-lg bg-muted/30")}>
        {values.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-border/80 rounded-xl bg-muted/20">
            <BookOpen className="size-6 text-muted-foreground/50 mb-2 animate-pulse" />
            <p className="font-semibold text-sm text-foreground">No experiments added</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
              Add experiment names to pre-fill the index page. Leave empty for manual handwriting.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {values.map((value, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="pt-2 text-sm font-medium text-muted-foreground w-6">
                  {index + 1}.
                </div>
                <div className="flex-1 space-y-1">
                  <Input
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    placeholder={`Experiment ${index + 1} name...`}
                    disabled={disabled}
                    className="bg-background"
                  />
                  {errors?.[index]?.message && (
                    <p className="text-xs text-destructive">
                      {errors[index]?.message}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  disabled={disabled}
                  className="size-9 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {values.length > 0 && (
        <p className="text-[11px] text-muted-foreground">
          Tip: Leave experiment names blank if you want to provide a numbered empty row.
        </p>
      )}
    </div>
  );
}
