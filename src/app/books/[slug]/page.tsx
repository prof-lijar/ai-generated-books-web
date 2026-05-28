import React from "react";
import { PDFViewer } from "@/components/reader/PDFViewer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { fetchBooks } from "@/lib/github";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ReaderPage({ params }: PageProps) {
  const { slug } = params;
  
  try {
    const books = await fetchBooks();
    const book = books.find((b) => b.filename === slug);
    
    if (!book) {
      throw new Error('Book not found');
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
  } catch (error) {
    console.error('Error loading book:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/30">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Book not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The requested book could not be located.</p>
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Return to Library
          </Link>
        </div>
      </div>
    );
  }
}
