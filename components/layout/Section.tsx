import classNames from "classnames";
import { coreStyles } from "@/styles";

type SectionVariant = "default" | "sm" | "lg";

export type SectionProps = {
  children: React.ReactNode;
  variant?: SectionVariant;
  inner?: boolean;
  className?: string;
};

const variantStyles: Record<SectionVariant, string> = {
  default: coreStyles.layout.section,
  sm: coreStyles.layout.sectionSm,
  lg: coreStyles.layout.sectionLg,
};

export default function Section({
  children,
  variant = "default",
  inner = false,
  className,
}: SectionProps) {
  return (
    <section
      className={classNames(
        variantStyles[variant],
        inner && coreStyles.layout.sectionInner,
        className
      )}
    >
      {children}
    </section>
  );
}
