"use client";

import { useId, useSyncExternalStore } from "react";
import { appIconSrc } from "@/components/ui/AppIcon";
import { brand } from "@/lib/brand";
import { useNotchParallax } from "./useNotchParallax";

const marqueeText = `${brand.credits} - MAC NOTCH HUD - ${brand.name.toUpperCase()} - `;

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotion() {
  return false;
}

export function LiquidNotchScene() {
  const uid = useId().replace(/:/g, "");
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const { mainRef, secondaryRef, dropRef } = useNotchParallax(!reducedMotion);

  const mainPath = `${uid}-mainPath`;
  const secondaryPath = `${uid}-secondaryPath`;
  const dropPath = `${uid}-dropPath`;
  const mainClip = `${uid}-mainClip`;
  const secondaryClip = `${uid}-secondaryClip`;
  const dropClip = `${uid}-dropClip`;
  const mainFilter = `${uid}-mainFilter`;
  const glassStroke = `${uid}-glassStroke`;
  const specHot = `${uid}-specHot`;

  return (
    <div className="liquid-notch-visual" aria-hidden="true">
      <div className="liquid-notch-lighting">
        <span className="liquid-notch-glow liquid-notch-glow--ambient" />
        <span className="liquid-notch-glow liquid-notch-glow--red" />
        <span className="liquid-notch-glow liquid-notch-glow--blue" />
        <span className="liquid-notch-glow liquid-notch-glow--yellow" />
        <span className="liquid-notch-glow liquid-notch-glow--teal" />
      </div>

      <svg
        className="liquid-notch-scene"
        viewBox="0 0 1100 850"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path
            id={mainPath}
            d="M 175 210 C 175 165 215 125 275 125 L 395 125 C 420 125 438 98 458 82 C 478 98 496 125 521 125 L 825 125 C 885 125 925 165 925 210 L 925 395 C 925 455 885 495 825 495 L 275 495 C 215 495 175 455 175 395 Z"
          >
            {!reducedMotion ? (
              <animate
                attributeName="d"
                dur="14s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0; .34; .68; 1"
                keySplines=".42 0 .58 1; .42 0 .58 1; .42 0 .58 1"
                values="
                  M 175 210 C 175 165 215 125 275 125 L 395 125 C 420 125 438 98 458 82 C 478 98 496 125 521 125 L 825 125 C 885 125 925 165 925 210 L 925 395 C 925 455 885 495 825 495 L 275 495 C 215 495 175 455 175 395 Z;
                  M 162 218 C 162 168 208 118 272 118 L 388 118 C 414 118 432 88 458 74 C 484 88 502 118 528 118 L 838 118 C 898 118 938 168 938 218 L 938 402 C 938 462 898 502 838 502 L 272 502 C 208 502 162 452 162 402 Z;
                  M 188 202 C 188 158 228 132 282 132 L 402 132 C 426 132 444 104 462 88 C 480 104 498 132 522 132 L 818 132 C 872 132 912 158 912 202 L 912 388 C 912 448 872 488 818 488 L 282 488 C 228 488 188 448 188 388 Z;
                  M 175 210 C 175 165 215 125 275 125 L 395 125 C 420 125 438 98 458 82 C 478 98 496 125 521 125 L 825 125 C 885 125 925 165 925 210 L 925 395 C 925 455 885 495 825 495 L 275 495 C 215 495 175 455 175 395 Z
                "
              />
            ) : null}
          </path>

          <path
            id={secondaryPath}
            d="M 220 565 L 395 565 C 415 565 430 550 448 538 C 466 550 481 565 501 565 L 676 565 C 706 565 726 590 726 620 L 726 705 C 726 735 706 755 676 755 L 270 755 C 240 755 220 735 220 705 L 220 620 C 220 590 240 565 270 565 L 395 565 Z"
          >
            {!reducedMotion ? (
              <animate
                attributeName="d"
                dur="11s"
                begin="-3s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0; .5; 1"
                keySplines=".42 0 .58 1; .42 0 .58 1"
                values="
                  M 220 565 L 395 565 C 415 565 430 550 448 538 C 466 550 481 565 501 565 L 676 565 C 706 565 726 590 726 620 L 726 705 C 726 735 706 755 676 755 L 270 755 C 240 755 220 735 220 705 L 220 620 C 220 590 240 565 270 565 L 395 565 Z;
                  M 208 578 L 382 578 C 402 578 418 560 438 546 C 456 560 472 578 492 578 L 688 578 C 718 578 738 604 738 634 L 738 718 C 738 748 718 768 688 768 L 258 768 C 228 768 208 748 208 718 L 208 634 C 208 604 228 578 258 578 L 382 578 Z;
                  M 220 565 L 395 565 C 415 565 430 550 448 538 C 466 550 481 565 501 565 L 676 565 C 706 565 726 590 726 620 L 726 705 C 726 735 706 755 676 755 L 270 755 C 240 755 220 735 220 705 L 220 620 C 220 590 240 565 270 565 L 395 565 Z
                "
              />
            ) : null}
          </path>

          <path
            id={dropPath}
            d="M 640 680 L 720 680 C 738 680 752 696 752 714 L 752 768 C 752 786 738 802 720 802 L 660 802 C 642 802 628 786 628 768 L 628 714 C 628 696 642 680 660 680 L 640 680 Z"
          >
            {!reducedMotion ? (
              <animate
                attributeName="d"
                dur="8s"
                begin="-5s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0; .5; 1"
                keySplines=".42 0 .58 1; .42 0 .58 1"
                values="
                  M 640 680 L 720 680 C 738 680 752 696 752 714 L 752 768 C 752 786 738 802 720 802 L 660 802 C 642 802 628 786 628 768 L 628 714 C 628 696 642 680 660 680 L 640 680 Z;
                  M 632 688 L 726 688 C 744 688 760 706 760 726 L 760 778 C 760 796 744 812 726 812 L 652 812 C 634 812 618 796 618 778 L 618 726 C 618 706 634 688 652 688 L 632 688 Z;
                  M 640 680 L 720 680 C 738 680 752 696 752 714 L 752 768 C 752 786 738 802 720 802 L 660 802 C 642 802 628 786 628 768 L 628 714 C 628 696 642 680 660 680 L 640 680 Z
                "
              />
            ) : null}
          </path>

          <clipPath id={mainClip}>
            <use href={`#${mainPath}`} />
          </clipPath>
          <clipPath id={secondaryClip}>
            <use href={`#${secondaryPath}`} />
          </clipPath>
          <clipPath id={dropClip}>
            <use href={`#${dropPath}`} />
          </clipPath>

          <filter id={mainFilter} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.01"
              numOctaves="2"
              seed="8"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="1.1" result="blur" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blur"
              scale={reducedMotion ? 0 : 42}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <linearGradient id={glassStroke} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8cc7b8" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#f2f2f2" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#e8b923" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#1e4d8c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c41e3a" stopOpacity="0.7" />
          </linearGradient>

          <radialGradient id={specHot} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Bauhaus accents */}
        <rect x="88" y="120" width="28" height="28" fill="var(--red)" opacity="0.9" />
        <circle cx="980" cy="180" r="14" fill="var(--blue)" opacity="0.85" />
        <polygon points="1020,620 1048,668 992,668" fill="var(--yellow)" opacity="0.8" />

        <g ref={mainRef} className="liquid-notch-layer">
          <g clipPath={`url(#${mainClip})`} filter={`url(#${mainFilter})`}>
            <rect x="0" y="0" width="1100" height="850" fill="#0f0f0f" />
            <image
              href={appIconSrc}
              x="395"
              y="195"
              width="310"
              height="310"
              preserveAspectRatio="xMidYMid meet"
            />
            <rect x="0" y="0" width="1100" height="850" fill="var(--glow-teal)" opacity="0.12" />
            <ellipse cx="430" cy="210" rx="42" ry="32" fill={`url(#${specHot})`} opacity="0.5" />
          </g>

          {!reducedMotion ? (
            <g className="liquid-notch-marquee">
              <text className="liquid-notch-marquee__text" dy="-8">
                <textPath href={`#${mainPath}`} startOffset="0%">
                  {marqueeText}
                  <animate
                    attributeName="startOffset"
                    from="0%"
                    to="100%"
                    dur="24s"
                    repeatCount="indefinite"
                  />
                </textPath>
              </text>
              <text className="liquid-notch-marquee__text" dy="-8">
                <textPath href={`#${mainPath}`} startOffset="-100%">
                  {marqueeText}
                  <animate
                    attributeName="startOffset"
                    from="-100%"
                    to="0%"
                    dur="24s"
                    repeatCount="indefinite"
                  />
                </textPath>
              </text>
            </g>
          ) : null}

          <use
            href={`#${mainPath}`}
            className="liquid-notch-edge liquid-notch-edge--main"
            stroke={`url(#${glassStroke})`}
          />
        </g>

        <g ref={secondaryRef} className="liquid-notch-layer">
          <g clipPath={`url(#${secondaryClip})`}>
            <rect x="0" y="0" width="1100" height="850" fill="#121212" />
            <rect x="268" y="600" width="100" height="8" rx="2" fill="var(--blue)" opacity="0.7" />
            <rect x="268" y="618" width="80" height="6" rx="2" fill="#333" />
            <rect x="268" y="634" width="96" height="6" rx="2" fill="#333" />
            <rect x="268" y="668" width="64" height="24" rx="4" fill="var(--blue)" opacity="0.25" />
          </g>
          <use
            href={`#${secondaryPath}`}
            className="liquid-notch-edge"
            stroke={`url(#${glassStroke})`}
          />
        </g>

        <g ref={dropRef} className="liquid-notch-layer">
          <g clipPath={`url(#${dropClip})`}>
            <rect x="0" y="0" width="1100" height="850" fill="#111" />
            <rect x="655" y="700" width="36" height="44" rx="4" fill="var(--yellow)" opacity="0.35" />
          </g>
          <use
            href={`#${dropPath}`}
            className="liquid-notch-edge"
            stroke={`url(#${glassStroke})`}
          />
        </g>
      </svg>
    </div>
  );
}
