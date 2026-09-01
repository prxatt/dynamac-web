"use client";

import { useDialKit } from "dialkit";
import { motion, type Transition } from "motion/react";
import { useState, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { glassStyles, type GlassStyleId } from "@/lib/glass-themes";
import { tabWidgetDialKitDefaults, tabWidgetSpring } from "@/lib/tab-widget-motion";

type TabWidgetCardProps = {
  dialKitName: string;
  hoverBorderColor?: string;
  children: ReactNode;
  className?: string;
  glassStyle?: GlassStyleId;
};

export function TabWidgetCard({
  dialKitName,
  hoverBorderColor = "var(--color-fresh-grass)",
  children,
  className = "",
  glassStyle = "liquidLight",
}: TabWidgetCardProps) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const theme = glassStyles[glassStyle];

  const p = useDialKit(dialKitName, tabWidgetDialKitDefaults);

  const scale = hovered && !reducedMotion ? (p.hoverScale as number) : 1;
  const borderWidth = hovered && !reducedMotion ? (p.borderWidth as number) : 1;
  const borderColor = hovered ? hoverBorderColor : theme.border;

  return (
    <motion.article
      className={`w-full rounded-[var(--radius-cards)] p-[var(--card-padding)] ${className}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ scale, borderWidth, borderColor }}
      transition={reducedMotion ? { duration: 0 } : ((p.spring as Transition) ?? tabWidgetSpring)}
      style={{
        borderStyle: "solid",
        backgroundColor: theme.card,
        color: theme.text,
        ["--widget-inset" as string]: theme.inset,
        ["--widget-text" as string]: theme.text,
        ["--widget-muted" as string]: theme.textMuted,
        ["--widget-border" as string]: theme.border,
        ["--widget-dashed" as string]: theme.dashed,
      }}
    >
      {children}
    </motion.article>
  );
}
