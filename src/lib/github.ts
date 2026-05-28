import { Book, GitHubContent } from '@/types';

const GITHUB_OWNER = 'prof-lijar';
const GITHUB_REPO = 'ai-generated-books';
const BASE_URL = 'https://api.github.com';
const RAW_URL = 'https://raw.githubusercontent.com';

export async function fetchBooks(): Promise<Book[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github+json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const contents = (await response.json()) as GitHubContent[];
    const dirs = contents.filter((item) => item.type === 'dir');

    const books: Book[] = [];

    for (const dir of dirs) {
      const dirResponse = await fetch(
        `${BASE_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${dir.path}`,
        { headers, next: { revalidate: 3600 } },
      );

      if (!dirResponse.ok) continue;

      const dirContents = (await dirResponse.json()) as GitHubContent[];
      const pdfs = dirContents.filter((item) => item.name.endsWith('.pdf'));

      for (const pdf of pdfs) {
        books.push({
          title: pdf.name.replace('.pdf', '').replace(/[-_]/g, ' '),
          filename: pdf.name,
          url: `${RAW_URL}/${GITHUB_OWNER}/${GITHUB_REPO}/main/${pdf.path}`,
          size: pdf.size,
          updatedAt: '',
        });
      }
    }

    return books;
  } catch (error) {
    console.error('Error fetching books from GitHub:', error);
    throw error;
  }
}
