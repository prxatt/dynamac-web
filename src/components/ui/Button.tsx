import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { DownloadIcon } from "@/components/ui/DownloadIcon";

type ButtonVariant = "primary" | "secondary" | "outline" | "accent" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-canvas)] border border-[var(--color-ink)] hover:bg-[var(--color-canvas-elevated)] hover:text-[var(--color-ink)]",
  secondary:
    "bg-transparent text-[var(--color-ink)] border-b border-[var(--color-muted)] rounded-none px-0 hover:border-[var(--color-accent)]",
  outline:
    "bg-[var(--color-canvas-elevated)] text-[var(--color-ink)] border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-canvas)]",
  accent:
    "bg-[var(--color-accent)] text-white border border-transparent hover:opacity-95",
  ghost: "bg-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  dot?: "sky" | "grass" | "none";
  downloadIcon?: boolean;
  children: ReactNode;
};

function shouldUseNativeAnchor(href: string, external?: boolean): boolean {
  if (external) return true;
  return (
    href.startsWith("/api/") ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

function ActionDot({ dot }: { dot: "sky" | "grass" }) {
  const color = dot === "sky" ? "var(--color-primary-blue)" : "var(--color-fresh-grass)";
  return (
    <span
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden
    />
  );
}

export function Button({
  variant = "primary",
  href,
  external,
  dot = "none",
  downloadIcon = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const isLinkStyle = variant === "secondary";
  const classes = `inline-flex items-center justify-center gap-2.5 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-50 ${
    isLinkStyle
      ? "py-2 text-[length:var(--text-body-sm)]"
      : "rounded-[var(--radius-buttons)] px-5 py-[11px] text-[length:var(--text-body-sm)]"
  } ${variantClasses[variant]} ${className}`.trim();

  const content = (
    <>
      {downloadIcon ? <DownloadIcon className="h-4 w-4 shrink-0" /> : null}
      <span>{children}</span>
      {dot !== "none" && variant !== "accent" && !downloadIcon ? (
        <ActionDot dot={dot} />
      ) : null}
    </>
  );

  if (href) {
    if (shouldUseNativeAnchor(href, external)) {
      const opensNewTab = external && href.startsWith("http");

      return (
        <a
          href={href}
          className={classes}
          {...(opensNewTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
