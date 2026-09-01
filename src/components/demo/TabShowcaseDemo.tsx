"use client";

import { useState } from "react";
import { NotchShowcase } from "@/components/notch/NotchShowcase";
import type { NotchTabId } from "@/components/notch/notch-styles";
import type { GlassStyleId } from "@/lib/glass-themes";

type TabShowcaseDemoProps = {
  tab: NotchTabId;
};

export function TabShowcaseDemo({ tab }: TabShowcaseDemoProps) {
  const [glassStyle, setGlassStyle] = useState<GlassStyleId>("liquidLight");

  return (
    <NotchShowcase
      active={tab}
      glassStyle={glassStyle}
      onGlassStyleChange={tab === "shelf" ? setGlassStyle : undefined}
      showGlassToggle={tab === "shelf"}
      instanceId={`tab-${tab}`}
    />
  );
}
