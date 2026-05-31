"use client";

import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAction} from "next-safe-action/hooks";
import toast from "react-hot-toast";
import {Building2, ChevronDown, GraduationCap} from "lucide-react";
import {updateProfileSettings} from "@/app/actions/user";
import {userSettingsSchema, UserSettingsInput} from "@/lib/validations/user";
import {UNIVERSITY_OPTIONS} from "@/lib/constants/universities";
import {DEPARTMENT_OPTIONS} from "@/lib/constants/departments";
import {HSC_BATCH_OPTIONS} from "@/lib/constants/hsc-batches";
import {
  getSubsectionOptions,
  LEVEL_OPTIONS,
  SECTION_OPTIONS,
  TERM_OPTIONS,
} from "@/lib/constants/levels";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {DialogDescription, DialogTitle} from "@/components/ui/dialog";

interface ProfileSettingsFormProps {
  initialValues: UserSettingsInput;
}

export function ProfileSettingsForm({initialValues}: ProfileSettingsFormProps) {
  const {executeAsync, isPending} = useAction(updateProfileSettings);

  const form = useForm<UserSettingsInput>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: initialValues,
  });

  const selectedSection = useWatch({
    control: form.control,
    name: "section",
  });
  const subsectionOptions = getSubsectionOptions(selectedSection);
  const selectClassName =
    "h-10 w-full appearance-none rounded-md border border-input bg-background pl-3 pr-10 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground";

  async function onSubmit(data: UserSettingsInput) {
    const result = await executeAsync(data);

    if (result?.data?.success) {
      toast.success("Profile updated");
      window.location.reload();
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
    <div className="w-full">
      <div className="space-y-1 pb-4">
        <DialogTitle className="text-xl sm:text-2xl">Edit Profile</DialogTitle>
        <DialogDescription>
          Keep your details up to date so templates and PDFs are generated
          correctly.
        </DialogDescription>
      </div>
      <div className="pb-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  className={`${selectClassName} pl-9`}
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
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <select
                  id="department"
                  {...form.register("department")}
                  className={`${selectClassName} pl-9`}
                >
                  <option className="bg-background text-foreground" value="">
                    Select your department
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
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
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
                  className={selectClassName}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <div className="relative">
                <select
                  id="level"
                  {...form.register("level")}
                  className={selectClassName}
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
                  className={selectClassName}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subsection">Subsection</Label>
              <div className="relative">
                <select
                  id="subsection"
                  {...form.register("subsection")}
                  disabled={!selectedSection}
                  className={`${selectClassName} disabled:cursor-not-allowed disabled:opacity-60`}
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
              <Label htmlFor="hscBatch">HSC Batch</Label>
              <div className="relative">
                <select
                  id="hscBatch"
                  {...form.register("hscBatch")}
                  className={selectClassName}
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
          </div>

          <div className="pt-2 sm:flex sm:justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto sm:min-w-40"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
