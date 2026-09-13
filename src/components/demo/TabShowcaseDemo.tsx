"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { NotchShowcase } from "@/components/notch/NotchShowcase";
import { useTheme } from "@/components/theme/ThemeProvider";
import type { NotchTabId } from "@/components/notch/notch-styles";
import type { GlassStyleId } from "@/lib/glass-themes";

type TabShowcaseDemoProps = {
  tab: NotchTabId;
};

function defaultGlassForSite(resolved: "light" | "dark"): GlassStyleId {
  return resolved === "dark" ? "liquidDark" : "liquidLight";
}

function glassFromDom(): GlassStyleId {
  if (typeof document === "undefined") return "liquidLight";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "liquidDark"
    : "liquidLight";
}

/** Fixed-tab product demo — glass follows site theme; no extra chrome. */
export function TabShowcaseDemo({ tab }: TabShowcaseDemoProps) {
  const { resolved } = useTheme();
  // SSR-stable — sync after mount / theme change
  const [glassStyle, setGlassStyle] = useState<GlassStyleId>("liquidLight");
  const userPicked = useRef(false);

  useLayoutEffect(() => {
    if (userPicked.current) return;
    setGlassStyle(glassFromDom());
  }, []);

  useLayoutEffect(() => {
    if (userPicked.current) return;
    setGlassStyle(defaultGlassForSite(resolved));
  }, [resolved]);

  return (
    <NotchShowcase
      active={tab}
      glassStyle={glassStyle}
      onGlassStyleChange={(style) => {
        userPicked.current = true;
        setGlassStyle(style);
      }}
      showGlassToggle={false}
      instanceId={`tab-${tab}`}
    />
  );
}
