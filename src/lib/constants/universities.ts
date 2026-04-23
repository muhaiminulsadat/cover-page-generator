export const UNIVERSITY_VALUES = [
  "buet",
  "du",
  "ruet",
  "cuet",
  "kuet",
  "sust",
  "iut",
  "nsu",
  "brac",
] as const;

export interface UniversityOption {
  value: (typeof UNIVERSITY_VALUES)[number];
  label: string;
}

export const UNIVERSITY_OPTIONS: UniversityOption[] = [
  {value: "buet", label: "Bangladesh University of Engineering and Technology (BUET)"},
  {value: "du", label: "University of Dhaka (DU)"},
  {value: "ruet", label: "Rajshahi University of Engineering and Technology (RUET)"},
  {value: "cuet", label: "Chittagong University of Engineering and Technology (CUET)"},
  {value: "kuet", label: "Khulna University of Engineering and Technology (KUET)"},
  {value: "sust", label: "Shahjalal University of Science and Technology (SUST)"},
  {value: "iut", label: "Islamic University of Technology (IUT)"},
  {value: "nsu", label: "North South University (NSU)"},
  {value: "brac", label: "BRAC University"},
];

export const UNIVERSITY_LABELS: Record<
  (typeof UNIVERSITY_VALUES)[number],
  string
> = {
  buet: "Bangladesh University of Engineering and Technology",
  du: "University of Dhaka",
  ruet: "Rajshahi University of Engineering and Technology",
  cuet: "Chittagong University of Engineering and Technology",
  kuet: "Khulna University of Engineering and Technology",
  sust: "Shahjalal University of Science and Technology",
  iut: "Islamic University of Technology",
  nsu: "North South University",
  brac: "BRAC University",
};
