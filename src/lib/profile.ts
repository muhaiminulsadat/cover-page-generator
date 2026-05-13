export interface ProfileCompletionInput {
  studentId?: string | null;
  university?: string | null;
  department?: string | null;
  section?: string | null;
  subsection?: string | null;
  level?: string | null;
  term?: string | null;
  hscBatch?: string | null;
}

export function hasCompletedProfile(user: ProfileCompletionInput) {
  return Boolean(
    user.studentId &&
    user.university &&
    user.department &&
    user.section &&
    user.subsection &&
    user.level &&
    user.term &&
    user.hscBatch,
  );
}
