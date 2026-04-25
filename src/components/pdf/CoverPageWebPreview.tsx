"use client";

import {PDFViewer, PDFDownloadLink} from "@react-pdf/renderer";
import CoverPageDocument, {
  TemplateData,
  UserData,
} from "@/components/pdf/CoverPageDocument";
import {Button} from "@/components/ui/button";
import {Download} from "lucide-react";

interface Props {
  template: TemplateData;
  user: UserData;
}

export function CoverPageWebPreview({template, user}: Props) {
  const studentIdForFile = user.studentId || "unknown-id";
  const mounted = typeof window !== "undefined";

  if (!mounted)
    return (
      <div className="h-150 w-full bg-muted animate-pulse rounded-lg flex items-center justify-center">
        Loading PDF Engine...
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground md:hidden w-full text-center">
          PDF Preview might not render perfectly on some mobile browsers. You
          can always download it!
        </p>

        <PDFDownloadLink
          document={<CoverPageDocument template={template} user={user} />}
          fileName={`${template.courseNumber}_${studentIdForFile}_Top_Sheet.pdf`}
          className="no-underline w-full sm:w-auto"
        >
          {({loading}) => (
            <Button disabled={loading} className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              {loading ? "Preparing PDF..." : "Download Top Sheet"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>

      <div className="h-125 md:h-200 w-full rounded-xl overflow-hidden shadow-lg border border-border">
        <PDFViewer className="h-full w-full border-none">
          <CoverPageDocument template={template} user={user} />
        </PDFViewer>
      </div>
    </div>
  );
}
