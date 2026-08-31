"use client";

import { useDialKit } from "dialkit";
import { motion, type Transition } from "motion/react";
import { useState, type ReactNode } from "react";

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

  const p = useDialKit(dialKitName, {
    hoverScale: [1.02, 1, 1.08, 0.01],
    spring: {
      type: "spring",
      visualDuration: 0.35,
      bounce: 0.2,
    },
    borderWidth: [2, 0, 4, 1],
  });

  const scale = hovered ? p.hoverScale : 1;
  const borderWidth = hovered ? p.borderWidth : 1;
  const borderColor = hovered ? hoverBorderColor : "var(--color-hairline-mist)";

  return (
    <motion.article
      className={`w-full max-w-md rounded-[var(--radius-cards)] bg-[var(--color-sandstone)] p-[var(--card-padding)] ${className}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ scale, borderWidth, borderColor }}
      transition={p.spring as Transition}
      style={{ borderStyle: "solid" }}
    >
      {children}
    </motion.article>
  );
}
