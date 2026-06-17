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
      <Button variant="outline" size="sm" disabled className="capitalize h-8.5 rounded-lg border-border/60 bg-muted/30">
        {currentRole} {isSelf && <span className="ml-1.5 text-[10px] text-muted-foreground font-normal">(You)</span>}
      </Button>
    );
  }

  const roles = isSuperadmin 
    ? (["student", "moderator", "admin", "superadmin"] as const)
    : (["student", "moderator"] as const);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={isExecuting}
          className="capitalize h-8.5 rounded-lg transition-all duration-150 ease-out active:scale-[0.97] border-border/60 cursor-pointer hover:bg-muted/60"
        >
          {isExecuting ? (
            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
          ) : (
            <span className="capitalize">{currentRole}</span>
          )}
          <ChevronDown className="ml-1.5 h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {roles.map((role) => (
          <DropdownMenuItem
            key={role}
            disabled={role === currentRole}
            onClick={() => execute({targetUserId: userId, newRole: role})}
            className="capitalize cursor-pointer"
          >
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

