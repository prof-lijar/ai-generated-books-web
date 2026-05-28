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
    // Fetch repository contents
    const response = await fetch(`${BASE_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const contents = (await response.json()) as GitHubContent[];

    // Filter for PDF files and map to Book interface
    const books = contents
      .filter((item) => item.name.endsWith('.pdf'))
      .map((item) => {
        return {
          title: item.name.replace('.pdf', '').replace(/_/g, ' '),
          filename: item.name,
          url: `${RAW_URL}/${GITHUB_OWNER}/${GITHUB_REPO}/main/${item.path}`,
          size: item.size,
          updatedAt: '', 
        };
      });

    return books;
  } catch (error) {
    console.error('Error fetching books from GitHub:', error);
    throw error;
  }
}
