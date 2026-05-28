# System Architecture: AI-Generated Books Web Platform

## 1. Overview
The platform is a Next.js application that serves as a frontend for the `prof-lijar/ai-generated-books` GitHub repository. It fetches a list of PDF books via the GitHub API and provides a responsive library and a PDF reader.

## 2. Technical Architecture
### 2.1 High-Level Data Flow
1. **Discovery**: The `Library Page` calls a server-side function (or API route) that queries the GitHub REST API.
2. **Listing**: The GitHub API returns the contents of the books directory. The app filters for `.pdf` files.
3. **Navigation**: The user selects a book, which navigates to `/books/[filename]`.
4. **Viewing**: The `Reader Page` constructs the raw GitHub URL (`https://raw.githubusercontent.com/...`) and passes it to the PDF viewer component.

### 2.2 API Strategy
- **Endpoint**: `GET /repos/prof-lijar/ai-generated-books/contents/`
- **Authentication**: Use a `GITHUB_TOKEN` stored in environment variables to increase rate limits (from 60 to 5,000 requests per hour).
- **Caching**: Implement Next.js `fetch` caching or `revalidate` tags to avoid hitting the API on every single page load.

### 2.3 Component Hierarchy
- `app/layout.tsx`: Global layout, navigation, and footer.
- `app/page.tsx` (Library):
  - `SearchBar`: Input for filtering books by title.
  - `BookGrid`: Grid layout for displaying book cards.
  - `BookCard`: Displays book title and link to the reader.
- `app/books/[slug]/page.tsx` (Reader):
  - `PDFViewer`: Component wrapping the PDF rendering logic.
  - `ReaderControls`: Toolbar for zoom, page navigation, and download.

### 2.4 PDF Rendering Strategy
To balance "production-ready" and "simple/fast to ship":
- **Primary Approach**: Use an embedded PDF viewer (browser-native) for initial delivery.
- **Advanced Approach**: Integrate `react-pdf-viewer` (powered by PDF.js) to provide custom controls (zoom, next/prev) as specified in requirements.
- **Interface**: Create a `PDFViewer` wrapper component so the underlying rendering engine can be swapped without affecting page logic.

## 3. Data Model
### Book Interface
```typescript
interface Book {
  title: string;
  filename: string;
  url: string; // Raw GitHub URL
  size: number;
  updatedAt: string;
}
```

## 4. Project Structure
```text
src/
├── app/
│   ├── api/            # API routes (e.g., /api/books)
│   ├── books/          # Reader pages ([slug])
│   └── page.tsx        # Library page
├── components/
│   ├── ui/             # Basic UI elements (Button, Input)
│   ├── library/        # Library-specific components (BookCard, SearchBar)
│   └── reader/         # Reader-specific components (PDFViewer, Controls)
├── lib/
│   ├── github.ts       # GitHub API client
│   └── utils.ts        # Helper functions
└── types/
    └── index.ts        # TypeScript type definitions
```

## 5. Environment Variables
- `GITHUB_TOKEN`: Personal Access Token for GitHub API rate limiting.
