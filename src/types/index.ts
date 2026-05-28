export interface Book {
  title: string;
  filename: string;
  url: string; // Raw GitHub URL
  size: number;
  updatedAt?: string;
}

export interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: 'file' | 'dir';
  download_url: string;
}
