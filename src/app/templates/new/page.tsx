import {CreateTemplateForm} from "@/components/forms/CreateTemplateForm";

export default function NewTemplatePage() {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center p-4 bg-muted/20 py-10">
      <CreateTemplateForm />
    </div>
  );
}
