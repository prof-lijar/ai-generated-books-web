"use client";

import React from "react";
import { Button } from "../ui/Button";

interface PDFViewerProps {
  url: string;
}

export const PDFViewer = ({ url }: PDFViewerProps) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white border-b shadow-sm z-10">
        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => window.open(url, "_blank")}
          >
            Open in New Tab
          </Button>
          <a href={url} download target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="sm">
              Download PDF
            </Button>
          </a>
        </div>
        <div className="text-sm text-gray-500 hidden sm:block">
          Use browser controls for zoom and page navigation
        </div>
      </div>

      {/* PDF Content */}
      <iframe 
        src={url} 
        className="flex-1 w-full border-none" 
        title="PDF Viewer" 
      />
    </div>
  );
};
