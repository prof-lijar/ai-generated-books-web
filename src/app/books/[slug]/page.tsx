import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// Dynamically import PDFViewer with SSR disabled to prevent pdfjs-dist from running on the server
const PDFViewer = dynamic(
  () => import("@/components/reader/PDFViewer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

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
