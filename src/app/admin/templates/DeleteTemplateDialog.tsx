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
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Template</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the template for{" "}
            <strong>{courseNumber}</strong>? This action cannot be undone and will
            remove it for all users in the target department.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isExecuting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => execute({id: templateId})}
            disabled={isExecuting}
          >
            {isExecuting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
