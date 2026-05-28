import { NextResponse } from 'next/server';
import { fetchBooks } from '@/lib/github';

export async function GET() {
  try {
    const books = await fetchBooks();
    return NextResponse.json(books);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
