"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";

interface PDFViewerProps {
  url: string;
  title: string;
}

export const PDFViewer = ({ url, title }: PDFViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const proxyUrl = `/api/pdf?url=${encodeURIComponent(url)}`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-bg-main overflow-hidden">
      {/* Toolbar */}
      <header className="flex items-center justify-between px-4 py-3 bg-bg-surface border-b border-border shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <Link href="/">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              ← Library
            </Button>
          </Link>
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-base font-semibold text-text-main truncate">
              {title}
            </h2>
            <p className="text-xs text-text-muted truncate hidden xs:block">
              PDF Reader
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a 
            href={proxyUrl} 
            download 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:block"
          >
            <Button variant="primary" size="sm">
              Download
            </Button>
          </a>
          <a 
            href={proxyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="sm">
              Open New Tab
            </Button>
          </a>
        </div>
      </header>

      {/* Main Viewer Area */}
      <main className="relative flex-1 min-h-0 w-full bg-bg-muted">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-bg-main">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-text-muted font-medium">Loading book...</p>
          </div>
        )}
        
        <iframe 
          src={proxyUrl} 
          className={`w-full h-full border-none transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`} 
          title={title} 
          onLoad={handleLoad}
        />
      </main>

      {/* Mobile Bottom Bar - Quick Actions */}
      <div className="sm:hidden flex items-center justify-around p-3 bg-bg-surface border-t border-border shrink-0">
        <Link href="/" className="flex flex-col items-center text-text-muted hover:text-primary transition-colors">
          <span className="text-xs font-medium">Library</span>
        </Link>
        <a 
          href={proxyUrl} 
          download 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center text-text-muted hover:text-primary transition-colors"
        >
          <span className="text-xs font-medium">Download</span>
        </a>
        <a 
          href={proxyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center text-text-muted hover:text-primary transition-colors"
        >
          <span className="text-xs font-medium">Full Screen</span>
        </a>
      </div>
    </div>
  );
};
