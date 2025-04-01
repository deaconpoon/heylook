import React from "react";
import { twMerge } from "tailwind-merge";

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Optional heading for the card
   */
  title?: string;
  /**
   * Optional additional CSS classes
   */
  className?: string;
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
}

/**
 * Card component with glassmorphism effect
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  className,
  footer,
}) => {
  return (
    <div className={twMerge("glass-panel overflow-hidden", className)}>
      {title && (
        <div className="px-6 py-4 border-b border-[var(--border)]">
          <h3 className="text-h2 font-display font-medium">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--card-bg)]/50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
