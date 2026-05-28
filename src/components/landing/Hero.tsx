'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface HeroProps {
  onScrollToLibrary?: () => void;
}

export const Hero = ({ onScrollToLibrary }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-bg-main pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-50 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            The Future of Reading
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-text-main mb-6 tracking-tight leading-tight">
            Explore the Boundless <span className="text-primary">AI-Generated</span> Library
          </h1>
          
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            Dive into a curated collection of books authored by artificial intelligence. 
            From technical guides to imaginative narratives, discover the potential of AI storytelling.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={onScrollToLibrary}
              className="w-full sm:w-auto px-8 py-4 text-lg"
            >
              Browse Library
            </Button>
            <Link href="/request" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto px-8 py-4 text-lg"
              >
                Request a Book
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
