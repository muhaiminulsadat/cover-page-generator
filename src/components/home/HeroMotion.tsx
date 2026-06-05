"use client";

import {motion, useReducedMotion} from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface HeroMotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeUp({children, delay = 0, className}: HeroMotionProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : {opacity: 0, y: 28}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.7, delay, ease}}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({children, delay = 0, className}: HeroMotionProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : {opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.6, delay, ease}}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
}: HeroMotionProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : {opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.25}}
      transition={{duration: 0.65, delay, ease}}
    >
      {children}
    </motion.div>
  );
}

export function ScaleReveal({children, delay = 0, className}: HeroMotionProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : {opacity: 0, scale: 0.96}}
      whileInView={{opacity: 1, scale: 1}}
      viewport={{once: true, amount: 0.2}}
      transition={{duration: 0.7, delay, ease}}
    >
      {children}
    </motion.div>
  );
}

export function FloatingCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? {} : {y: [0, -8, 0]}}
      transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
    >
      {children}
    </motion.div>
  );
}
