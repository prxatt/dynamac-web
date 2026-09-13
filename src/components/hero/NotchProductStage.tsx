"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NotchShowcase } from "@/components/notch/NotchShowcase";
import { notchTabs, type NotchTabId } from "@/components/notch/notch-styles";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useTheme } from "@/components/theme/ThemeProvider";
import type { GlassStyleId } from "@/lib/glass-themes";

const AUTO_CYCLE_MS = 5500;
/** Hold Now Playing on first paint so music + agents land before the first switch. */
const AUTO_CYCLE_START_DELAY_MS = 4200;

function defaultGlassForSite(resolved: "light" | "dark"): GlassStyleId {
  return resolved === "dark" ? "liquidDark" : "liquidLight";
}

function glassFromDom(): GlassStyleId {
  if (typeof document === "undefined") return "liquidLight";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "liquidDark"
    : "liquidLight";
}

export function NotchProductStage() {
  const reducedMotion = useReducedMotion();
  const { resolved } = useTheme();
  const [active, setActive] = useState<NotchTabId>("now-playing");
  // SSR-stable default — sync to site theme in layout effects (avoids glass toggle hydration mismatch)
  const [glassStyle, setGlassStyle] = useState<GlassStyleId>("liquidLight");
  const [userInteracted, setUserInteracted] = useState(false);
  const userPickedGlass = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (userPickedGlass.current) return;
    setGlassStyle(glassFromDom());
  }, []);

  useLayoutEffect(() => {
    if (userPickedGlass.current) return;
    setGlassStyle(defaultGlassForSite(resolved));
  }, [resolved]);

  const handleTabChange = useCallback((id: NotchTabId) => {
    setActive(id);
    setUserInteracted(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setUserInteracted(false), AUTO_CYCLE_MS * 2);
  }, []);

  const handleGlassChange = useCallback((style: GlassStyleId) => {
    userPickedGlass.current = true;
    setGlassStyle(style);
  }, []);

  useEffect(() => {
    if (reducedMotion || userInteracted) return;
    let intervalId: number | null = null;
    const advance = () => {
      setActive((current) => {
        const index = notchTabs.findIndex((tab) => tab.id === current);
        return notchTabs[(index + 1) % notchTabs.length]!.id;
      });
    };
    const startId = window.setTimeout(() => {
      advance();
      intervalId = window.setInterval(advance, AUTO_CYCLE_MS);
    }, AUTO_CYCLE_START_DELAY_MS);
    return () => {
      window.clearTimeout(startId);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
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
      onGlassStyleChange={handleGlassChange}
      showGlassToggle
      instanceId="hero"
      className="w-full"
    />
  );
}
