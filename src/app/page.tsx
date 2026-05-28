'use client';

import React, { useState, useEffect } from 'react';
import { Book } from '@/types';
import { SearchBar } from '@/components/library/SearchBar';
import { BookCard } from '@/components/library/BookCard';
import { Hero } from '@/components/landing/Hero';
import { Footer } from '@/components/landing/Footer';
import { Container } from '@/components/ui/Container';

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error(`Error fetching books: ${response.statusText}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToLibrary = () => {
    const element = document.getElementById('library-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-muted font-medium">Loading library...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main p-4">
        <div className="max-w-md w-full text-center p-8 bg-bg-surface rounded-2xl shadow-sm border border-red-100 dark:border-red-900/30">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732 3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-text-main mb-2">Something went wrong</h2>
          <p className="text-text-muted mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main">
      <Hero onScrollToLibrary={scrollToLibrary} />
      
      <main id="library-section" className="py-12 px-4 sm:px-6 lg:px-8">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-text-main mb-4 tracking-tight">
                Digital Library
              </h2>
              <p className="text-text-muted">
                Browse our collection of AI-authored books. Use the search bar to find specific titles or topics.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery} 
              />
            </div>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.filename} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-bg-muted text-text-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-text-main">No books found</h3>
              <p className="text-text-muted">
                Try adjusting your search terms to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
