import {ReactElement} from "react";
import {DEFAULT_COVER_PAGE_DESIGN} from "@/lib/constants/cover-designs";
import {CoverPageRenderContext} from "@/components/pdf/core/types";
import {renderCoverClassicV1} from "./designs/cover-classic-v1";
import {renderCoverBanasree} from "./designs/cover-banasree";

interface CoverPageRendererRegistry {
  [designId: string]: (ctx: CoverPageRenderContext) => ReactElement;
}

const coverPageRendererRegistry: CoverPageRendererRegistry = {
  "cover-classic-v1": renderCoverClassicV1,
  "cover-banasree": renderCoverBanasree,
};

export function resolveCoverPageDesignId(designId?: string | null): string {
  if (designId && coverPageRendererRegistry[designId]) {
    return designId;
  }

  return DEFAULT_COVER_PAGE_DESIGN;
}

export function renderCoverPageByDesign(
  designId: string | null | undefined,
  context: CoverPageRenderContext,
): ReactElement {
  const resolvedDesignId = resolveCoverPageDesignId(designId);
  const renderer = coverPageRendererRegistry[resolvedDesignId];

  return renderer(context);
}
