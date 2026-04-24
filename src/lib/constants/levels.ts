export const LEVEL_VALUES = ["1", "2", "3", "4", "5"] as const;
export const TERM_VALUES = ["1", "2"] as const;
export const SECTION_VALUES = ["a", "b", "c"] as const;
export const SUBSECTION_VALUES = ["1", "2"] as const;

export interface LevelOption {
  value: (typeof LEVEL_VALUES)[number];
  label: string;
}

export interface TermOption {
  value: (typeof TERM_VALUES)[number];
  label: string;
}

export interface SectionOption {
  value: (typeof SECTION_VALUES)[number];
  label: string;
}

export interface SubsectionOption {
  value: (typeof SUBSECTION_VALUES)[number];
  label: string;
}

export const LEVEL_OPTIONS: LevelOption[] = LEVEL_VALUES.map((value) => ({
  value,
  label: `Level-${value}`,
}));

export const TERM_OPTIONS: TermOption[] = TERM_VALUES.map((value) => ({
  value,
  label: `Term-${value}`,
}));

export const SECTION_OPTIONS: SectionOption[] = SECTION_VALUES.map((value) => ({
  value,
  label: `Sec-${value.toUpperCase()}`,
}));

export function normalizeSectionCode(value?: string | null): string {
  if (!value) {
    return "";
  }

  const normalized = value.toLowerCase();
  if (SECTION_VALUES.includes(normalized as (typeof SECTION_VALUES)[number])) {
    return normalized;
  }

  return value;
}

export function getSubsectionOptions(
  section?: string | null,
): SubsectionOption[] {
  const normalizedSection = normalizeSectionCode(section);

  if (
    !SECTION_VALUES.includes(
      normalizedSection as (typeof SECTION_VALUES)[number],
    )
  ) {
    return [];
  }

  return SUBSECTION_VALUES.map((value) => ({
    value,
    label: `${normalizedSection.toUpperCase()}-${value}`,
  }));
}

export function normalizeSubsectionCode(value?: string | null): string {
  if (!value) {
    return "";
  }

  if (SUBSECTION_VALUES.includes(value as (typeof SUBSECTION_VALUES)[number])) {
    return value;
  }

  const match = value.match(/^[A-Za-z]-([12])$/);
  if (match) {
    return match[1];
  }

  return value;
}
