"use client";

import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

export type FadeInProps = HTMLMotionProps<"div"> & {
  className?: string;
  delay?: number;
};

/** Animate on mount (e.g. hero). */
export function FadeIn({ className, delay = 0, children, ...rest }: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, delay, ease: easeOut }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export type ScrollRevealProps = HTMLMotionProps<"div"> & {
  className?: string;
  delay?: number;
  y?: number;
};

/** Fade + slide in when scrolled into view (once). */
export function ScrollReveal({
  className,
  delay = 0,
  y = 28,
  children,
  ...rest
}: ScrollRevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px 0px -60px 0px", amount: 0.15 }}
      transition={{ duration: 0.62, delay, ease: easeOut }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
