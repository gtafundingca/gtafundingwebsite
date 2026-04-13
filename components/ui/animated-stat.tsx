"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type AnimatedStatProps = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  comma?: boolean;
  className?: string;
};

export function AnimatedStat({
  end,
  duration = 1.85,
  prefix = "",
  suffix = "",
  comma = false,
  className,
}: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, end, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [isInView, end, duration]);

  const n = Math.round(value);
  const text = comma ? n.toLocaleString("en-CA") : String(n);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
