"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {userProfileSchema, UserProfileInput} from "@/lib/validations/user";
import {updateProfile} from "@/app/actions/user";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {useState} from "react";
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

export function OnboardingForm() {
  const router = useRouter();

  const {executeAsync, isPending} = useAction(updateProfile);

  const form = useForm<UserProfileInput>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      studentId: "",
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
      toast.success("Profile completed successfully");
      router.push("/");
    } else if (result?.serverError) {
      toast.error(result.serverError);
    } else if (result?.validationErrors) {
      toast.error("Please check the form for errors.");
    } else {
      toast.error("Something went wrong");
    }
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
              <p className="text-sm text-red-500">
                {form.formState.errors.studentId.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" {...form.register("department")} />
              {form.formState.errors.department && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.department.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input id="section" {...form.register("section")} />
              {form.formState.errors.section && (
                <p className="text-sm text-red-500">
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
                <p className="text-sm text-red-500">
                  {form.formState.errors.level.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <Input id="term" {...form.register("term")} />
              {form.formState.errors.term && (
                <p className="text-sm text-red-500">
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
