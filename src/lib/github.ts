import { Book, GitHubContent } from '@/types';

const GITHUB_OWNER = 'prof-lijar';
const GITHUB_REPO = 'ai-generated-books';
const BASE_URL = 'https://api.github.com';

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
    
    if (!Array.isArray(contents)) {
      throw new Error('GitHub API root contents is not an array');
    }

    const dirs = contents.filter((item) => item.type === 'dir');
    const books: Book[] = [];

    for (const dir of dirs) {
      const dirResponse = await fetch(
        `${BASE_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${dir.path}`,
        { headers, next: { revalidate: 3600 } },
      );

      if (!dirResponse.ok) {
        console.warn(`Could not fetch contents for directory ${dir.path}: ${dirResponse.status}`);
        continue;
      }

      const dirContents = (await dirResponse.json()) as GitHubContent[];
      
      if (!Array.isArray(dirContents)) {
        console.warn(`Contents for directory ${dir.path} is not an array`);
        continue;
      }

      const pdfs = dirContents.filter((item) => item.name.toLowerCase().endsWith('.pdf'));

      for (const pdf of pdfs) {
        books.push({
          title: pdf.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' '),
          filename: pdf.name,
          url: pdf.download_url || `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${pdf.path}`,
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
