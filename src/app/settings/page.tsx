import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {Suspense} from "react";
import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Group,
  Hash,
  Layers,
  Lock,
  LogOut,
  Mail,
  Pencil,
  School,
  ShieldCheck,
  Users,
} from "lucide-react";
import {cn} from "@/lib/utils";
import {auth} from "@/lib/auth";
import {ProfileSettingsForm} from "@/components/forms/ProfileSettingsForm";
import {SettingsActions} from "@/components/SettingsActions";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {UNIVERSITY_LABELS} from "@/lib/constants/universities";
import {normalizeDepartmentCode} from "@/lib/constants/departments";
import {
  normalizeSectionCode,
  normalizeSubsectionCode,
} from "@/lib/constants/levels";
import {Skeleton} from "@/components/ui/skeleton";
import {Separator} from "@/components/ui/separator";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsPageSkeleton />}>
      <SettingsPageContent />
    </Suspense>
  );
}

async function SettingsPageContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirect("/login");
  }

  const currentUser = session.user;

  const universityLabel =
    currentUser.university && currentUser.university in UNIVERSITY_LABELS
      ? UNIVERSITY_LABELS[
          currentUser.university as keyof typeof UNIVERSITY_LABELS
        ]
      : "Not selected";

  const departmentLabel =
    normalizeDepartmentCode(currentUser.department) || "Not set";
  const sectionLabel = normalizeSectionCode(currentUser.section) || "Not set";
  const subsectionLabel =
    normalizeSubsectionCode(currentUser.subsection) || "Not set";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 pb-12 dark:bg-background">
      <div className="mx-auto w-full max-w-xl px-4 sm:px-6">
        <div className="flex flex-col gap-5">
          <Card className="overflow-hidden border-0 shadow-sm mt-4 sm:mt-10 rounded-xl">
            <div className="h-28 bg-gradient-to-r from-muted via-muted/80 to-muted sm:h-32" />

            <div className="relative px-5 pb-6 sm:px-6">
              <div className="-mt-14 flex flex-col items-center gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:gap-5">
                <Avatar className="size-24 shrink-0 rounded-full ring-[3px] ring-card shadow-md sm:size-28">
                  <AvatarImage
                    src={session.user.image ?? ""}
                    alt={session.user.name ?? "User"}
                  />
                  <AvatarFallback className="bg-muted text-xl font-semibold sm:text-2xl">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-center sm:items-start sm:pb-0.5 sm:text-left">
                  <div className="flex items-center gap-1.5">
                    <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
                      {currentUser.name}
                    </h1>
                    <BadgeCheck className="size-5 shrink-0 fill-primary text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                    <Mail className="size-3.5 shrink-0" />
                    <span className="truncate">{currentUser.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                <Badge variant="secondary" className="gap-1 py-1">
                  <School className="size-3" />
                  <span className="max-w-[200px] truncate sm:max-w-none">
                    {universityLabel !== "Not selected" && universityLabel
                      ? universityLabel
                      : "University not set"}
                  </span>
                </Badge>
                {departmentLabel !== "Not set" && (
                  <Badge variant="secondary" className="gap-1 py-1">
                    <BookOpen className="size-3" />
                    {departmentLabel}
                  </Badge>
                )}
                {currentUser.studentId && (
                  <Badge variant="secondary" className="gap-1 py-1">
                    <Hash className="size-3" />
                    {currentUser.studentId}
                  </Badge>
                )}
              </div>

              <Separator className="mt-5" />

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                <StatCell
                  label="Level"
                  value={currentUser.level || "—"}
                />
                <StatCell
                  label="Term"
                  value={currentUser.term || "—"}
                />
                <StatCell
                  label="Section"
                  value={sectionLabel !== "Not set" ? sectionLabel : "—"}
                />
                <StatCell
                  label="Subsection"
                  value={subsectionLabel !== "Not set" ? subsectionLabel : "—"}
                />
              </div>
            </div>
          </Card>

          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-md bg-muted">
                  <GraduationCap className="size-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-base font-semibold">
                  Academic Details
                </CardTitle>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="h-8 gap-1.5 px-3 text-xs"
                    size="sm"
                    variant="outline"
                  >
                    <Pencil className="size-3" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-h-[90dvh] overflow-y-auto rounded-xl p-4 sm:max-w-2xl sm:rounded-xl sm:p-6">
                  <ProfileSettingsForm
                    initialValues={{
                      name: currentUser.name,
                      studentId: currentUser.studentId || "",
                      university: currentUser.university || "",
                      department: normalizeDepartmentCode(
                        currentUser.department,
                      ),
                      section: normalizeSectionCode(currentUser.section),
                      subsection: normalizeSubsectionCode(
                        currentUser.subsection,
                      ),
                      level: currentUser.level || "",
                      term: currentUser.term || "",
                      hscBatch: currentUser.hscBatch || "",
                    }}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex flex-col gap-0.5">
                <DetailRow
                  icon={<School className="size-4" />}
                  label="University"
                  value={universityLabel}
                />
                <DetailRow
                  icon={<BookOpen className="size-4" />}
                  label="Department"
                  value={departmentLabel}
                />
                <DetailRow
                  icon={<Hash className="size-4" />}
                  label="Student ID"
                  value={currentUser.studentId || "Not set"}
                />

                <Separator className="my-2" />

                <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                  <DetailRow
                    icon={<Layers className="size-4" />}
                    label="Level"
                    value={currentUser.level || "Not set"}
                  />
                  <DetailRow
                    icon={<CalendarDays className="size-4" />}
                    label="Term"
                    value={currentUser.term || "Not set"}
                  />
                  <DetailRow
                    icon={<Users className="size-4" />}
                    label="Section"
                    value={sectionLabel}
                  />
                  <DetailRow
                    icon={<Group className="size-4" />}
                    label="Subsection"
                    value={subsectionLabel}
                  />
                </div>

                <Separator className="my-2" />

                <DetailRow
                  icon={<Award className="size-4" />}
                  label="HSC Batch"
                  value={currentUser.hscBatch || "Not set"}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-xl">
            <CardContent className="py-0">
              <SettingsActions />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface StatCellProps {
  label: string;
  value: string;
}

function StatCell({label, value}: StatCellProps) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-lg bg-muted/50 px-3 py-2.5">
      <span className="text-lg font-bold tracking-tight">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function DetailRow({icon, label, value}: DetailRowProps) {
  const isEmpty = value === "Not set" || value === "Not selected";

  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/40">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
        {icon}
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground shrink-0">{label}</span>
        <span
          className={cn(
            "truncate text-sm font-medium text-right ml-auto min-w-0",
            isEmpty && "italic text-muted-foreground/50",
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function SettingsPageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 pb-12 dark:bg-background">
      <div className="mx-auto w-full max-w-xl px-4 sm:px-6">
        <div className="flex flex-col gap-5">
          <Card className="overflow-hidden border-0 shadow-sm mt-4 sm:mt-10 rounded-xl">
            <div className="h-28 animate-pulse bg-muted sm:h-32" />

            <div className="relative px-5 pb-6 sm:px-6">
              <div className="-mt-12 flex flex-col items-center gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:gap-5">
                <Skeleton className="size-22 shrink-0 rounded-full ring-[3px] ring-card shadow-md sm:size-24" />
                <div className="flex flex-1 flex-col items-center gap-2 sm:items-start sm:pb-0.5">
                  <Skeleton className="h-7 w-44" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-1.5 sm:justify-start">
                <Skeleton className="h-6 w-36 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <Separator className="mt-5" />

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {Array.from({length: 4}).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-2.5"
                  >
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-3 w-14" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <Skeleton className="size-7 rounded-md" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-8 w-16 rounded-md" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col gap-1">
                {Array.from({length: 3}).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 px-2 py-2.5">
                    <Skeleton className="size-8 shrink-0 rounded-md" />
                    <div className="flex flex-1 items-center justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {Array.from({length: 4}).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-2 py-2.5"
                    >
                      <Skeleton className="size-8 shrink-0 rounded-md" />
                      <div className="flex flex-1 items-center justify-between">
                        <Skeleton className="h-4 w-14" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
                <div className="flex items-center gap-3 px-2 py-2.5">
                  <Skeleton className="size-8 shrink-0 rounded-md" />
                  <div className="flex flex-1 items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-xl">
            <CardContent className="py-0">
              <div className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-lg" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
                <Skeleton className="size-4" />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-lg" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
