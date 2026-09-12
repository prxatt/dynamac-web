"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { NOTCH_SHOWCASE } from "@/components/notch/notch-showcase";

type ShowcaseFrameProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Native open-notch width (760px). Scales down on narrow viewports and
 * reserves layout height from measured content so transform scale never
 * collapses the document flow.
 *
 * Scale uses container query units (`cqi`) so the first paint (and no-JS)
 * already fits the viewport — JS only reserves scaled layout height.
 */
export function ShowcaseFrame({ children, className = "" }: ShowcaseFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [layoutHeight, setLayoutHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const measureRawHeight = () => {
      const child = content.firstElementChild as HTMLElement | null;
      const fromChild = child ? Math.max(child.scrollHeight, child.offsetHeight) : 0;
      // Prefer measured content; small floor only while first paint has no child yet
      return Math.max(content.scrollHeight, content.offsetHeight, fromChild, 1);
    };

    const update = () => {
      const available = Math.max(container.clientWidth, 1);
      const nextScale = Math.min(1, available / NOTCH_SHOWCASE.widthPx);
      setLayoutHeight(measureRawHeight() * nextScale);
    };

    update();
    const raf1 = requestAnimationFrame(() => {
      update();
      requestAnimationFrame(update);
    });
    // Tab panels animate in — catch late height after presence settle
    const late = window.setTimeout(update, 320);

    const ro = new ResizeObserver(update);
    ro.observe(container);
    ro.observe(content);
    if (content.firstElementChild) ro.observe(content.firstElementChild);

    return () => {
      cancelAnimationFrame(raf1);
      window.clearTimeout(late);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full min-w-0 ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <div
        className="mx-auto overflow-visible"
        style={{
          width: `min(100%, ${NOTCH_SHOWCASE.widthPx}px)`,
          height: layoutHeight ?? undefined,
          minHeight: layoutHeight == null ? 200 : undefined,
        }}
      >
        <div
          ref={contentRef}
          style={{
            width: NOTCH_SHOWCASE.widthPx,
            // Length ÷ length yields a unitless factor (required by scale()).
            transform: `scale(min(1, 100cqi / ${NOTCH_SHOWCASE.widthPx}px))`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
