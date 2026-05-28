'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useRouter } from 'next/navigation';

export default function RequestBookForm() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    description: '',
  });
  const [errors, setErrors] = useState<{ title?: string; email?: string }>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage('');

    const newErrors: { title?: string; email?: string } = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Book title is required';
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = 'A valid email address is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/request-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      setStatus('success');
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || 'Something went wrong. Please try again later.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center gap-4 p-8">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-bold text-text-main">Request Sent!</h2>
        <p className="text-text-muted max-w-md">
          Thank you for your suggestion. We&apos;ve sent your request to our team via Telegram.
        </p>
        <Button 
          variant="secondary" 
          onClick={() => router.push('/')}
          className="mt-4"
        >
          Back to Library
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Book Title"
        placeholder="e.g., The History of Quantum Computing"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
        disabled={status === 'loading'}
        required
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="e.g., user@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        disabled={status === 'loading'}
        required
      />
      <Textarea
        label="Additional Details (Optional)"
        placeholder="Tell us more about the specific topics, style, or focus you'd like the book to have..."
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        disabled={status === 'loading'}
      />
      
      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {errorMessage}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full sm:w-max"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Submit Request'
        )}
      </Button>
    </form>
  );
}
