import classNames from "classnames";
import { coreStyles } from "@/styles";

type HeadingVariant = "display" | "h1" | "h2" | "h3" | "h4";
type HeadingTag = "h1" | "h2" | "h3" | "h4";

export type HeadingProps = {
  children: React.ReactNode;
  variant?: HeadingVariant;
  as?: HeadingTag;
  className?: string;
};

const variantStyles: Record<HeadingVariant, string> = {
  display: coreStyles.typography.display,
  h1: coreStyles.typography.h1,
  h2: coreStyles.typography.h2,
  h3: coreStyles.typography.h3,
  h4: coreStyles.typography.h4,
};

const defaultTag: Record<HeadingVariant, HeadingTag> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
};

export default function Heading({
  children,
  variant = "h1",
  as,
  className,
}: HeadingProps) {
  const Tag = as ?? defaultTag[variant];

  return (
    <Tag className={classNames(variantStyles[variant], className)}>
      {children}
    </Tag>
  );
}
