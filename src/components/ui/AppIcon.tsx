import Image from "next/image";

const ICON_SRC = "/brand/dynamac-app-icon-1024.png";

type AppIconProps = {
  size: number;
  className?: string;
  priority?: boolean;
};

export function AppIcon({ size, className = "", priority }: AppIconProps) {
  return (
    <Image
      src={ICON_SRC}
      alt=""
      width={size}
      height={size}
      className={`rounded-[22%] ${className}`}
      priority={priority}
    />
  );
}

export const appIconSrc = ICON_SRC;
