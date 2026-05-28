import { describe, it, expect, vi } from 'vitest';
import { fetchBooks } from '../github';

// Mock the global fetch API
global.fetch = vi.fn();

describe('fetchBooks', () => {
  it('should correctly parse subdirectory contents and build PDF URLs', async () => {
    const mockGitHubContent = [
      {
        type: 'dir',
        path: 'book1',
        name: 'book1',
      },
      {
        type: 'file',
        path: 'book1/test.pdf',
        name: 'test.pdf',
        download_url: 'https://github.com/download/test.pdf',
        size: 1234,
      },
    ];

    const mockDirContent = [
      {
        type: 'file',
        path: 'book1/test.pdf',
        name: 'test.pdf',
        download_url: 'https://github.com/download/test.pdf',
        size: 1234,
      },
    ];

    // First call to fetch root contents, second call to fetch directory contents
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockGitHubContent,
    });
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockDirContent,
    });

    const books = await fetchBooks();
    
    expect(books).toHaveLength(1);
    expect(books[0]).toEqual({
      title: 'test',
      filename: 'test.pdf',
      url: 'https://github.com/download/test.pdf',
      size: 1234,
      updatedAt: '',
    });
  });

  it('should handle missing download_url by using raw content URL', async () => {
    const mockGitHubContent = [
      {
        type: 'dir',
        path: 'book1',
        name: 'book1',
      },
    ];

    const mockDirContent = [
      {
        type: 'file',
        path: 'book1/test.pdf',
        name: 'test.pdf',
        download_url: '',
        size: 1234,
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockGitHubContent,
    });
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockDirContent,
    });

    const books = await fetchBooks();
    
    expect(books[0].url).toBe('https://raw.githubusercontent.com/prof-lijar/ai-generated-books/main/book1/test.pdf');
  });

  it('should throw an error if the root fetch fails', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchBooks()).rejects.toThrow('GitHub API error: 404 Not Found');
  });
});
