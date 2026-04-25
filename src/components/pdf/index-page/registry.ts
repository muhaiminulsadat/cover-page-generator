import {ReactElement} from "react";
import {IndexPageRenderContext} from "@/components/pdf/core/types";
import {renderClassicV1IndexPage} from "./designs/classic-v1";

interface IndexPageRendererRegistry {
  [designId: string]: (ctx: IndexPageRenderContext) => ReactElement;
}

const indexPageRendererRegistry: IndexPageRendererRegistry = {
  "index-classic-v1": renderClassicV1IndexPage,
};

export function renderIndexPageByDesign(
  context: IndexPageRenderContext,
): ReactElement {
  const renderer = indexPageRendererRegistry["index-classic-v1"];
  return renderer(context);
}
