"use client";

import React from "react";
import { Button } from "../ui/Button";

interface PDFViewerProps {
  url: string;
}

export const PDFViewer = ({ url }: PDFViewerProps) => {
  const proxyUrl = `/api/pdf?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">PDF Reader</h2>
          <p className="text-sm text-gray-500">
            Using browser native viewer
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a 
            href={proxyUrl} 
            download 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="sm">
              Download PDF
            </Button>
          </a>
          <a 
            href={proxyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="sm">
              Open in New Tab
            </Button>
          </a>
        </div>
      </div>
      {/* PDF Content */}
      <iframe 
        src={proxyUrl} 
        className="flex-1 w-full h-full border-none" 
        title="PDF Viewer" 
      />
    </div>
  );
};
