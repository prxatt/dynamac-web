"use client";

import { useEffect, useRef } from "react";

const INTENSITY = 0.45;
const SMOOTHNESS = 0.028;

export function useNotchParallax(enabled: boolean) {
  const mainRef = useRef<SVGGElement>(null);
  const secondaryRef = useRef<SVGGElement>(null);
  const dropRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!enabled) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      targetX = nx * 120 * INTENSITY;
      targetY = ny * 90 * INTENSITY;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const render = () => {
      currentX += (targetX - currentX) * SMOOTHNESS;
      currentY += (targetY - currentY) * SMOOTHNESS;

      if (mainRef.current) {
        mainRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      if (secondaryRef.current) {
        secondaryRef.current.style.transform = `translate(${currentX * 1.4}px, ${currentY * 1.4}px)`;
      }
      if (dropRef.current) {
        dropRef.current.style.transform = `translate(${currentX * 1.9}px, ${currentY * 1.9}px)`;
      }

      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return { mainRef, secondaryRef, dropRef };
}
