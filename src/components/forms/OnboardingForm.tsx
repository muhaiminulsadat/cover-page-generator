"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {userProfileSchema, UserProfileInput} from "@/lib/validations/user";
import {updateProfile} from "@/app/actions/user";
import {useRouter} from "next/navigation";
import {useAction} from "next-safe-action/hooks";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {UNIVERSITY_OPTIONS} from "@/lib/constants/universities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function OnboardingForm() {
  const router = useRouter();

  const {executeAsync, isPending} = useAction(updateProfile);

  const form = useForm<UserProfileInput>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      studentId: "",
      university: "",
      department: "",
      section: "",
      subsection: "",
      groupNo: "",
      level: "",
      term: "",
      hscBatch: "",
    },
  });

  async function onSubmit(data: UserProfileInput) {
    const result = await executeAsync(data);
    if (result?.data?.success) {
      router.push("/");
      return;
    }

    console.error(
      result?.serverError ||
        result?.validationErrors ||
        "Failed to save profile",
    );
  }

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          We need some academic details before you can generate cover pages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input id="studentId" {...form.register("studentId")} />
            {form.formState.errors.studentId && (
              <p className="text-sm text-destructive">
                {form.formState.errors.studentId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <select
              id="university"
              {...form.register("university")}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
            >
              <option className="bg-background text-foreground" value="">
                Select your university
              </option>
              {UNIVERSITY_OPTIONS.map((option) => (
                <option
                  className="bg-background text-foreground"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {form.formState.errors.university && (
              <p className="text-sm text-destructive">
                {form.formState.errors.university.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" {...form.register("department")} />
              {form.formState.errors.department && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.department.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input id="section" {...form.register("section")} />
              {form.formState.errors.section && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.section.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Input id="level" {...form.register("level")} />
              {form.formState.errors.level && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.level.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <Input id="term" {...form.register("term")} />
              {form.formState.errors.term && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.term.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subsection">Subsection (Optional)</Label>
              <Input id="subsection" {...form.register("subsection")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupNo">Group No (Optional)</Label>
              <Input id="groupNo" {...form.register("groupNo")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hscBatch">HSC Batch (Optional)</Label>
            <Input id="hscBatch" {...form.register("hscBatch")} />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
