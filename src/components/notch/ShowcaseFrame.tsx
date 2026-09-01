"use client";

import type { ReactNode } from "react";
import { NOTCH_SHOWCASE } from "@/components/notch/notch-showcase";

type ShowcaseFrameProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The notch demo is always 760px — same as the app.
 * On narrow viewports the page scrolls horizontally instead of shrinking the UI.
 */
export function ShowcaseFrame({ children, className = "" }: ShowcaseFrameProps) {
  return (
    <div className={`w-full min-w-0 ${className}`}>
      <div className="overflow-x-auto overflow-y-visible [-webkit-overflow-scrolling:touch]">
        <div
          style={{
            width: NOTCH_SHOWCASE.width,
            minWidth: NOTCH_SHOWCASE.width,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
