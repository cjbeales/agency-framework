import classNames from "classnames";
import { coreStyles } from "@/styles";

type TextVariant =
  | "bodyLg"
  | "body"
  | "bodySm"
  | "caption"
  | "eyebrow"
  | "prose";
type TextTag = "p" | "span" | "div";

export type TextProps = {
  children: React.ReactNode;
  variant?: TextVariant;
  as?: TextTag;
  className?: string;
};

const variantStyles: Record<TextVariant, string> = {
  bodyLg: coreStyles.typography.bodyLg,
  body: coreStyles.typography.body,
  bodySm: coreStyles.typography.bodySm,
  caption: coreStyles.typography.caption,
  eyebrow: coreStyles.typography.eyebrow,
  prose: coreStyles.typography.prose,
};

const defaultTag: Record<TextVariant, TextTag> = {
  bodyLg: "p",
  body: "p",
  bodySm: "p",
  caption: "span",
  eyebrow: "span",
  prose: "div",
};

export default function Text({
  children,
  variant = "body",
  as,
  className,
}: TextProps) {
  const Tag = as ?? defaultTag[variant];

  return (
    <Tag className={classNames(variantStyles[variant], className)}>
      {children}
    </Tag>
  );
}
