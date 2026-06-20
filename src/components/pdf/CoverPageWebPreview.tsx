"use client";

import {useRef} from "react";
import {PDFViewer, BlobProvider} from "@react-pdf/renderer";
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

  const handleDownloadClick = (url: string | null) => {
    if (url && template.id) {
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
  };

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

        <BlobProvider document={<CoverPageDocument template={template} user={user} />}>
          {({loading, url, error}) => {
            if (loading || !url || error) {
              return (
                <Button
                  disabled
                  className="w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {error ? "PDF unavailable" : "Preparing PDF..."}
                </Button>
              );
            }

            const fileName = `${template.courseNumber}_${studentIdForFile}_Template.pdf`;
            const isIOS = typeof window !== "undefined" && 
              (/iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

            if (isIOS) {
              return (
                <Button
                  asChild
                  className="w-full sm:w-auto"
                  onClick={() => handleDownloadClick(url)}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Template PDF
                  </a>
                </Button>
              );
            }

            return (
              <Button
                asChild
                className="w-full sm:w-auto"
                onClick={() => handleDownloadClick(url)}
              >
                <a
                  href={url}
                  download={fileName}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Template PDF
                </a>
              </Button>
            );
          }}
        </BlobProvider>
      </div>

      <div className="h-125 md:h-200 w-full rounded-xl overflow-hidden shadow-lg border border-border">
        <PDFViewer className="h-full w-full border-none">
          <CoverPageDocument template={template} user={user} />
        </PDFViewer>
      </div>
    </div>
  );
}
