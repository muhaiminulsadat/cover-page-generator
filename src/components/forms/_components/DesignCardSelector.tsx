import {Card, CardContent} from "@/components/ui/card";
import {Check} from "lucide-react";
import {cn} from "@/lib/utils";
import Image from "next/image";

interface DesignOption {
  value: string;
  label: string;
  previewImage: string;
}

interface DesignCardSelectorProps {
  value: string;
  designs: readonly DesignOption[];
  onValueChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function DesignCardSelector({
  value,
  designs,
  onValueChange,
  error,
  disabled = false,
}: DesignCardSelectorProps) {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onValueChange(designs[index].value);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {designs.map((design, index) => (
          <button
            key={design.value}
            type="button"
            onClick={() => onValueChange(design.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={disabled}
            className={cn(
              "relative text-left",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "transition-colors duration-200",
              disabled && "cursor-not-allowed opacity-50",
              !disabled && "hover:shadow-sm",
            )}
          >
            <Card
              className={cn(
                "cursor-pointer border-2 transition-colors duration-200",
                value === design.value
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-muted-foreground/50",
              )}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-snug">
                      {design.label}
                    </h3>
                    <div className="mt-3 aspect-video w-full overflow-hidden rounded border border-border bg-muted">
                      <div className="relative h-full w-full">
                        <Image
                          src={design.previewImage}
                          alt={`${design.label} preview`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200",
                      value === design.value
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30 bg-transparent",
                    )}
                  >
                    {value === design.value && (
                      <Check className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-destructive font-medium">{error}</p>}
    </div>
  );
}
