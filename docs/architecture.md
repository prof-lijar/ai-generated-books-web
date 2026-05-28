# System Architecture: AI-Generated Books Web Platform

## 1. Overview
The platform is a Next.js application that serves as a frontend for the `prof-lijar/ai-generated-books` GitHub repository. It fetches a list of PDF books via the GitHub API and provides a responsive library and a PDF reader.

## 2. Technical Architecture
### 2.1 High-Level Data Flow
1. **Discovery**: The `Library Page` calls a server-side function (or API route) that queries the GitHub REST API.
2. **Listing**: The GitHub API returns the contents of the books directory. The app filters for `.pdf` files.
3. **Navigation**: The user selects a book, which navigates to `/books/[filename]`.
4. **Viewing**: The `Reader Page` constructs the raw GitHub URL (`https://raw.githubusercontent.com/...`) and passes it to the PDF viewer component.
5. **Requesting**: The `Request Book Page` collects user input and sends it to a Telegram channel via a Telegram Bot API.

### 2.2 API Strategy
- **GitHub API**: `GET /repos/prof-lijar/ai-generated-books/contents/`
- **Telegram API**: `POST /bot<TOKEN>/sendMessage`
- **Authentication**: 
  - `GITHUB_TOKEN` for GitHub API rate limits.
  - `TELEGRAM_BOT_TOKEN` for sending requests.
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
- `app/request-book/page.tsx` (Request):
  - `RequestBookForm`: Form to collect book title and description.

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

### BookRequest Interface
```typescript
interface BookRequest {
  title: string;
  description: string;
}
```

## 4. Project Structure
```text
src/
├── app/
│   ├── api/            # API routes (e.g., /api/books, /api/request-book)
│   ├── books/          # Reader pages ([slug])
│   ├── request-book/   # Book request page
│   └── page.tsx        # Library page
├── components/
│   ├── ui/             # Basic UI elements (Button, Input)
│   ├── library/        # Library-specific components (BookCard, SearchBar)
│   ├── reader/         # Reader-specific components (PDFViewer, Controls)
│   └── request/        # Request-specific components (RequestBookForm)
├── lib/
│   ├── github.ts       # GitHub API client
│   ├── telegram.ts     # Telegram API client
│   └── utils.ts        # Helper functions
└── types/
    └── index.ts        # TypeScript type definitions
```

## 5. Environment Variables
- `GITHUB_TOKEN`: Personal Access Token for GitHub API rate limiting.
- `TELEGRAM_BOT_TOKEN`: Token for the Telegram Bot to send requests.
- `TELEGRAM_CHAT_ID`: The ID of the channel/group where requests should be sent.
