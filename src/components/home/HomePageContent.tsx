"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";
import {LandingPage} from "@/components/home/LandingPage";
import {DashboardContent} from "@/components/home/DashboardContent";
import {DashboardSkeleton} from "@/components/home/DashboardSkeleton";
import {
  normalizeSectionCode,
  normalizeSubsectionCode,
} from "@/lib/constants/levels";

interface DashboardPayload {
  loggedIn: boolean;
  profileComplete?: boolean;
  user?: {
    id: string;
    department?: string | null;
    level?: string | null;
    term?: string | null;
    section?: string | null;
    subsection?: string | null;
    hscBatch?: string | null;
  };
  departmentLabel?: string;
  templatesList?: Array<{
    id: string;
    designId: string;
    coverDesignId: string;
    courseNumber: string;
    courseTitle: string;
    sessionTerm: string;
    departmentTarget: string | null;
    levelTarget: string | null;
    termTarget: string | null;
    hscBatchTarget: string | null;
    sectionTarget: string | null;
    subsectionTarget: string | null;
    createdBy: string;
    teacher1Name: string;
    teacher1Designation: string;
    teacher2Name: string | null;
    teacher2Designation: string | null;
    includeTopPage: boolean;
    includeCoverPage: boolean;
    includeIndexPage: boolean;
    experimentNames: string[];
    createdAt: string;
    updatedAt: string;
  }>;
}

export function HomePageContent() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();
  const [payload, setPayload] = useState<DashboardPayload | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!session?.user) {
      setPayload(null);
      setLoadingDashboard(false);
      return;
    }

    let cancelled = false;

    async function loadDashboard() {
      setLoadingDashboard(true);

      try {
        const response = await fetch("/api/home/dashboard", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const data = (await response.json()) as DashboardPayload;

        if (!cancelled) {
          setPayload(data);
          if (data.loggedIn && data.profileComplete === false) {
            router.replace("/onboarding");
          }
        }
      } catch {
        if (!cancelled) {
          setPayload(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingDashboard(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [isPending, router, session]);

  if (isPending || (session?.user && loadingDashboard && !payload)) {
    return <DashboardSkeleton />;
  }

  if (!session?.user) {
    return <LandingPage />;
  }

  if (
    payload?.loggedIn &&
    payload.profileComplete &&
    payload.user &&
    payload.templatesList
  ) {
    return (
      <DashboardContent
        templatesList={payload.templatesList as any}
        userId={payload.user.id}
        departmentLabel={payload.departmentLabel || "your department"}
      />
    );
  }

  return <DashboardSkeleton />;
}
