"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const dialKitEnabled =
  process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_DIALKIT === "1";

/**
 * Opt-in only (`NEXT_PUBLIC_DIALKIT=1`). Never mount DialKit by default —
 * its CSS chunk has been crashing Turbopack sessions.
 */
export function DialKitDevRoot() {
  if (!dialKitEnabled) return null;
  return <DialKitPanelLazy />;
}

const DialKitPanelLazy = dialKitEnabled
  ? (dynamic(() => import("./DialKitPanel"), {
      ssr: false,
      loading: () => null,
    }) as ComponentType)
  : function DialKitDisabled() {
      return null;
    };
