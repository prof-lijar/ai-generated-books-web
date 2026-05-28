"use client";

import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "../ui/Button";

// Set up the worker for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  url: string;
}

interface PDFPage {
  view: number[];
}

export const PDFViewer = ({ url }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function onPageLoadSuccess(page: PDFPage) {
    // page.view contains [x, y, width, height]
    if (page && page.view && page.view.length >= 3) {
      setPageWidth(page.view[2]);
    }
  }

  const changePage = (offset: number) => {
    setPageNumber(prev => Math.min(Math.max(1, prev + offset), numPages));
  };

  const adjustZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 3.0));
  };

  const fitToWidth = () => {
    if (containerRef.current && pageWidth > 0) {
      // p-4 is 1rem (16px) on each side, so 32px total
      const containerWidth = containerRef.current.clientWidth - 32;
      const newScale = containerWidth / pageWidth;
      setScale(Math.min(Math.max(0.5, newScale), 3.0));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-white border-b shadow-sm gap-4 z-10">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => changePage(-1)} 
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {pageNumber} of {numPages}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => changePage(1)} 
            disabled={pageNumber >= numPages}
          >
            Next
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => adjustZoom(-0.2)} disabled={scale <= 0.5}>
            Zoom Out
          </Button>
          <span className="text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>
          <Button variant="outline" size="sm" onClick={() => adjustZoom(0.2)} disabled={scale >= 3.0}>
            Zoom In
          </Button>
          <Button variant="outline" size="sm" onClick={fitToWidth}>
            Fit to Width
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => window.open(url, "_blank")}>
            Open in New Tab
          </Button>
          <a href={url} download target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="sm">
              Download PDF
            </Button>
          </a>
        </div>
      </div>

      {/* PDF Content */}
      <div ref={containerRef} className="flex-1 overflow-auto p-4 flex justify-center">
        <div className="shadow-lg bg-white">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="p-10 text-center">Loading PDF...</div>}
            error={<div className="p-10 text-center text-red-500">Failed to load PDF.</div>}
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              onLoadSuccess={onPageLoadSuccess}
              renderTextLayer={false} 
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};
