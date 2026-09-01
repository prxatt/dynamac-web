import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { DownloadIcon } from "@/components/ui/DownloadIcon";

type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-pure-white)] text-[var(--color-ink-black)] border border-[var(--color-hairline-mist)] hover:border-[var(--color-ink-black)]",
  secondary:
    "bg-transparent text-[var(--color-ink-black)] border-b border-[var(--color-stone-gray)] rounded-none px-0 hover:border-[var(--color-ink-black)]",
  accent:
    "bg-[var(--color-coral-pop)] text-[var(--color-pure-white)] border border-transparent hover:opacity-95",
  ghost: "bg-transparent text-[var(--color-stone-gray)] hover:text-[var(--color-ink-black)]",
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
  return href.startsWith("/api/") || href.startsWith("http");
}

function ActionDot({ dot }: { dot: "sky" | "grass" }) {
  const color = dot === "sky" ? "var(--color-sky-pop)" : "var(--color-fresh-grass)";
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
  dot = variant === "primary" ? "sky" : "none",
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
  } ${variantClasses[variant]} ${className}`;

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
