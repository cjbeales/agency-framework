import classNames from "classnames";
import { coreStyles } from "@/styles";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: ButtonVariant;
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
  return (
    <button
      className={classNames(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
