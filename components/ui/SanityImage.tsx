import classNames from "classnames";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

type SanityImageSource = Parameters<typeof urlFor>[0];

export type SanityImageProps = {
  image: SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

function getHotspotPosition(hotspot: { x: number; y: number; width: number; height: number } | undefined): string {
  if (!hotspot) return "50% 50%";
  const x = (hotspot.x + hotspot.width / 2) * 100;
  const y = (hotspot.y + hotspot.height / 2) * 100;
  return `${x}% ${y}%`;
}

export default function SanityImage({
  image,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className,
  priority = false,
}: SanityImageProps) {
  const builder = urlFor(image);
  const hotspot = image && typeof image === "object" && "hotspot" in image ? image.hotspot : undefined;

  const objectPosition = hotspot ? getHotspotPosition(hotspot) : undefined;

  if (fill) {
    const src = builder.width(1920).url();
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={classNames("object-cover", className)}
        style={objectPosition ? { objectPosition } : undefined}
        priority={priority}
      />
    );
  }

  const w = width ?? 1200;
  const h = height ?? 800;
  const src = builder.width(w).height(h).url();

  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      className={classNames("object-cover", className)}
      style={objectPosition ? { objectPosition } : undefined}
      priority={priority}
    />
  );
}
