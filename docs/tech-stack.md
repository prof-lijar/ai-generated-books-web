# Tech Stack: AI-Generated Books Web Platform

## Chosen Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Rendering**: `react-pdf-viewer` (powered by PDF.js) or native browser PDF embedding for core functionality.
- **Data Source**: GitHub REST API (to fetch the list of PDF files from the `prof-lijar/ai-generated-books` repo)
- **Deployment**: Vercel

## Rationales
- **Next.js**: Provides an excellent balance of SEO (for the library page), fast routing (for individual books), and a seamless deployment pipeline via Vercel.
- **TypeScript**: Ensures type safety when handling API responses from GitHub and managing book metadata.
- **Tailwind CSS**: Allows for rapid development of a responsive, modern UI without writing extensive custom CSS.
- **GitHub API**: Since the source of truth is a GitHub repository, using the GitHub API is the most direct way to keep the library in sync without needing a separate database or backend.
- **Vercel**: Zero-config deployment for Next.js, providing high availability and global CDN for the frontend.

## Architecture Overview
1. **Client**: Next.js frontend.
2. **Data Flow**: 
   - `GET /api/books` (or client-side fetch) $\rightarrow$ GitHub API $\rightarrow$ List of PDF files.
   - `Reader Page` $\rightarrow$ Fetch PDF from GitHub Raw URL $\rightarrow$ Render via PDF Viewer.
3. **Hosting**: Vercel.
