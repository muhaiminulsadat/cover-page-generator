import {Document} from "@react-pdf/renderer";
import {
  createCoverPageRenderContext,
  createTopSheetRenderContext,
} from "@/components/pdf/core/context";
import {
  TopSheetTemplateData,
  TopSheetUserData,
} from "@/components/pdf/core/types";
import {renderTopSheetByDesign} from "@/components/pdf/top-sheet/registry";
import {renderCoverPageByDesign} from "@/components/pdf/cover-page/registry";

interface CoverPageDocumentProps {
  template: TopSheetTemplateData;
  user: TopSheetUserData;
}

export type {
  TopSheetTemplateData as TemplateData,
  TopSheetUserData as UserData,
};

export default function CoverPageDocument({
  template,
  user,
}: CoverPageDocumentProps) {
  const topSheetContext = createTopSheetRenderContext(template, user);
  const coverPageContext = createCoverPageRenderContext(template, user);

  return (
    <Document>
      {renderTopSheetByDesign(template.designId, topSheetContext)}
      {renderCoverPageByDesign(template.coverDesignId, coverPageContext)}
    </Document>
  );
}
