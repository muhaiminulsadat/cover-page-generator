import {Document} from "@react-pdf/renderer";
import {createCoverPageRenderContext} from "@/components/pdf/core/context";
import {
  TopSheetTemplateData,
  TopSheetUserData,
} from "@/components/pdf/core/types";
import {renderCoverPageByDesign} from "./registry";

interface CoverPageDocumentProps {
  template: TopSheetTemplateData;
  user: TopSheetUserData;
}

export function CoverPageDocument({template, user}: CoverPageDocumentProps) {
  const context = createCoverPageRenderContext(template, user);
  const page = renderCoverPageByDesign(template.coverDesignId, context);

  return <Document>{page}</Document>;
}
