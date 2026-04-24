"use client";

import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {userProfileSchema, UserProfileInput} from "@/lib/validations/user";
import {updateProfile} from "@/app/actions/user";
import {useRouter} from "next/navigation";
import {Building2, ChevronDown} from "lucide-react";
import {useAction} from "next-safe-action/hooks";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {UNIVERSITY_OPTIONS} from "@/lib/constants/universities";
import {DEPARTMENT_OPTIONS} from "@/lib/constants/departments";
import {HSC_BATCH_OPTIONS} from "@/lib/constants/hsc-batches";
import {
  getSubsectionOptions,
  LEVEL_OPTIONS,
  SECTION_OPTIONS,
  TERM_OPTIONS,
} from "@/lib/constants/levels";
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

  const selectedSection = useWatch({
    control: form.control,
    name: "section",
  });
  const subsectionOptions = getSubsectionOptions(selectedSection);

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
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <select
                  id="department"
                  {...form.register("department")}
                  className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-9 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                >
                  <option className="bg-background text-foreground" value="">
                    Select department
                  </option>
                  {DEPARTMENT_OPTIONS.map((option) => (
                    <option
                      className="bg-background text-foreground"
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {form.formState.errors.department && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.department.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <div className="relative">
                <select
                  id="section"
                  {...form.register("section")}
                  className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                >
                  <option className="bg-background text-foreground" value="">
                    Select section
                  </option>
                  {SECTION_OPTIONS.map((option) => (
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
              <div className="relative">
                <select
                  id="level"
                  {...form.register("level")}
                  className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                >
                  <option className="bg-background text-foreground" value="">
                    Select level
                  </option>
                  {LEVEL_OPTIONS.map((option) => (
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
              {form.formState.errors.level && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.level.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <div className="relative">
                <select
                  id="term"
                  {...form.register("term")}
                  className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                >
                  <option className="bg-background text-foreground" value="">
                    Select term
                  </option>
                  {TERM_OPTIONS.map((option) => (
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
              {form.formState.errors.term && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.term.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subsection">Subsection</Label>
              <div className="relative">
                <select
                  id="subsection"
                  {...form.register("subsection")}
                  disabled={!selectedSection}
                  className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60 dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                >
                  <option className="bg-background text-foreground" value="">
                    {selectedSection
                      ? "Select subsection"
                      : "Select section first"}
                  </option>
                  {subsectionOptions.map((option) => (
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
              {form.formState.errors.subsection && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.subsection.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupNo">Group No (Optional)</Label>
              <Input id="groupNo" {...form.register("groupNo")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hscBatch">HSC Batch</Label>
            <div className="relative">
              <select
                id="hscBatch"
                {...form.register("hscBatch")}
                className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
              >
                <option className="bg-background text-foreground" value="">
                  Select HSC batch
                </option>
                {HSC_BATCH_OPTIONS.map((option) => (
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
            {form.formState.errors.hscBatch && (
              <p className="text-sm text-destructive">
                {form.formState.errors.hscBatch.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
