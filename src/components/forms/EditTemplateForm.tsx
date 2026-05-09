"use client";

import {useForm, useWatch, useFieldArray} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  editTemplateSchema,
  EditTemplateInput,
} from "@/lib/validations/template";
import {deleteTemplateAction, editTemplateAction} from "@/app/actions/template";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {useAction} from "next-safe-action/hooks";
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
import {Building2, ChevronDown, Loader2, Plus, Trash2} from "lucide-react";
import {
  COVER_PAGE_DESIGNS,
  DEFAULT_COVER_PAGE_DESIGN,
} from "@/lib/constants/cover-designs";
import {
  DEFAULT_TOP_SHEET_DESIGN,
  TOP_SHEET_DESIGNS,
} from "@/lib/constants/top-sheet-designs";
import {DesignPickerDialog} from "./_components/DesignPickerDialog";
import {PageSelection} from "./_components/PageSelection";

export function EditTemplateForm({template}: {template: EditTemplateInput}) {
  const router = useRouter();

  const {executeAsync: executeEdit, isPending: isEditing} = useAction(editTemplateAction);
  const {executeAsync: executeDelete, isPending: isDeleting} = useAction(deleteTemplateAction);

  const isPending = isEditing || isDeleting;

  const form = useForm<EditTemplateInput>({
    resolver: zodResolver(editTemplateSchema),
    defaultValues: {
      id: template.id,
      designId: template.designId || DEFAULT_TOP_SHEET_DESIGN,
      coverDesignId: template.coverDesignId || DEFAULT_COVER_PAGE_DESIGN,
      courseNumber: template.courseNumber || "",
      courseTitle: template.courseTitle || "",
      sessionTerm: template.sessionTerm || "",
      departmentTarget: template.departmentTarget || "",
      levelTarget: template.levelTarget || "",
      termTarget: template.termTarget || "",
      sectionTarget: template.sectionTarget || "",
      subsectionTarget: template.subsectionTarget || "",
      hscBatchTarget: template.hscBatchTarget || "",
      teacher1Name: template.teacher1Name || "",
      teacher1Designation: template.teacher1Designation || "",
      teacher2Name: template.teacher2Name || "",
      teacher2Designation: template.teacher2Designation || "",
      includeTopPage: template.includeTopPage ?? true,
      includeCoverPage: template.includeCoverPage ?? true,
      includeIndexPage: template.includeIndexPage ?? true,
      experimentNames: template.experimentNames || [],
    },
  });

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "experimentNames" as any,
  });

  const selectedSectionTarget = useWatch({
    control: form.control,
    name: "sectionTarget",
  });
  const designId = useWatch({
    control: form.control,
    name: "designId",
  });
  const coverDesignId = useWatch({
    control: form.control,
    name: "coverDesignId",
  });
  const subsectionTargetOptions = getSubsectionOptions(selectedSectionTarget);

  async function onSubmit(data: EditTemplateInput) {
    const result = await executeEdit(data);
    if (result?.data?.success) {
      toast.success("Template updated successfully");
      router.push(`/templates/${result.data.data.id}`);
    } else if (result?.serverError) {
      toast.error(result.serverError);
    } else if (result?.validationErrors) {
      toast.error("Please check the form for errors.");
    } else {
      toast.error("Something went wrong");
    }
  }

  async function onDelete() {
    if (
      !window.confirm(
        "Are you sure you want to delete this template? This action cannot be undone.",
      )
    ) {
      return;
    }

    const result = await executeDelete({id: template.id});
    if (result?.data?.success) {
      toast.success("Template deleted successfully");
      router.push("/");
      router.refresh();
    } else if (result?.serverError) {
      toast.error(result.serverError);
    } else {
      toast.error("Failed to delete template");
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Top Sheet Template</CardTitle>
        <CardDescription>Update your template settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="designId">Top Sheet Design</Label>
            <DesignPickerDialog
              value={designId}
              designs={TOP_SHEET_DESIGNS}
              defaultDesign={DEFAULT_TOP_SHEET_DESIGN}
              pickerTitle="Choose Top Sheet Design"
              pickerDescription="Pick one top sheet style for this template."
              onValueChange={(value) => form.setValue("designId", value)}
              error={form.formState.errors.designId?.message}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverDesignId">Cover Page Design</Label>
            <DesignPickerDialog
              value={coverDesignId}
              designs={COVER_PAGE_DESIGNS}
              defaultDesign={DEFAULT_COVER_PAGE_DESIGN}
              pickerTitle="Choose Cover Page Design"
              pickerDescription="Pick one cover page style for this template."
              onValueChange={(value) => form.setValue("coverDesignId", value)}
              error={form.formState.errors.coverDesignId?.message}
              disabled={isPending}
            />
          </div>

          <PageSelection control={form.control} disabled={isPending} />
          {form.formState.errors.includeTopPage && (
            <p className="text-sm text-destructive font-medium">
              {form.formState.errors.includeTopPage.message}
            </p>
          )}

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
 
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">Experiments (Index Page)</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append("")}
                className="gap-2"
                disabled={isPending}
              >
                <Plus className="size-4" />
                Add Experiment
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Add experiment names to pre-fill the index page. Leave empty for
              manual handwriting (12 rows provided by default).
            </p>
 
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex-none flex items-center justify-center size-8 rounded-full bg-muted text-xs font-medium">
                    {index + 1}
                  </div>
                  <Input
                    {...form.register(`experimentNames.${index}` as const)}
                    placeholder={`Experiment ${index + 1} name...`}
                    disabled={isPending}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    disabled={isPending}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
              {fields.length === 0 && (
                <div className="text-center p-8 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                  No experiments added yet.
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isEditing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Template"
              )}
            </Button>
            
            <div className="pt-4 border-t mt-4">
              <Button 
                type="button" 
                variant="destructive" 
                className="w-full" 
                onClick={onDelete}
                disabled={isPending}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Template
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                This action is permanent and cannot be reversed.
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
