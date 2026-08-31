import type { Transition } from "motion/react";

export const tabWidgetSpring: Transition = {
  type: "spring",
  visualDuration: 0.35,
  bounce: 0.2,
};

export const tabWidgetDialKitDefaults = {
  hoverScale: [1.02, 1, 1.08, 0.01] as [number, number, number, number],
  spring: {
    type: "spring" as const,
    visualDuration: 0.35,
    bounce: 0.2,
  },
  borderWidth: [2, 0, 4, 1] as [number, number, number, number],
};

export const sectionRevealTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const characterRevealTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
};
