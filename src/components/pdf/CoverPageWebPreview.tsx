"use client";

import {useRef} from "react";
import {PDFViewer, PDFDownloadLink} from "@react-pdf/renderer";
import CoverPageDocument, {
  TemplateData,
  UserData,
} from "@/components/pdf/CoverPageDocument";
import {Button} from "@/components/ui/button";
import {Confetti, type ConfettiRef} from "@/components/ui/confetti";
import {Download} from "lucide-react";
import {logDownloadAction} from "@/app/actions/template";
import {useAction} from "next-safe-action/hooks";

interface Props {
  template: TemplateData;
  user: UserData;
}

export function CoverPageWebPreview({template, user}: Props) {
  const studentIdForFile = user.studentId || "unknown-id";
  const mounted = typeof window !== "undefined";
  const confettiRef = useRef<ConfettiRef>(null);
  const { execute: executeLogDownload } = useAction(logDownloadAction);

  if (!mounted)
    return (
      <div className="h-150 w-full bg-muted animate-pulse rounded-lg flex items-center justify-center">
        Loading PDF Engine...
      </div>
    );

  return (
    <div className="relative flex flex-col gap-4">
      <Confetti
        ref={confettiRef}
        manualstart
        className="pointer-events-none fixed inset-0 z-50 h-dvh w-dvw"
      />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground md:hidden w-full text-center">
          PDF Preview might not render perfectly on some mobile browsers. You
          can always download it!
        </p>

        <PDFDownloadLink
          document={<CoverPageDocument template={template} user={user} />}
          fileName={`${template.courseNumber}_${studentIdForFile}_Template.pdf`}
          className="no-underline w-full sm:w-auto"
        >
          {({loading, url, error}) => (
            <Button
              disabled={loading || !url || Boolean(error)}
              className="w-full sm:w-auto"
              onClick={() => {
                if (!loading && url && !error) {
                  // Fire the download logging action in the background
                  if (template.id) {
                    executeLogDownload({ templateId: template.id });
                  }
                  
                  const bursts = [
                    {x: 0.2, y: 0.35},
                    {x: 0.8, y: 0.35},
                    {x: 0.5, y: 0.2},
                    {x: 0.5, y: 0.55},
                  ];

                  bursts.forEach((origin, index) => {
                    window.setTimeout(() => {
                      void confettiRef.current?.fire({
                        particleCount: 160,
                        spread: 140,
                        startVelocity: 48,
                        gravity: 0.9,
                        decay: 0.92,
                        ticks: 220,
                        scalar: 1.1,
                        origin,
                      });
                    }, index * 120);
                  });
                }
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              {error
                ? "PDF unavailable"
                : loading || !url
                  ? "Preparing PDF..."
                  : "Download Template PDF"}
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
