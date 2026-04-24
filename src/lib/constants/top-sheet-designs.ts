export const TOP_SHEET_DESIGNS = [
  {
    value: "classic-v1",
    label: "Classic Top Sheet",
  },
  {
    value: "buet-submitted-v1",
    label: "BUET Submitted Style",
  },
] as const;

export const TOP_SHEET_DESIGN_VALUES = TOP_SHEET_DESIGNS.map(
  (design) => design.value,
);

export const TOP_SHEET_DESIGN_LABELS: Record<string, string> =
  TOP_SHEET_DESIGNS.reduce(
    (acc, design) => {
      acc[design.value] = design.label;
      return acc;
    },
    {} as Record<string, string>,
  );

export const DEFAULT_TOP_SHEET_DESIGN = "classic-v1";
