"use client";

import {useCallback, useRef} from "react";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {AnimatePresence, motion} from "framer-motion";
import {flushSync} from "react-dom";
import {Button} from "@/components/ui/button";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({className}: ThemeToggleProps) {
  const {resolvedTheme, setTheme} = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isDark = resolvedTheme === "dark";

  const handleThemeToggle = useCallback(() => {
    const button = buttonRef.current;
    const nextTheme = isDark ? "light" : "dark";
    const applyTheme = () => setTheme(nextTheme);

    if (!button) {
      applyTheme();
      return;
    }

    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>;
      };
    };

    if (typeof documentWithTransition.startViewTransition !== "function") {
      applyTheme();
      return;
    }

    const {top, left, width, height} = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = documentWithTransition.startViewTransition(() => {
      flushSync(applyTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 450,
          easing: "ease-in-out",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }, [isDark, setTheme]);

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      className={className}
      onClick={handleThemeToggle}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{opacity: 0, scale: 0.6, rotate: -45}}
              animate={{opacity: 1, scale: 1, rotate: 0}}
              exit={{opacity: 0, scale: 0.6, rotate: 45}}
              transition={{duration: 0.22, ease: "easeOut"}}
              className="absolute"
            >
              <Sun className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{opacity: 0, scale: 0.6, rotate: 45}}
              animate={{opacity: 1, scale: 1, rotate: 0}}
              exit={{opacity: 0, scale: 0.6, rotate: -45}}
              transition={{duration: 0.22, ease: "easeOut"}}
              className="absolute"
            >
              <Moon className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Button>
  );
}
