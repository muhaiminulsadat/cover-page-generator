"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";
import {LandingPage} from "@/components/home/LandingPage";
import {DashboardContent} from "@/components/home/DashboardContent";
import {DashboardSkeleton} from "@/components/home/DashboardSkeleton";
import useSWR from "swr";

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

import {fetcher} from "@/lib/fetcher";

export function HomePageContent() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();

  const {data: payload, isValidating: loadingDashboard} =
    useSWR<DashboardPayload>(
      session?.user && !isPending ? "/api/home/dashboard" : null,
      fetcher,
    );

  useEffect(() => {
    if (payload?.loggedIn && payload?.profileComplete === false) {
      router.replace("/onboarding");
    }
  }, [payload, router]);

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
        templatesList={payload.templatesList as never}
        userId={payload.user.id}
        departmentLabel={payload.departmentLabel || "your department"}
      />
    );
  }

  return <DashboardSkeleton />;
}
