# Product Specification: AI-Generated Books Web Platform

## 1. Core Features

### 1.1 Book Library (Home Page)
- **Book Listing**: Display a grid of available books fetched from the `prof-lijar/ai-generated-books` repository.
- **Book Metadata**: Each book card should show the title and (if available) a thumbnail or icon.
- **Search/Filter**: A search bar to filter books by title or filename in real-time.
- **Loading State**: A skeleton or spinner while the book list is being fetched.
- **Empty State**: A friendly message when no books match the search criteria.

### 1.2 Book Reader (Detail Page)
- **Embedded PDF Viewer**: A dedicated page for each book that renders the PDF.
- **PDF Controls**:
    - Next/Previous page navigation.
    - Zoom In/Out.
    - Fit to Width.
    - Download PDF button.
    - "Open in New Tab" button.
- **Breadcrumbs**: A way to easily return to the library page.

### 1.3 System Integration
- **Source**: The app must dynamically read the file structure of `https://github.com/prof-lijar/ai-generated-books` to list PDFs.
- **PDF Serving**: PDFs should be served via GitHub's raw content URLs or a proxy to ensure they load reliably.

## 2. User Stories
- As a visitor, I want to see a list of all AI-generated books so I can choose what to read.
- As a visitor, I want to search for a specific book by title so I don't have to scroll through the list.
- As a reader, I want a smooth PDF viewing experience in my browser so I don't have to download files to my local drive.
- As a mobile user, I want the library and reader to be responsive so I can read on my phone.

## 3. Acceptance Criteria
- [ ] Library page loads and lists all PDF files from the source repo.
- [ ] Search bar filters the list of books correctly.
- [ ] Clicking a book opens the reader page.
- [ ] The PDF viewer provides zoom and navigation controls.
- [ ] The UI is responsive across mobile, tablet, and desktop.
- [ ] Error states are handled (e.g., book not found, network error).
