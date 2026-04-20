"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  createTemplateSchema,
  CreateTemplateInput,
} from "@/lib/validations/template";
import {createTemplateAction} from "@/app/actions/template";
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

export function CreateTemplateForm() {
  const router = useRouter();

  const {execute, executeAsync, isPending} = useAction(createTemplateAction, {
    onSuccess: (data) => {
      toast.success("Template created successfully");
      router.push(`/templates/${data.data?.data?.id || ""}`);
    },
    onError: (e) => {
      toast.error(e.error.serverError || "Something went wrong");
    },
  });

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
      teacher1Name: "",
      teacher1Designation: "",
      teacher2Name: "",
      teacher2Designation: "",
    },
  });

  async function onSubmit(data: CreateTemplateInput) {
    console.log("Submitting data to server action:", data);
    const result = await executeAsync(data);
    console.log("Server action result:", result);
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
            {isPending ? "Creating..." : "Create Template"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
