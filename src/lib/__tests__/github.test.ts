<<<<<<< HEAD
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
=======
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchBooks } from '../github';

describe('fetchBooks', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should correctly parse subdirectory contents and build book list', async () => {
    const mockRootContents = [
      { name: 'book1-dir', path: 'book1-dir', type: 'dir' },
      { name: 'book2-dir', path: 'book2-dir', type: 'dir' },
      { name: 'readme.md', path: 'readme.md', type: 'file' },
    ];

    const mockBook1Contents = [
      { name: 'The Great Gatsby.pdf', path: 'book1-dir/The Great Gatsby.pdf', type: 'file', size: 1000, download_url: 'https://github.com/download/gatsby.pdf' },
      { name: 'notes.txt', path: 'book1-dir/notes.txt', type: 'file', size: 100 },
    ];

    const mockBook2Contents = [
      { name: '1984_novel.pdf', path: 'book2-dir/1984_novel.pdf', type: 'file', size: 2000, download_url: 'https://github.com/download/1984.pdf' },
    ];

    vi.mocked(fetch).mockImplementation((url: string) => {
      if (url.endsWith('/contents')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRootContents),
        } as Response);
      }
      if (url.endsWith('/contents/book1-dir')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBook1Contents),
        } as Response);
      }
      if (url.endsWith('/contents/book2-dir')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBook2Contents),
        } as Response);
      }
      return Promise.resolve({ ok: false, status: 404 } as Response);
    });

    const books = await fetchBooks();

    expect(books).toHaveLength(2);
    expect(books[0]).toEqual({
      title: 'The Great Gatsby',
      filename: 'The Great Gatsby.pdf',
      url: 'https://github.com/download/gatsby.pdf',
      size: 1000,
      updatedAt: '',
    });
    expect(books[1]).toEqual({
      title: '1984 novel',
      filename: '1984_novel.pdf',
      url: 'https://github.com/download/1984.pdf',
      size: 2000,
>>>>>>> qa/replace-playwright-with-vitest
      updatedAt: '',
    });
  });

<<<<<<< HEAD
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
=======
  it('should throw an error when root fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response);

    await expect(fetchBooks()).rejects.toThrow('GitHub API error: 500 Internal Server Error');
  });

  it('should skip directories that fail to fetch', async () => {
    const mockRootContents = [
      { name: 'book1-dir', path: 'book1-dir', type: 'dir' },
      { name: 'book2-dir', path: 'book2-dir', type: 'dir' },
    ];

    const mockBook1Contents = [
      { name: 'book1.pdf', path: 'book1-dir/book1.pdf', type: 'file', size: 100, download_url: 'url1' },
    ];

    vi.mocked(fetch).mockImplementation((url: string) => {
      if (url.endsWith('/contents')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRootContents),
        } as Response);
      }
      if (url.endsWith('/contents/book1-dir')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBook1Contents),
        } as Response);
      }
      if (url.endsWith('/contents/book2-dir')) {
        return Promise.resolve({
          ok: false,
          status: 404,
        } as Response);
      }
      return Promise.resolve({ ok: false } as Response);
    });

    const books = await fetchBooks();
    expect(books).toHaveLength(1);
    expect(books[0].filename).toBe('book1.pdf');
>>>>>>> qa/replace-playwright-with-vitest
  });
});
