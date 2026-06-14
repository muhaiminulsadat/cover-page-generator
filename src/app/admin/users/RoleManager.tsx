"use client";

import {useAction} from "next-safe-action/hooks";
import {updateUserRoleAction} from "@/app/actions/admin.action";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {ChevronDown, Loader2} from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  userId: string;
  currentRole: string;
  isSelf: boolean;
  isSuperadmin: boolean;
}

export function RoleManager({userId, currentRole, isSelf, isSuperadmin}: Props) {
  const {execute, isExecuting} = useAction(updateUserRoleAction, {
    onSuccess: () => {
      toast.success("Role updated successfully");
    },
    onError: ({error}) => {
      toast.error(error.serverError || "Failed to update role");
    }
  });

  if (isSelf || currentRole === "superadmin") {
    return (
      <Button variant="outline" size="sm" disabled>
        {currentRole} {isSelf && <span className="ml-2 text-xs">(You)</span>}
      </Button>
    );
  }

  const roles = isSuperadmin 
    ? (["student", "moderator", "admin", "superadmin"] as const)
    : (["student", "moderator"] as const);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExecuting}>
          {isExecuting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <span className="capitalize">{currentRole}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {roles.map((role) => (
          <DropdownMenuItem
            key={role}
            disabled={role === currentRole}
            onClick={() => execute({targetUserId: userId, newRole: role})}
            className="capitalize"
          >
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
