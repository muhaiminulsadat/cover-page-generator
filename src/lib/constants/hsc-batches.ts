export const HSC_BATCH_VALUES = [
  "HSC-20",
  "HSC-21",
  "HSC-22",
  "HSC-23",
  "HSC-24",
  "HSC-25",
] as const;

export interface HscBatchOption {
  value: (typeof HSC_BATCH_VALUES)[number];
  label: string;
}

export const HSC_BATCH_OPTIONS: HscBatchOption[] = HSC_BATCH_VALUES.map(
  (value) => ({
    value,
    label: value,
  }),
);
