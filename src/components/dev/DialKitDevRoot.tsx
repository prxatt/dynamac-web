"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const DialKitPanel = dynamic(
  () =>
    process.env.NODE_ENV === "development"
      ? import("./DialKitPanel")
      : Promise.resolve({ default: function DialKitPanelStub() { return null; } }),
  { ssr: false },
) as ComponentType;

export function DialKitDevRoot() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return <DialKitPanel />;
}
