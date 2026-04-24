import {TopSheetDocument} from "@/components/pdf/top-sheet/document";
import {
  TopSheetTemplateData,
  TopSheetUserData,
} from "@/components/pdf/core/types";

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
  return <TopSheetDocument template={template} user={user} />;
}
