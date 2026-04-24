export const LEVEL_VALUES = ["1", "2", "3", "4", "5"] as const;
export const TERM_VALUES = ["1", "2"] as const;

export interface LevelOption {
  value: (typeof LEVEL_VALUES)[number];
  label: string;
}

export interface TermOption {
  value: (typeof TERM_VALUES)[number];
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
