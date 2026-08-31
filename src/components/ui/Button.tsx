import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--fg-muted)] border border-transparent",
  secondary:
    "bg-transparent text-[var(--fg)] border border-[var(--border-light)] hover:border-[var(--fg-dim)]",
  ghost: "bg-transparent text-[var(--fg-muted)] hover:text-[var(--fg)]",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
};

function shouldUseNativeAnchor(href: string, external?: boolean): boolean {
  if (external) return true;
  return href.startsWith("/api/") || href.startsWith("http");
}

export function Button({
  variant = "primary",
  href,
  external,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`;

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
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
