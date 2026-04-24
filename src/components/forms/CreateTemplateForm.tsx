"use client";

import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  createTemplateSchema,
  CreateTemplateInput,
} from "@/lib/validations/template";
import {createTemplateAction} from "@/app/actions/template";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {useAction} from "next-safe-action/hooks";
import {Building2, ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
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

export function CreateTemplateForm() {
  const router = useRouter();

  const {executeAsync, isPending} = useAction(createTemplateAction);

  const form = useForm<CreateTemplateInput>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues: {
      courseNumber: "",
      courseTitle: "",
      sessionTerm: "",
      departmentTarget: "",
      levelTarget: "",
      termTarget: "",
      sectionTarget: "",
      subsectionTarget: "",
      hscBatchTarget: "",
      teacher1Name: "",
      teacher1Designation: "",
      teacher2Name: "",
      teacher2Designation: "",
    },
  });

  const selectedSectionTarget = useWatch({
    control: form.control,
    name: "sectionTarget",
  });
  const subsectionTargetOptions = getSubsectionOptions(selectedSectionTarget);

  async function onSubmit(data: CreateTemplateInput) {
    console.log("Submitting data to server action:", data);
    const result = await executeAsync(data);
    console.log("Server action result:", result);
    if (result?.data?.success) {
      toast.success("Template created successfully");
      router.push(`/templates/${result.data.data.id}`);
    } else if (result?.serverError) {
      toast.error(result.serverError);
    } else if (result?.validationErrors) {
      toast.error("Please check the form for errors.");
    } else {
      toast.error("Something went wrong");
    }
  }

  // To debug validation errors
  console.log("Current Form Errors:", form.formState.errors);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Cover Page Template</CardTitle>
        <CardDescription>
          Design a new lab cover page template for your course.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Course Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseNumber">
                  Course Number (e.g. CE 332)
                </Label>
                <Input id="courseNumber" {...form.register("courseNumber")} />
                {form.formState.errors.courseNumber && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.courseNumber.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseTitle">Course Title</Label>
                <Input id="courseTitle" {...form.register("courseTitle")} />
                {form.formState.errors.courseTitle && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.courseTitle.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTerm">
                Session/Term (e.g. January 2025)
              </Label>
              <Input id="sessionTerm" {...form.register("sessionTerm")} />
              {form.formState.errors.sessionTerm && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.sessionTerm.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">
              Target Audience (Optional metadata for discoverability)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departmentTarget">Department</Label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <select
                    id="departmentTarget"
                    {...form.register("departmentTarget")}
                    className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-9 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                  >
                    <option className="bg-background text-foreground" value="">
                      All departments
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
                {form.formState.errors.departmentTarget && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.departmentTarget.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="levelTarget">Level</Label>
                <div className="relative">
                  <select
                    id="levelTarget"
                    {...form.register("levelTarget")}
                    className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                  >
                    <option className="bg-background text-foreground" value="">
                      All levels
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="termTarget">Term</Label>
                <div className="relative">
                  <select
                    id="termTarget"
                    {...form.register("termTarget")}
                    className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                  >
                    <option className="bg-background text-foreground" value="">
                      All terms
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="sectionTarget">Section</Label>
                <div className="relative">
                  <select
                    id="sectionTarget"
                    {...form.register("sectionTarget")}
                    className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                  >
                    <option className="bg-background text-foreground" value="">
                      All sections
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
                {form.formState.errors.sectionTarget && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.sectionTarget.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subsectionTarget">Subsection</Label>
                <div className="relative">
                  <select
                    id="subsectionTarget"
                    {...form.register("subsectionTarget")}
                    disabled={!selectedSectionTarget}
                    className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60 dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                  >
                    <option className="bg-background text-foreground" value="">
                      {selectedSectionTarget
                        ? "All subsections"
                        : "Select section first"}
                    </option>
                    {subsectionTargetOptions.map((option) => (
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
                {form.formState.errors.subsectionTarget && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.subsectionTarget.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="hscBatchTarget">HSC Batch</Label>
                <div className="relative">
                  <select
                    id="hscBatchTarget"
                    {...form.register("hscBatchTarget")}
                    className="h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:scheme-dark dark:[&>option]:bg-card dark:[&>option]:text-foreground"
                  >
                    <option className="bg-background text-foreground" value="">
                      All HSC batches
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
                {form.formState.errors.hscBatchTarget && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.hscBatchTarget.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Course Teachers</h3>
            <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
              <div className="space-y-2">
                <Label htmlFor="teacher1Name">Teacher 1 Name</Label>
                <Input id="teacher1Name" {...form.register("teacher1Name")} />
                {form.formState.errors.teacher1Name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.teacher1Name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher1Designation">
                  Teacher 1 Designation
                </Label>
                <Input
                  id="teacher1Designation"
                  {...form.register("teacher1Designation")}
                />
                {form.formState.errors.teacher1Designation && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.teacher1Designation.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
              <div className="space-y-2">
                <Label htmlFor="teacher2Name">Teacher 2 Name (Optional)</Label>
                <Input id="teacher2Name" {...form.register("teacher2Name")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher2Designation">
                  Teacher 2 Designation (Optional)
                </Label>
                <Input
                  id="teacher2Designation"
                  {...form.register("teacher2Designation")}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating..." : "Create Template"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
