"use client";

import { AnimatePresence, motion } from "motion/react";
import { GlassModeToggle } from "@/components/demo/GlassModeToggle";
import { AgentLiveInset } from "@/components/demo/AgentLiveInset";
import { NotchDemoProvider } from "@/components/notch/NotchDemoContext";
import { NotchCutout } from "@/components/notch/NotchCutout";
import { NotchTabPills } from "@/components/notch/NotchTabPills";
import { NOTCH_SHOWCASE } from "@/components/notch/notch-showcase";
import { ShowcaseFrame } from "@/components/notch/ShowcaseFrame";
import type { NotchTabId } from "@/components/notch/notch-styles";
import { IntentPanelCompact } from "@/components/notch/panels/IntentPanelCompact";
import { MusicColumn } from "@/components/notch/panels/MusicColumn";
import { ShelfPanelCompact } from "@/components/notch/panels/ShelfPanelCompact";
import { glassStyles, type GlassStyleId } from "@/lib/glass-themes";

type NotchShowcaseProps = {
  active: NotchTabId;
  onTabChange?: (id: NotchTabId) => void;
  glassStyle?: GlassStyleId;
  onGlassStyleChange?: (style: GlassStyleId) => void;
  showGlassToggle?: boolean;
  instanceId?: string;
  className?: string;
};

function NowPlayingRow({ glassStyle }: { glassStyle: GlassStyleId }) {
  return (
    <div
      className="grid w-full items-start gap-3"
      style={{
        gridTemplateColumns: `minmax(0, 1.1fr) ${NOTCH_SHOWCASE.notchWidth} minmax(0, 0.85fr)`,
      }}
    >
      <MusicColumn />
      <div aria-hidden />
      <AgentLiveInset glassStyle={glassStyle} />
    </div>
  );
}

export function NotchShowcase({
  active,
  onTabChange,
  glassStyle = "liquidLight",
  onGlassStyleChange,
  showGlassToggle = false,
  instanceId = "showcase",
  className = "",
}: NotchShowcaseProps) {
  const theme = glassStyles[glassStyle];

  return (
    <ShowcaseFrame className={className}>
      <NotchDemoProvider onTabChange={onTabChange}>
        <article
          className="rounded-[var(--radius-cards)] border p-4"
          style={{
            width: NOTCH_SHOWCASE.width,
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
            ["--widget-inset" as string]: theme.inset,
            ["--widget-text" as string]: theme.text,
            ["--widget-muted" as string]: theme.textMuted,
            ["--widget-border" as string]: theme.border,
            ["--widget-dashed" as string]: theme.dashed,
          }}
        >
          <div
            className="mb-3 grid items-start"
            style={{
              gridTemplateColumns: `minmax(0, 1fr) ${NOTCH_SHOWCASE.notchWidth} minmax(0, 1fr)`,
              columnGap: NOTCH_SHOWCASE.notchClearance,
              minHeight: NOTCH_SHOWCASE.bandHeight,
            }}
          >
            <div className="z-10 min-w-0 justify-self-start overflow-hidden">
              <NotchTabPills
                active={active}
                onChange={onTabChange ?? (() => undefined)}
                layoutId={`${instanceId}-tab-pill`}
                glassStyle={glassStyle}
              />
            </div>

            <div className="z-20 justify-self-center">
              <NotchCutout showcase />
            </div>

            <div className="z-10 justify-self-end">
              {showGlassToggle && onGlassStyleChange ? (
                <GlassModeToggle value={glassStyle} onChange={onGlassStyleChange} />
              ) : null}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="w-full"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.28 }}
            >
              {active === "now-playing" ? (
                <NowPlayingRow glassStyle={glassStyle} />
              ) : active === "intent" ? (
                <IntentPanelCompact />
              ) : (
                <ShelfPanelCompact />
              )}
            </motion.div>
          </AnimatePresence>
        </article>
      </NotchDemoProvider>
    </ShowcaseFrame>
  );
}
