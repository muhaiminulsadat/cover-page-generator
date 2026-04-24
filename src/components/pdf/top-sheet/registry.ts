import {ReactElement} from "react";
import {DEFAULT_TOP_SHEET_DESIGN} from "@/lib/constants/top-sheet-designs";
import {TopSheetRenderContext} from "@/components/pdf/core/types";
import {renderClassicV1TopSheet} from "./designs/classic-v1";
import {renderBuetSubmittedV1TopSheet} from "./designs/buet-submitted-v1";

interface TopSheetRendererRegistry {
  [designId: string]: (ctx: TopSheetRenderContext) => ReactElement;
}

const topSheetRendererRegistry: TopSheetRendererRegistry = {
  "classic-v1": renderClassicV1TopSheet,
  "buet-submitted-v1": renderBuetSubmittedV1TopSheet,
};

export function resolveTopSheetDesignId(designId?: string | null): string {
  if (designId && topSheetRendererRegistry[designId]) {
    return designId;
  }

  return DEFAULT_TOP_SHEET_DESIGN;
}

export function renderTopSheetByDesign(
  designId: string | null | undefined,
  context: TopSheetRenderContext,
): ReactElement {
  const resolvedDesignId = resolveTopSheetDesignId(designId);
  const renderer = topSheetRendererRegistry[resolvedDesignId];

  return renderer(context);
}
