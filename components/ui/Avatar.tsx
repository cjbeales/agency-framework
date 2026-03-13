import classNames from "classnames";
import Image from "next/image";
import { coreStyles } from "@/styles";

type AvatarSize = "sm" | "md" | "lg";

export type AvatarProps = {
  src?: string | null;
  alt: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
};

const sizeStyles: Record<AvatarSize, { container: string; image: number }> = {
  sm: { container: "h-10 w-10", image: 40 },
  md: { container: "h-12 w-12", image: 48 },
  lg: { container: "h-16 w-16", image: 64 },
};

export default function Avatar({
  src,
  alt,
  name,
  size = "md",
  className,
}: AvatarProps) {
  const { container, image } = sizeStyles[size];

  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-2",
        className
      )}
    >
      <div
        className={classNames(
          "overflow-hidden rounded-full bg-surface-muted",
          container
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={image}
            height={image}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className={classNames(
              "flex h-full w-full items-center justify-center",
              coreStyles.typography.caption,
              "text-text-soft"
            )}
            aria-hidden
          >
            {alt.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      {name && (
        <span className={coreStyles.typography.bodySm}>{name}</span>
      )}
    </div>
  );
}
