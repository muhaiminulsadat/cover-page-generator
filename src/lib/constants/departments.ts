export const DEPARTMENT_VALUES = [
  "ce",
  "cse",
  "eee",
  "me",
  "ipe",
  "arch",
  "urp",
  "wre",
  "che",
  "bme",
] as const;

export interface DepartmentOption {
  value: (typeof DEPARTMENT_VALUES)[number];
  label: string;
}

export const DEPARTMENT_OPTIONS: DepartmentOption[] = [
  {value: "ce", label: "Civil Engineering (CE)"},
  {value: "cse", label: "Computer Science and Engineering (CSE)"},
  {value: "eee", label: "Electrical and Electronic Engineering (EEE)"},
  {value: "me", label: "Mechanical Engineering (ME)"},
  {value: "ipe", label: "Industrial and Production Engineering (IPE)"},
  {value: "arch", label: "Architecture"},
  {value: "urp", label: "Urban and Regional Planning (URP)"},
  {value: "wre", label: "Water Resources Engineering (WRE)"},
  {value: "che", label: "Chemical Engineering (ChE)"},
  {value: "bme", label: "Biomedical Engineering (BME)"},
];

export const DEPARTMENT_LABELS: Record<
  (typeof DEPARTMENT_VALUES)[number],
  string
> = {
  ce: "Civil Engineering",
  cse: "Computer Science and Engineering",
  eee: "Electrical and Electronic Engineering",
  me: "Mechanical Engineering",
  ipe: "Industrial and Production Engineering",
  arch: "Architecture",
  urp: "Urban and Regional Planning",
  wre: "Water Resources Engineering",
  che: "Chemical Engineering",
  bme: "Biomedical Engineering",
};

export const DEPARTMENT_LEGACY_TO_CODE: Record<
  string,
  (typeof DEPARTMENT_VALUES)[number]
> = {
  "Civil Engineering": "ce",
  "Computer Science and Engineering": "cse",
  "Electrical and Electronic Engineering": "eee",
  "Mechanical Engineering": "me",
  "Industrial and Production Engineering": "ipe",
  Architecture: "arch",
  "Urban and Regional Planning": "urp",
  "Water Resources Engineering": "wre",
  "Chemical Engineering": "che",
  "Biomedical Engineering": "bme",
};

export function normalizeDepartmentCode(value?: string | null): string {
  if (!value) {
    return "";
  }

  if (value in DEPARTMENT_LABELS) {
    return value;
  }

  if (value in DEPARTMENT_LEGACY_TO_CODE) {
    return DEPARTMENT_LEGACY_TO_CODE[value];
  }

  return value;
}

export function getDepartmentLabel(value?: string | null): string {
  const normalized = normalizeDepartmentCode(value);
  if (normalized in DEPARTMENT_LABELS) {
    return DEPARTMENT_LABELS[normalized as keyof typeof DEPARTMENT_LABELS];
  }
  return value || "-";
}
