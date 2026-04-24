import {UNIVERSITY_LABELS} from "@/lib/constants/universities";
import {
  TopSheetRenderContext,
  TopSheetTemplateData,
  TopSheetUserData,
} from "./types";

export function createTopSheetRenderContext(
  template: TopSheetTemplateData,
  user: TopSheetUserData,
): TopSheetRenderContext {
  const universityLabel =
    user.university && user.university in UNIVERSITY_LABELS
      ? UNIVERSITY_LABELS[user.university as keyof typeof UNIVERSITY_LABELS]
      : "University";

  return {
    template,
    user,
    universityLabel,
  };
}
