"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  editTemplateSchema,
  EditTemplateInput,
} from "@/lib/validations/template";
import {editTemplateAction} from "@/app/actions/template";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {useAction} from "next-safe-action/hooks";
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
import {Loader2} from "lucide-react";

export function EditTemplateForm({template}: {template: EditTemplateInput}) {
  const router = useRouter();

  const {executeAsync, isPending} = useAction(editTemplateAction);

  const form = useForm<EditTemplateInput>({
    resolver: zodResolver(editTemplateSchema),
    defaultValues: {
      id: template.id,
      courseNumber: template.courseNumber || "",
      courseTitle: template.courseTitle || "",
      sessionTerm: template.sessionTerm || "",
      departmentTarget: template.departmentTarget || "",
      levelTarget: template.levelTarget || "",
      termTarget: template.termTarget || "",
      sectionTarget: template.sectionTarget || "",
      subsectionTarget: template.subsectionTarget || "",
      teacher1Name: template.teacher1Name || "",
      teacher1Designation: template.teacher1Designation || "",
      teacher2Name: template.teacher2Name || "",
      teacher2Designation: template.teacher2Designation || "",
    },
  });

  async function onSubmit(data: EditTemplateInput) {
    const result = await executeAsync(data);
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Cover Page Template</CardTitle>
        <CardDescription>Update your template settings.</CardDescription>
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
                  <p className="text-sm text-red-500">
                    {form.formState.errors.courseNumber.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseTitle">Course Title</Label>
                <Input id="courseTitle" {...form.register("courseTitle")} />
                {form.formState.errors.courseTitle && (
                  <p className="text-sm text-red-500">
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
                <p className="text-sm text-red-500">
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
                <Input
                  id="departmentTarget"
                  {...form.register("departmentTarget")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="levelTarget">Level</Label>
                <Input id="levelTarget" {...form.register("levelTarget")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="termTarget">Term</Label>
                <Input id="termTarget" {...form.register("termTarget")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sectionTarget">Section</Label>
                <Input id="sectionTarget" {...form.register("sectionTarget")} />
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
                  <p className="text-sm text-red-500">
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
                  <p className="text-sm text-red-500">
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
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              "Save Template"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
