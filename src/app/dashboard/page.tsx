import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {auth} from "@/lib/auth";
import {DashboardContent} from "@/components/home/DashboardContent";
import {getTemplatesByMetadata} from "@/lib/queries/template";
import {getDepartmentLabel} from "@/lib/constants/departments";
import {
  normalizeSectionCode,
  normalizeSubsectionCode,
} from "@/lib/constants/levels";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const profileComplete = Boolean(
    user.studentId &&
    user.university &&
    user.department &&
    user.section &&
    user.subsection &&
    user.level &&
    user.term &&
    user.hscBatch,
  );

  if (!profileComplete) {
    redirect("/onboarding");
  }

  const templatesList = await getTemplatesByMetadata({
    department: user.department,
    level: user.level,
    term: user.term,
    section: normalizeSectionCode(user.section),
    subsection: normalizeSubsectionCode(user.subsection),
    hscBatch: user.hscBatch,
  });

  return (
    <DashboardContent
      templatesList={templatesList as never}
      userId={user.id}
      departmentLabel={
        user.department
          ? getDepartmentLabel(user.department)
          : "your department"
      }
    />
  );
}
