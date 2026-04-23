"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAction} from "next-safe-action/hooks";
import toast from "react-hot-toast";
import {ChevronDown, GraduationCap} from "lucide-react";
import {updateProfileSettings} from "@/app/actions/user";
import {userSettingsSchema, UserSettingsInput} from "@/lib/validations/user";
import {UNIVERSITY_OPTIONS} from "@/lib/constants/universities";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProfileSettingsFormProps {
  initialValues: UserSettingsInput;
}

export function ProfileSettingsForm({initialValues}: ProfileSettingsFormProps) {
  const {executeAsync, isPending} = useAction(updateProfileSettings);

  const form = useForm<UserSettingsInput>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(data: UserSettingsInput) {
    const result = await executeAsync(data);

    if (result?.data?.success) {
      toast.success("Profile updated");
      return;
    }

    if (result?.serverError) {
      toast.error(result.serverError);
      return;
    }

    if (result?.validationErrors) {
      toast.error("Please check your profile details");
      return;
    }

    toast.error("Could not update profile");
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Keep your details up to date so templates and PDFs are generated
          correctly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="relative">
                <GraduationCap className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <select
                  id="university"
                  {...form.register("university")}
                  className="h-10 w-full appearance-none rounded-md border border-input bg-muted/20 pl-9 pr-10 text-sm text-foreground shadow-xs transition-[color,box-shadow,background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
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
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              {form.formState.errors.university && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.university.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subsection">Subsection</Label>
              <Input id="subsection" {...form.register("subsection")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupNo">Group No</Label>
              <Input id="groupNo" {...form.register("groupNo")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hscBatch">HSC Batch</Label>
              <Input id="hscBatch" {...form.register("hscBatch")} />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
