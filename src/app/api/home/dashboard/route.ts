import {NextResponse} from "next/server";
import {headers} from "next/headers";
import {auth} from "@/lib/auth";
import {getTemplatesByMetadata} from "@/lib/queries/template";
import {getDepartmentLabel} from "@/lib/constants/departments";
import {
  normalizeSectionCode,
  normalizeSubsectionCode,
} from "@/lib/constants/levels";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({loggedIn: false}, {status: 401});
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
    return NextResponse.json({loggedIn: true, profileComplete: false});
  }

  const templatesList = await getTemplatesByMetadata({
    department: user.department,
    level: user.level,
    term: user.term,
    section: normalizeSectionCode(user.section),
    subsection: normalizeSubsectionCode(user.subsection),
    hscBatch: user.hscBatch,
  });

  return NextResponse.json({
    loggedIn: true,
    profileComplete: true,
    user: {
      id: user.id,
      department: user.department,
      level: user.level,
      term: user.term,
      section: user.section,
      subsection: user.subsection,
      hscBatch: user.hscBatch,
    },
    departmentLabel: user.department
      ? getDepartmentLabel(user.department)
      : "your department",
    templatesList,
  });
}
