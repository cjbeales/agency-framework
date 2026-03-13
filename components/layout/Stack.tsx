import classNames from "classnames";
import { coreStyles } from "@/styles";

type StackVariant = "sm" | "md" | "lg" | "xl";

export type StackProps = {
  children: React.ReactNode;
  variant?: StackVariant;
  className?: string;
};

const variantStyles: Record<StackVariant, string> = {
  sm: coreStyles.layout.stackSm,
  md: coreStyles.layout.stackMd,
  lg: coreStyles.layout.stackLg,
  xl: coreStyles.layout.stackXl,
};

export default function Stack({
  children,
  variant = "md",
  className,
}: StackProps) {
  return (
    <div className={classNames(variantStyles[variant], className)}>
      {children}
    </div>
  );
}
