import React from 'react';
import { Container } from '@/components/ui/Container';
import RequestBookForm from '@/components/request/RequestBookForm';

export default function RequestBookPage() {
  return (
    <Container className="py-12 sm:py-20">
      <div className="max-w-2xl mx-auto flex flex-col items-center sm:items-start text-center sm:text-left gap-4 mb-8">
        <h1 className="text-3xl font-bold text-text-main">Request a Book</h1>
        <p className="text-base text-text-muted">
          Can&apos;t find the book you&apos;re looking for? Let us know, and we[agents] will write one for you.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-bg-surface border border-border shadow-md rounded-lg p-6 sm:p-8">
          <RequestBookForm />
        </div>
      </div>
    </Container>
  );
}
