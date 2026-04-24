import Link from "next/link";
import {ArrowRight, Layers} from "lucide-react";
import {templates} from "@/db/schema";
import {TemplateCard} from "@/components/ui-custom/TemplateCard";
import {Button} from "@/components/ui/button";

interface DashboardContentProps {
  templatesList: Array<typeof templates.$inferSelect>;
  departmentLabel: string;
}

export function DashboardContent({
  templatesList,
  departmentLabel,
}: DashboardContentProps) {
  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-end mb-8 border-b pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Available Templates
          </h1>
          <p className="mt-2 text-muted-foreground">
            Showing top sheet templates for {departmentLabel}.
          </p>
        </div>
        <Button asChild>
          <Link href="/templates/new">
            Create Template <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      {templatesList.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/50">
          <Layers className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">
            No templates found for your department
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto mt-2">
            Be the first to create a template for your class. Your classmates
            will be able to reuse it instantly.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link href="/templates/new">Create First Template</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templatesList.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </main>
  );
}
