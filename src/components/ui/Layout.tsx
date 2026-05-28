import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col bg-bg-main text-text-main ${className}`}>
      {children}
    </div>
  );
};
