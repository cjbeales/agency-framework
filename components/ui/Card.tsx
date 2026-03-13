import classNames from "classnames";
import { coreStyles } from "@/styles";

type CardVariant = "base" | "interactive" | "project" | "soft" | "dark";

export type CardProps = {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
};

const variantStyles: Record<CardVariant, string> = {
  base: coreStyles.cards.base,
  interactive: coreStyles.cards.interactive,
  project: coreStyles.cards.project,
  soft: coreStyles.cards.soft,
  dark: coreStyles.cards.dark,
};

export default function Card({
  children,
  variant = "base",
  className,
}: CardProps) {
  return (
    <div className={classNames(variantStyles[variant], className)}>
      {children}
    </div>
  );
}
