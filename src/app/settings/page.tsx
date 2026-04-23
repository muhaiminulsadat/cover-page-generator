import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {eq} from "drizzle-orm";
import {Suspense} from "react";
import {UserRound, ShieldCheck, GraduationCap, Settings} from "lucide-react";
import {auth} from "@/lib/auth";
import {db} from "@/db";
import {user as userSchema} from "@/db/schema";
import {ProfileSettingsForm} from "@/components/forms/ProfileSettingsForm";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {UNIVERSITY_LABELS} from "@/lib/constants/universities";
import {Skeleton} from "@/components/ui/skeleton";

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

  const [currentUser] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.id, session.user.id));

  if (!currentUser) {
    return redirect("/onboarding");
  }

  const universityLabel =
    currentUser.university && currentUser.university in UNIVERSITY_LABELS
      ? UNIVERSITY_LABELS[
          currentUser.university as keyof typeof UNIVERSITY_LABELS
        ]
      : "Not selected";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-background via-background to-muted/25">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 md:gap-8 items-start">
          <Card className="overflow-hidden">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar size="lg" className="size-14">
                  <AvatarImage
                    src={session.user.image ?? ""}
                    alt={session.user.name ?? "User"}
                  />
                  <AvatarFallback className="text-base font-medium">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 min-w-0">
                  <p className="text-lg font-semibold truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border bg-muted/35 px-3 py-2">
                  <p className="text-xs text-muted-foreground">Level</p>
                  <p className="text-sm font-medium">
                    {currentUser.level || "-"}
                  </p>
                </div>
                <div className="rounded-lg border bg-muted/35 px-3 py-2">
                  <p className="text-xs text-muted-foreground">Term</p>
                  <p className="text-sm font-medium">
                    {currentUser.term || "-"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Badge variant="secondary" className="gap-1.5 w-fit">
                  <ShieldCheck className="size-3.5" />
                  Account Settings
                </Badge>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="size-4" />
                    <span className="truncate">{universityLabel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <UserRound className="size-4" />
                    <span>ID: {currentUser.studentId || "Not set"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <ProfileSettingsForm
            initialValues={{
              name: currentUser.name,
              studentId: currentUser.studentId || "",
              university: currentUser.university || "",
              department: currentUser.department || "",
              section: currentUser.section || "",
              subsection: currentUser.subsection || "",
              groupNo: currentUser.groupNo || "",
              level: currentUser.level || "",
              term: currentUser.term || "",
              hscBatch: currentUser.hscBatch || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SettingsPageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-background via-background to-muted/25">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 md:gap-8 items-start">
          <Card className="overflow-hidden">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="size-14 rounded-full" />
                <div className="space-y-2 min-w-0 flex-1">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-full max-w-52" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border bg-muted/35 px-3 py-2 space-y-2">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <div className="rounded-lg border bg-muted/35 px-3 py-2 space-y-2">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-4 w-14" />
                </div>
              </div>

              <div className="space-y-3">
                <Badge variant="secondary" className="gap-1.5 w-fit">
                  <Settings className="size-3.5" />
                  Loading Settings
                </Badge>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="size-4" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <UserRound className="size-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent className="pt-6 space-y-5">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-full max-w-md" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full sm:w-36" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
