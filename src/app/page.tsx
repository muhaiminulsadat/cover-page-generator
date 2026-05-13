import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {getTemplatesByMetadata} from "@/lib/queries/template";
import {Suspense} from "react";
import {DashboardContent} from "@/components/home/DashboardContent";
import {DashboardSkeleton} from "@/components/home/DashboardSkeleton";
import {LandingPage} from "@/components/home/LandingPage";
import {getDepartmentLabel} from "@/lib/constants/departments";
import {
  normalizeSectionCode,
  normalizeSubsectionCode,
} from "@/lib/constants/levels";
import {hasCompletedProfile} from "@/lib/auth";
import {redirect} from "next/navigation";

async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <LandingPage />;
  }

  const currentUser = session.user;

  if (!hasCompletedProfile(currentUser)) {
    redirect("/onboarding");
  }

  const templatesList = await getTemplatesByMetadata({
    department: currentUser.department,
    level: currentUser.level,
    term: currentUser.term,
    section: normalizeSectionCode(currentUser.section),
    subsection: normalizeSubsectionCode(currentUser.subsection),
    hscBatch: currentUser.hscBatch,
  });

  return (
    <DashboardContent
      templatesList={templatesList}
      userId={currentUser.id}
      departmentLabel={
        currentUser?.department
          ? getDepartmentLabel(currentUser.department)
          : "your department"
      }
    />
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}
