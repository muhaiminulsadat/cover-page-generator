"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Lock, LogOut, ShieldCheck, KeyRound, Loader2} from "lucide-react";
import {authClient} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {ChangePasswordForm} from "@/components/forms/ChangePasswordForm";

export function SettingsActions() {
  const router = useRouter();
  const [logoutPending, setLogoutPending] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      setLogoutPending(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully.");
            router.push("/login");
            router.refresh();
          },
          onError: () => {
            toast.error("Failed to sign out. Please try again.");
          },
        },
      });
    } catch {
      toast.error("An error occurred during sign out.");
    } finally {
      setLogoutPending(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-3.5 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <ShieldCheck className="size-4 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium">Privacy</p>
            <p className="text-xs text-muted-foreground truncate">
              Your data is encrypted and secure
            </p>
          </div>
        </div>
        <Lock className="size-4 text-muted-foreground/50 shrink-0" />
      </div>

      <Separator />

      <div className="flex items-center justify-between py-3.5 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <KeyRound className="size-4 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium">Password</p>
            <p className="text-xs text-muted-foreground truncate">
              Change or update your password
            </p>
          </div>
        </div>
        <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="h-8 text-xs cursor-pointer shrink-0">
              Change password
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] rounded-xl p-4 sm:max-w-md sm:rounded-xl sm:p-6">
            <ChangePasswordForm onSuccess={() => setChangePasswordOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      <div className="flex items-center justify-between py-3.5 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
            <LogOut className="size-4 text-destructive" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium">Sign out</p>
            <p className="text-xs text-muted-foreground truncate">
              End your current session
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer shrink-0"
          onClick={handleSignOut}
          disabled={logoutPending}
        >
          {logoutPending ? (
            <Loader2 className="animate-spin size-3 mr-1" />
          ) : null}
          Log out
        </Button>
      </div>
    </>
  );
}
