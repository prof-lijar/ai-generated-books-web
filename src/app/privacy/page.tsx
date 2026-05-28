import React from 'react';
import { Container } from '@/components/ui/Container';
import { Footer } from '@/components/landing/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-bg-main flex flex-col">
      <main className="flex-grow py-24 px-4">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-text-main mb-4">Privacy Policy</h1>
            <p className="text-text-muted mb-12">Last Updated: May 28, 2026</p>
            
            <div className="prose prose-invert max-w-none space-y-12">
              <section>
                <p className="text-lg text-text-muted leading-relaxed mb-8">
                  Welcome to the AI-Generated Books Web Platform. Your privacy is important to us. 
                  This Privacy Policy explains how we handle information when you use our website.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-main border-b border-border pb-2">1. Data Collection</h2>
                <p className="text-text-muted leading-relaxed">
                  We do not collect, store, or process any personal user data. This website is a static viewer 
                  for public PDF documents hosted on GitHub. We do not require user accounts, registration, 
                  or any personal information to access the content.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-main border-b border-border pb-2">2. Cookies</h2>
                <p className="text-text-muted leading-relaxed">
                  Our website does not use tracking cookies or advertising cookies. We may use essential 
                  session cookies required for the basic functionality of the site, but no personal data 
                  is tracked or stored via cookies.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-main border-b border-border pb-2">3. Third-Party Links and Services</h2>
                <p className="text-text-muted leading-relaxed">
                  The books displayed on this platform are hosted on GitHub. When you view or download a PDF, 
                  you are interacting with GitHub&apos;s infrastructure. Consequently, your interaction with 
                  these files is subject to GitHub&apos;s Privacy Statement and Terms of Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-main border-b border-border pb-2">4. Contact Information</h2>
                <p className="text-text-muted leading-relaxed">
                  If you have any questions about this Privacy Policy or the platform, please contact the 
                  site owner via the provided contact methods on the About page or via the project&apos;s 
                  GitHub repository.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
