"use client";

import { useDialKit } from "dialkit";
import { motion, type Transition } from "motion/react";
import { useState, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { tabWidgetDialKitDefaults, tabWidgetSpring } from "@/lib/tab-widget-motion";

type TabWidgetCardProps = {
  dialKitName: string;
  hoverBorderColor?: string;
  children: ReactNode;
  className?: string;
};

export function TabWidgetCard({
  dialKitName,
  hoverBorderColor = "var(--color-fresh-grass)",
  children,
  className = "",
}: TabWidgetCardProps) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const p = useDialKit(dialKitName, tabWidgetDialKitDefaults);

  const scale = hovered && !reducedMotion ? (p.hoverScale as number) : 1;
  const borderWidth = hovered && !reducedMotion ? (p.borderWidth as number) : 1;
  const borderColor = hovered ? hoverBorderColor : "var(--color-hairline-mist)";

  return (
    <motion.article
      className={`w-full max-w-md rounded-[var(--radius-cards)] bg-[var(--color-sandstone)] p-[var(--card-padding)] ${className}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ scale, borderWidth, borderColor }}
      transition={reducedMotion ? { duration: 0 } : ((p.spring as Transition) ?? tabWidgetSpring)}
      style={{ borderStyle: "solid" }}
    >
      {children}
    </motion.article>
  );
}
