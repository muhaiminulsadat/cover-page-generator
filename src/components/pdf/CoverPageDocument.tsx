import {Document} from "@react-pdf/renderer";
import {
  createCoverPageRenderContext,
  createTopSheetRenderContext,
  createIndexPageRenderContext,
} from "@/components/pdf/core/context";
import {
  TopSheetTemplateData,
  TopSheetUserData,
} from "@/components/pdf/core/types";
import {renderTopSheetByDesign} from "@/components/pdf/top-sheet/registry";
import {renderCoverPageByDesign} from "@/components/pdf/cover-page/registry";
import {renderIndexPageByDesign} from "@/components/pdf/index-page/registry";

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
  const indexPageContext = createIndexPageRenderContext(template);

  return (
    <Document>
      {renderTopSheetByDesign(template.designId, topSheetContext)}
      {renderCoverPageByDesign(template.coverDesignId, coverPageContext)}
      {renderIndexPageByDesign(indexPageContext)}
    </Document>
  );
}
