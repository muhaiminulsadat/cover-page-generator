import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {db} from "@/db";
import {user as userSchema} from "@/db/schema";
import {eq} from "drizzle-orm";
import {getTemplatesByMetadata, getAllTemplates} from "@/lib/queries/template";
import {Suspense} from "react";
import {DashboardContent} from "@/components/home/DashboardContent";
import {DashboardSkeleton} from "@/components/home/DashboardSkeleton";
import {LandingPage} from "@/components/home/LandingPage";
import {getDepartmentLabel} from "@/lib/constants/departments";
import {
  normalizeSectionCode,
  normalizeSubsectionCode,
} from "@/lib/constants/levels";

async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <LandingPage />;
  }

  const sessionUser = session.user;

  let currentUser = null;
  try {
    const users = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.id, sessionUser.id));
    currentUser = users[0];
  } catch (error) {
    console.error("Error fetching user in Dashboard:", error);
    throw error;
  }

  const templatesList = currentUser
    ? await getTemplatesByMetadata({
        department: currentUser.department,
        level: currentUser.level,
        term: currentUser.term,
        section: normalizeSectionCode(currentUser.section),
        subsection: normalizeSubsectionCode(currentUser.subsection),
        hscBatch: currentUser.hscBatch,
      })
    : await getAllTemplates();

  return (
    <DashboardContent
      templatesList={templatesList}
      userId={sessionUser.id}
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
