import React from 'react';
import { Container } from '@/components/ui/Container';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg-main py-24 px-4">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-text-main mb-6">About AI Books</h1>
          <p className="text-lg text-text-muted mb-8 leading-relaxed">
            The AI-Generated Books Platform is a digital library dedicated to exploring the 
            intersection of artificial intelligence and literature. Our goal is to provide 
            a public space where anyone can browse and read books created by large language models.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
            <div className="p-6 bg-bg-surface border border-border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-text-main mb-3">Our Mission</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                To showcase the current capabilities of AI in long-form storytelling 
                and provide a transparent look at how machine creativity evolves.
              </p>
            </div>
            <div className="p-6 bg-bg-surface border border-border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-text-main mb-3">The Process</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Books are generated using advanced AI models, curated for quality, 
                and hosted on this platform for public reading and analysis.
              </p>
            </div>
            <div className="p-6 bg-bg-surface border border-border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-text-main mb-3">Open Source</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                The project is open-source. You can explore the source code and 
                contribute to the platform&apos;s development on GitHub.
              </p>
            </div>
          </div>
          <div className="mt-12 p-8 bg-primary/10 border border-primary/20 rounded-xl text-center">
            <p className="text-text-main font-medium">
              Interested in contributing? Visit our <a href="https://github.com/prof-lijar/ai-generated-books" className="text-primary hover:underline font-bold">GitHub repository</a>.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
