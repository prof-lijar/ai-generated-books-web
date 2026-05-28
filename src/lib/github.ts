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
    // Fetch repository root contents
    const rootResponse = await fetch(`${BASE_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!rootResponse.ok) {
      throw new Error(`GitHub API error: ${rootResponse.status} ${rootResponse.statusText}`);
    }

    const rootContents = (await rootResponse.json()) as GitHubContent[];
    
    // We look for directories at the root
    const directories = rootContents.filter((item) => item.type === 'dir');

    const allBooks: Book[] = [];

    // Iterate through each directory to find PDF files
    // Use Promise.all to fetch directory contents in parallel
    await Promise.all(
      directories.map(async (dir) => {
        try {
          const dirResponse = await fetch(`${BASE_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${dir.path}`, {
            headers,
            next: { revalidate: 3600 },
          });

          if (!dirResponse.ok) {
            console.warn(`Could not fetch contents of directory ${dir.path}: ${dirResponse.status}`);
            return;
          }

          const dirContents = (await dirResponse.json()) as GitHubContent[];
          const pdfFiles = dirContents.filter((item) => item.name.endsWith('.pdf'));

          for (const pdf of pdfFiles) {
            allBooks.push({
              title: pdf.name.replace('.pdf', '').replace(/_/g, ' '),
              filename: pdf.name,
              url: `${RAW_URL}/${GITHUB_OWNER}/${GITHUB_REPO}/main/${pdf.path}`,
              size: pdf.size,
              updatedAt: '', 
            });
          }
        } catch (error) {
          console.error(`Error fetching contents of directory ${dir.path}:`, error);
        }
      })
    );

    return allBooks;
  } catch (error) {
    console.error('Error fetching books from GitHub:', error);
    throw error;
  }
}
