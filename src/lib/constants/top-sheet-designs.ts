interface TopSheetDesign {
  value: string;
  label: string;
  previewImage: string;
}

export const TOP_SHEET_DESIGNS: readonly TopSheetDesign[] = [
  {
    value: "classic-v1",
    label: "Shurma",
    previewImage: "/top-sheet-previews/classic-v1.svg",
  },
  {
    value: "buet-submitted-v1",
    label: "Kopotakkho",
    previewImage: "/top-sheet-previews/buet-submitted-v1.svg",
  },
];

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
