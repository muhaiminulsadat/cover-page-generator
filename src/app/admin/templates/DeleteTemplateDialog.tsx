"use client";

import {useState} from "react";
import {useAction} from "next-safe-action/hooks";
import {deleteTemplateAction} from "@/app/actions/template";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Loader2, Trash2} from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  templateId: string;
  courseNumber: string;
}

export function DeleteTemplateDialog({templateId, courseNumber}: Props) {
  const [open, setOpen] = useState(false);
  
  const {execute, isExecuting} = useAction(deleteTemplateAction, {
    onSuccess: () => {
      toast.success("Template deleted successfully");
      setOpen(false);
    },
    onError: ({error}) => {
      toast.error(error.serverError || "Failed to delete template");
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="sm"
          className="h-8.5 w-8.5 p-0 rounded-lg transition-all duration-150 active:scale-[0.97] cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl border border-border/50 bg-popover/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading font-semibold text-foreground">
            Delete Template
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1.5">
            Are you sure you want to delete the template for{" "}
            <strong className="text-foreground">{courseNumber}</strong>? This action cannot be undone and will
            remove it for all users in the target department.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)} 
            disabled={isExecuting}
            className="h-9.5 rounded-lg border-border/60 transition-all duration-150 active:scale-[0.97] cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => execute({id: templateId})}
            disabled={isExecuting}
            className="h-9.5 rounded-lg transition-all duration-150 active:scale-[0.97] cursor-pointer"
          >
            {isExecuting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
            Delete Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

