"use client";

import { Button as HeadlessButton } from "@headlessui/react";
import classNames from "classnames";
import { coreStyles } from "@/styles";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: coreStyles.buttons.primary,
  secondary: coreStyles.buttons.secondary,
  ghost: coreStyles.buttons.ghost,
  link: coreStyles.buttons.link,
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const isLink = variant === "link";

  const styles = classNames(
    !isLink && coreStyles.buttons.base,
    !isLink && coreStyles.buttons.sizes[size],
    variantStyles[variant],
    className
  );

  return (
    <HeadlessButton className={styles} {...props}>
      {children}
    </HeadlessButton>
  );
}
