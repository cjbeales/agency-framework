import classNames from "classnames";
import { coreStyles } from "@/styles";

type ContainerVariant = "default" | "wide" | "narrow";

export type ContainerProps = {
  children: React.ReactNode;
  variant?: ContainerVariant;
  className?: string;
};

const variantStyles: Record<ContainerVariant, string> = {
  default: coreStyles.layout.page,
  wide: coreStyles.layout.pageWide,
  narrow: coreStyles.layout.pageNarrow,
};

export default function Container({
  children,
  variant = "default",
  className,
}: ContainerProps) {
  return (
    <div className={classNames(variantStyles[variant], className)}>
      {children}
    </div>
  );
}
