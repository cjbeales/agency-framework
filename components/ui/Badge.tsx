import classNames from "classnames";
import { coreStyles } from "@/styles";

type BadgeVariant = "base" | "brand";

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  base: coreStyles.badges.base,
  brand: coreStyles.badges.brand,
};

export default function Badge({
  children,
  variant = "base",
  className,
}: BadgeProps) {
  return (
    <span className={classNames(variantStyles[variant], className)}>
      {children}
    </span>
  );
}
