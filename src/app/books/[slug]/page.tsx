import React from "react";
import { PDFViewer } from "@/components/reader/PDFViewer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ReaderPage({ params }: PageProps) {
  const { slug } = params;
  
  // Construct the raw GitHub URL
  // Repository: prof-lijar/ai-generated-books
  // Assuming books are in the 'books/' directory on the 'main' branch
  const pdfUrl = `https://raw.githubusercontent.com/prof-lijar/ai-generated-books/main/books/${slug}`;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Back Button - Positioned absolutely to overlay the viewer */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/">
          <Button variant="outline" size="sm" className="shadow-md">
            ← Back to Library
          </Button>
        </Link>
      </div>

      <PDFViewer url={pdfUrl} />
    </div>
  );
}
