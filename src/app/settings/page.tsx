import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {Suspense} from "react";
import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Group,
  Hash,
  Layers,
  Lock,
  LogOut,
  Pencil,
  School,
  Users,
} from "lucide-react";
import {auth} from "@/lib/auth";
import {ProfileSettingsForm} from "@/components/forms/ProfileSettingsForm";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {UNIVERSITY_LABELS} from "@/lib/constants/universities";
import {normalizeDepartmentCode} from "@/lib/constants/departments";
import {
  normalizeSectionCode,
  normalizeSubsectionCode,
} from "@/lib/constants/levels";
import {Skeleton} from "@/components/ui/skeleton";
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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex justify-center pb-8 p-4 bg-background">
      <main className="flex flex-col gap-6 w-full max-w-xl">
        <div className="relative">
          <div className="bg-linear-to-br from-primary to-primary/60 w-full h-32 rounded-xl mt-4" />
          <div className="flex -mt-14 px-4 flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="size-28 ring-4 ring-background shadow-md">
                <AvatarImage
                  src={session.user.image ?? ""}
                  alt={session.user.name ?? "User"}
                />
                <AvatarFallback className="text-2xl font-medium">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-2xl tracking-tight">
                  {currentUser.name}
                </h1>
                <BadgeCheck className="size-5 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">
                {currentUser.email}
              </p>
              <div className="inline-flex bg-primary/10 text-primary rounded-full mt-2 px-3 py-1 items-center gap-1.5 text-center max-w-70 sm:max-w-xs">
                <School className="size-3.5 shrink-0" />
                <span className="font-medium text-xs truncate">
                  {universityLabel !== "Not selected" && universityLabel
                    ? universityLabel
                    : "University not set"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <Card className="rounded-xl p-4 flex flex-col items-center gap-2">
              <div className="size-9 bg-primary/10 rounded-lg flex justify-center items-center">
                <Layers className="size-4 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                {currentUser.level || "-"}
              </span>
              <span className="text-center text-muted-foreground text-xs">
                Level
              </span>
            </Card>

            <Card className="rounded-xl p-4 flex flex-col items-center gap-2">
              <div className="size-9 bg-primary/10 rounded-lg flex justify-center items-center">
                <CalendarDays className="size-4 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                {currentUser.term || "-"}
              </span>
              <span className="text-center text-muted-foreground text-xs">
                Term
              </span>
            </Card>

            <Card className="rounded-xl p-4 flex flex-col items-center gap-2">
              <div className="size-9 bg-primary/10 rounded-lg flex justify-center items-center">
                <Users className="size-4 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                {normalizeSectionCode(currentUser.section) || "-"}
              </span>
              <span className="text-center text-muted-foreground text-xs">
                Section
              </span>
            </Card>
          </div>

          <Card className="rounded-xl p-6 gap-4 flex flex-col">
            <CardHeader className="p-0 flex flex-row justify-between items-center space-y-0">
              <CardTitle className="font-semibold text-base">
                Academic Details
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="text-primary hover:text-primary hover:bg-primary/10 h-8 px-2"
                    size="sm"
                    variant="ghost"
                  >
                    <Pencil className="size-3.5 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[425px] sm:max-w-2xl sm:rounded-xl">
                  {/* Remove Card wrapper padding applied by ProfileSettingsForm since Dialog handles layout */}
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

            <CardContent className="flex p-0 flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="size-9 shrink-0 rounded-lg bg-secondary/50 flex justify-center items-center">
                  <School className="size-4 text-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">
                    University
                  </span>
                  <span className="font-medium text-sm">{universityLabel}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-9 shrink-0 rounded-lg bg-secondary/50 flex justify-center items-center">
                  <BookOpen className="size-4 text-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">
                    Department
                  </span>
                  <span className="font-medium text-sm">
                    {normalizeDepartmentCode(currentUser.department) ||
                      "Not set"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-9 shrink-0 rounded-lg bg-secondary/50 flex justify-center items-center">
                  <Hash className="size-4 text-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">
                    Student ID
                  </span>
                  <span className="font-medium text-sm">
                    {currentUser.studentId || "Not set"}
                  </span>
                </div>
              </div>

              <div className="bg-border h-px w-full" />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 shrink-0 rounded-lg bg-secondary/50 flex justify-center items-center">
                    <Layers className="size-4 text-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Level</span>
                    <span className="font-medium text-sm">
                      {currentUser.level || "Not set"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-9 shrink-0 rounded-lg bg-secondary/50 flex justify-center items-center">
                    <CalendarDays className="size-4 text-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Term</span>
                    <span className="font-medium text-sm">
                      {currentUser.term || "Not set"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 shrink-0 rounded-lg bg-secondary/50 flex justify-center items-center">
                    <Users className="size-4 text-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">
                      Section
                    </span>
                    <span className="font-medium text-sm">
                      {normalizeSectionCode(currentUser.section) || "Not set"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-9 shrink-0 rounded-lg bg-secondary/50 flex justify-center items-center">
                    <Group className="size-4 text-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">
                      Subsection
                    </span>
                    <span className="font-medium text-sm">
                      {normalizeSubsectionCode(currentUser.subsection) ||
                        "Not set"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-9 shrink-0 rounded-lg bg-secondary/50 flex justify-center items-center">
                  <Award className="size-4 text-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">
                    HSC Batch
                  </span>
                  <span className="font-medium text-sm">
                    {currentUser.hscBatch || "Not set"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <form
            action={async () => {
              "use server";
              // we don't have access to auth client directly inside RSC, handled with button inside client componnet ideally
            }}
          >
            <Button
              className="mt-2 text-destructive border-destructive/30 hover:bg-destructive/10 w-full"
              variant="outline"
            >
              <LogOut className="size-4 mr-2" />
              Log out
            </Button>
          </form>

          <div className="flex justify-center items-center gap-2 mt-2">
            <Lock className="size-3.5 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">
              Your academic data stays private and secure.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsPageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex justify-center pb-8 p-4 bg-background">
      <main className="flex flex-col gap-6 w-full max-w-xl">
        <div className="relative">
          <div className="bg-muted w-full h-32 rounded-xl mt-4 animate-pulse" />
          <div className="flex -mt-14 px-4 flex-col items-center gap-4">
            <div className="relative">
              <Skeleton className="size-28 rounded-full ring-4 ring-background shadow-md" />
            </div>

            <div className="flex flex-col items-center gap-2 text-center w-full">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24 rounded-full mt-1" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <Card className="rounded-xl p-4 flex flex-col items-center gap-2">
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-3 w-10" />
            </Card>

            <Card className="rounded-xl p-4 flex flex-col items-center gap-2">
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-3 w-10" />
            </Card>

            <Card className="rounded-xl p-4 flex flex-col items-center gap-2">
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-3 w-10" />
            </Card>
          </div>

          <Card className="rounded-xl p-6 gap-4 flex flex-col">
            <CardHeader className="p-0 flex flex-row justify-between items-center space-y-0">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-16" />
            </CardHeader>

            <CardContent className="flex p-0 flex-col gap-4 mt-2">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg shrink-0" />
                <div className="flex flex-col gap-1 w-full">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg shrink-0" />
                <div className="flex flex-col gap-1 w-full">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg shrink-0" />
                <div className="flex flex-col gap-1 w-full">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>

              <div className="bg-border h-px w-full my-1" />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-lg shrink-0" />
                  <div className="flex flex-col gap-1 w-full">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-lg shrink-0" />
                  <div className="flex flex-col gap-1 w-full">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-lg shrink-0" />
                  <div className="flex flex-col gap-1 w-full">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-lg shrink-0" />
                  <div className="flex flex-col gap-1 w-full">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg shrink-0" />
                <div className="flex flex-col gap-1 w-full">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Skeleton className="h-10 w-full rounded-lg mt-2" />
        </div>
      </main>
    </div>
  );
}
