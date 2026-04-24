import {Document} from "@react-pdf/renderer";
import {createTopSheetRenderContext} from "@/components/pdf/core/context";
import {
  TopSheetTemplateData,
  TopSheetUserData,
} from "@/components/pdf/core/types";
import {renderTopSheetByDesign} from "./registry";

interface TopSheetDocumentProps {
  template: TopSheetTemplateData;
  user: TopSheetUserData;
}

export function TopSheetDocument({template, user}: TopSheetDocumentProps) {
  const context = createTopSheetRenderContext(template, user);
  const page = renderTopSheetByDesign(template.designId, context);

  return <Document>{page}</Document>;
}
