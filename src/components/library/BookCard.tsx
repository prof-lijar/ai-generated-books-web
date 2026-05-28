'use client';

import React from 'react';
import Link from 'next/link';
import { Book } from '@/types';

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="group relative p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col h-full">
      <div className="flex-1">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25v10m0-10v3m0 0h3m-0 0h-3m0 0H8m4 0h3m0 0v3m0 0H8m4 0h3" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25v10m0-10v3m0 0h3m0 0h-3m0 0H8m4 0h3m0 0v3m0 0H8m4 0h3" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25v10" />
          </svg>
          {/* Simplified book icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25v10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {(book.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
      <Link
        href={`/books/${encodeURIComponent(book.filename)}`}
        className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Read Book
      </Link>
    </div>
  );
};
