import * as React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
}

export const Card = ({ children, className = "", title, subtitle, footer }: CardProps) => {
  return (
    <div className={`bg-bg-surface border border-border rounded-lg shadow-sm overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="p-4 border-b border-border">
          {title && <h3 className="text-lg font-semibold text-text-main">{title}</h3>}
          {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t border-border bg-bg-muted/50">
          {footer}
        </div>
      )}
    </div>
  );
};
