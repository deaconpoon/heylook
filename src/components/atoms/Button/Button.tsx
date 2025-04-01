import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   */
  variant?: "primary" | "secondary" | "tertiary";
  /**
   * Button size
   */
  size?: "sm" | "md" | "lg";
  /**
   * Optional icon to display before the button text
   */
  icon?: React.ReactNode;
  /**
   * Optional CSS class to apply to the button
   */
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}) => {
  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center rounded font-medium transition-all duration-300";

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-tiny",
    md: "px-6 py-3 text-body",
    lg: "px-8 py-4 text-h2",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-primary-gradient text-white hover:scale-[1.02] active:scale-[0.98]",
    secondary: "border border-look-blue text-look-blue hover:bg-look-blue/10",
    tertiary: "text-look-blue hover:underline",
  };

  const classes = twMerge(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  return (
    <button className={classes} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
