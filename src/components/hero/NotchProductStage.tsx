"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NotchShowcase } from "@/components/notch/NotchShowcase";
import { notchTabs, type NotchTabId } from "@/components/notch/notch-styles";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import type { GlassStyleId } from "@/lib/glass-themes";

const AUTO_CYCLE_MS = 5000;

export function NotchProductStage() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<NotchTabId>("now-playing");
  const [glassStyle, setGlassStyle] = useState<GlassStyleId>("liquidLight");
  const [userInteracted, setUserInteracted] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);

  const handleTabChange = useCallback((id: NotchTabId) => {
    setActive(id);
    setUserInteracted(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setUserInteracted(false), AUTO_CYCLE_MS * 2);
  }, []);

  useEffect(() => {
    if (reducedMotion || userInteracted) return;
    const interval = window.setInterval(() => {
      setActive((current) => {
        const index = notchTabs.findIndex((tab) => tab.id === current);
        return notchTabs[(index + 1) % notchTabs.length]!.id;
      });
    }, AUTO_CYCLE_MS);
    return () => window.clearInterval(interval);
  }, [reducedMotion, userInteracted]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    },
    [],
  );

  return (
    <NotchShowcase
      active={active}
      onTabChange={handleTabChange}
      glassStyle={glassStyle}
      onGlassStyleChange={setGlassStyle}
      showGlassToggle
      instanceId="hero"
      className="w-full"
    />
  );
}
