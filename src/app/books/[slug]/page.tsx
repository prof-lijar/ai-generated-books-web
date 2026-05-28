import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { fetchBooks } from "@/lib/github";
import { notFound } from "next/navigation";

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

export default async function ReaderPage({ params }: PageProps) {
  const { slug } = params;
  
  // Fetch books to find the correct URL for the given filename (slug)
  const books = await fetchBooks();
  const book = books.find((b) => b.filename === decodeURIComponent(slug));

  if (!book) {
    return notFound();
  }

  const pdfUrl = book.url;

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
