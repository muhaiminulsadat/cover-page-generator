"use client";

import {PDFViewer, PDFDownloadLink} from "@react-pdf/renderer";
import CoverPageDocument from "./CoverPageDocument";
import {Button} from "@/components/ui/button";
import {Download} from "lucide-react";
import {useEffect, useState} from "react";

interface Props {
  template: any;
  user: any;
}

export function CoverPageWebPreview({template, user}: Props) {
  // @react-pdf/renderer can sometimes complain with SSR, so we mount it safely
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="h-[600px] w-full bg-muted animate-pulse rounded-lg flex items-center justify-center">
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
          fileName={`${template.courseNumber}_${user.studentId}_Top_Sheet.pdf`}
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

      <div className="h-[500px] md:h-[800px] w-full rounded-xl overflow-hidden shadow-lg border border-border">
        <PDFViewer className="h-full w-full border-none">
          <CoverPageDocument template={template} user={user} />
        </PDFViewer>
      </div>
    </div>
  );
}
