"use client";

import { Button as HeadlessButton } from "@headlessui/react";
import classNames from "classnames";
import { coreStyles } from "@/styles";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
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
  className,
  ...props
}: ButtonProps) {
  const styles = classNames(variant !== "link" && coreStyles.buttons.base, variantStyles[variant], className);

  return (
    <HeadlessButton className={styles} {...props}>
      {children}
    </HeadlessButton>
  );
}