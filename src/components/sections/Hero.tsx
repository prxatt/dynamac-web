"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { brand } from "@/lib/brand";
import { LiquidNotchScene } from "@/components/hero/LiquidNotchScene";
import "../hero/hero.css";

export function Hero() {
  return (
    <section className="home-hero">
      <div className="relative mx-auto max-w-[var(--max-width)]">
        <div className="home-hero__body">
        <FadeIn>
          <section className="home-hero__content">
            <div className="home-hero__eyebrow">
              <span />
              {brand.platformNote}
            </div>

            <h1 className="home-hero__title">{brand.name}</h1>
            <p className="home-hero__tagline">{brand.tagline}</p>

            <p className="home-hero__intro">{brand.shortDescription}</p>
            <p className="home-hero__credits">{brand.credits}</p>

            <div className="home-hero__actions">
              <a href="/api/download" className="home-hero__btn-primary">
                Download for macOS
              </a>
              <Link href="/buy" className="home-hero__btn-secondary">
                Buy ${brand.price.toFixed(2)}
              </Link>
            </div>

            <div className="home-hero__meta">
              <div className="home-hero__meta-item">
                <small>Platform</small>
                <strong>{brand.platform}</strong>
              </div>
              <div className="home-hero__meta-item">
                <small>Price</small>
                <strong>${brand.price.toFixed(2)} once</strong>
              </div>
              <div className="home-hero__meta-item">
                <small>Scroll</small>
                <span className="home-hero__scroll-dot">
                  <i />
                </span>
              </div>
            </div>
          </section>
        </FadeIn>

        <LiquidNotchScene />
        </div>
      </div>
    </section>
  );
}
