interface CoverPageDesign {
  value: string;
  label: string;
  previewImage: string;
}

export const COVER_PAGE_DESIGNS: readonly CoverPageDesign[] = [
  {
    value: "cover-classic-v1",
    label: "Bonolota",
    previewImage: "/cover-page-previews/cover-classic-v1.svg",
  },
  {
    value: "cover-banasree",
    label: "Banasree",
    previewImage: "/cover-page-previews/cover-banasree.svg",
  },
];

export const COVER_PAGE_DESIGN_VALUES = COVER_PAGE_DESIGNS.map(
  (design) => design.value,
);

export const COVER_PAGE_DESIGN_LABELS: Record<string, string> =
  COVER_PAGE_DESIGNS.reduce(
    (acc, design) => {
      acc[design.value] = design.label;
      return acc;
    },
    {} as Record<string, string>,
  );

export const DEFAULT_COVER_PAGE_DESIGN = "cover-classic-v1";
