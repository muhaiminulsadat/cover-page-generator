"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Coffee,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  ScrollText,
  Bus,
} from "lucide-react";

interface FunnyTermsDialogProps {
  trigger: React.ReactNode;
}

export function FunnyTermsDialog({ trigger }: FunnyTermsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader className="gap-2">
          <div className="mx-auto rounded-full bg-primary/10 p-3 w-fit text-primary animate-bounce">
            <ScrollText className="size-6" />
          </div>
          <DialogTitle className="text-center text-lg font-bold">
            The Legally Binding* Terms of Bangladeshi Student Procrastination
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-muted-foreground">
            *WARNING: Read carefully. Do not blame us during your Lab Viva.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-3">
          <div className="flex gap-3 items-start border-b border-border/40 pb-3">
            <div className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 shrink-0">
              <Clock className="size-4.5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xs leading-none">
                1. The BdREN & Load-Shedding Pact
              </span>
              <span className="text-muted-foreground text-[11px] leading-relaxed">
                If your Wi-Fi dies or load-shedding hits 2 minutes before the portal locks, you agree not to panic. Keep your mobile data hot-spot active and pray the upload bar finishes.
              </span>
            </div>
          </div>

          <div className="flex gap-3 items-start border-b border-border/40 pb-3">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0">
              <Sparkles className="size-4.5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xs leading-none">
                2. The Canteen Tehari Mystery
              </span>
              <span className="text-muted-foreground text-[11px] leading-relaxed">
                We promise our cover pages are premium. However, finding actual meat in your campus canteen&apos;s 50-Taka Tehari is a mystery even our advanced layout algorithms cannot solve.
              </span>
            </div>
          </div>

          <div className="flex gap-3 items-start border-b border-border/40 pb-3">
            <div className="p-1.5 rounded-lg bg-destructive/10 text-destructive shrink-0">
              <AlertTriangle className="size-4.5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xs leading-none">
                3. The Designation Viva Roast
              </span>
              <span className="text-muted-foreground text-[11px] leading-relaxed">
                Calling a Lecturer &quot;Professor&quot; is fine, but calling a strict Professor &quot;Lecturer&quot; on the cover sheet is academic suicide. Check the rank, or prepare to stand during the entire Viva.
              </span>
            </div>
          </div>

          <div className="flex gap-3 items-start border-b border-border/40 pb-3">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
              <Bus className="size-4.5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xs leading-none">
                4. The Overcrowded Campus Bus Oath
              </span>
              <span className="text-muted-foreground text-[11px] leading-relaxed">
                You swear not to complain if you get squeezed like a lemon in the university bus next morning while desperately holding your freshly printed lab report to keep it clean.
              </span>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
              <GraduationCap className="size-4.5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xs leading-none">
                5. The Canteen Bill Tax (Voluntary)
              </span>
              <span className="text-muted-foreground text-[11px] leading-relaxed">
                If this cover page saves you from formatting doom and gets you a neat 9/10, you owe us a virtual treat—preferably a cup of Tong-er Cha, a plate of Khichuri, or a bKash request for Kacchi.
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button className="w-full font-bold bg-primary hover:bg-primary/90 text-xs py-2">
              I Agree to Survive Caffeinated
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
