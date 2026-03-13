import classNames from "classnames";

type DividerVariant = "default" | "muted" | "thick";

export type DividerProps = {
  variant?: DividerVariant;
  className?: string;
};

const variantStyles: Record<DividerVariant, string> = {
  default: "h-px w-full bg-border",
  muted: "h-px w-full bg-border/50",
  thick: "h-0.5 w-full bg-border",
};

export default function Divider({
  variant = "default",
  className,
}: DividerProps) {
  return (
    <hr
      className={classNames(variantStyles[variant], className)}
      aria-hidden
    />
  );
}
