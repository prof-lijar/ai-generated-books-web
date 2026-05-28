import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchBooks } from '../github';

describe('fetchBooks', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should correctly parse subdirectory contents and build PDF URLs', async () => {
    const mockRootContents = [
      { type: 'dir', path: 'book1', name: 'book1' },
      { type: 'dir', path: 'book2', name: 'book2' },
      { type: 'file', path: 'README.md', name: 'README.md' },
    ];

    const mockBook1Contents = [
      { name: 'The Great AI.pdf', path: 'book1/The Great AI.pdf', type: 'file', size: 1000, download_url: 'https://github.com/download/1' },
      { name: 'notes.txt', path: 'book1/notes.txt', type: 'file', size: 100, download_url: 'https://github.com/download/2' },
    ];

    const mockBook2Contents = [
      { name: 'AI Mastery.pdf', path: 'book2/AI Mastery.pdf', type: 'file', size: 2000, download_url: 'https://github.com/download/3' },
    ];

    (fetch as any).mockImplementation((url: string) => {
      if (url.endsWith('/contents')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRootContents),
        });
      }
      if (url.endsWith('/contents/book1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBook1Contents),
        });
      }
      if (url.endsWith('/contents/book2')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBook2Contents),
        });
      }
      return Promise.resolve({ ok: false, status: 404 });
    });

    const books = await fetchBooks();

    expect(books).toHaveLength(2);
    expect(books[0]).toEqual({
      title: 'The Great AI',
      filename: 'The Great AI.pdf',
      url: 'https://github.com/download/1',
      size: 1000,
      updatedAt: '',
    });
    expect(books[1]).toEqual({
      title: 'AI Mastery',
      filename: 'AI Mastery.pdf',
      url: 'https://github.com/download/3',
      size: 2000,
      updatedAt: '',
    });
  });

  it('should throw an error if root API call fails', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(fetchBooks()).rejects.toThrow('GitHub API error: 500 Internal Server Error');
  });

  it('should continue processing if one subdirectory call fails', async () => {
    const mockRootContents = [
      { type: 'dir', path: 'book1', name: 'book1' },
      { type: 'dir', path: 'book2', name: 'book2' },
    ];

    const mockBook2Contents = [
      { name: 'AI Mastery.pdf', path: 'book2/AI Mastery.pdf', type: 'file', size: 2000, download_url: 'https://github.com/download/3' },
    ];

    (fetch as any).mockImplementation((url: string) => {
      if (url.endsWith('/contents')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRootContents),
        });
      }
      if (url.endsWith('/contents/book1')) {
        return Promise.resolve({ ok: false, status: 404 });
      }
      if (url.endsWith('/contents/book2')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBook2Contents),
        });
      }
      return Promise.resolve({ ok: false, status: 404 });
    });

    const books = await fetchBooks();
    expect(books).toHaveLength(1);
    expect(books[0].filename).toBe('AI Mastery.pdf');
  });
});
