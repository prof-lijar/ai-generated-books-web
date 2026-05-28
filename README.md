# AI-Generated Books Web Platform

A production-ready website for hosting and reading AI-generated books.

## Features
- Browse a library of books sourced from the `prof-lijar/ai-generated-books` repository.
- In-browser PDF viewer with navigation, zoom, and download capabilities.
- Search and filter functionality for the book library.
- Responsive design for mobile and desktop.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Rendering**: `react-pdf-viewer` / `pdfjs-dist`
- **Deployment**: Vercel

## Local Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ai-generated-books-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel (Recommended)
This project is optimized for Vercel. 
1. Push your code to GitHub.
2. Import the project into the Vercel Dashboard.
3. Vercel will automatically detect the Next.js framework and deploy the application.

### CI/CD Pipeline
The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that automatically runs on every push and pull request to the `main` branch. It performs:
- Dependency installation (`npm ci`)
- Linting (`npm run lint`)
- Production build (`npm run build`)

## Project Structure
- `/src/app`: Next.js App Router pages and API routes.
- `/src/components`: Reusable UI components.
- `/src/lib`: Utility functions and API clients.
- `/src/types`: TypeScript type definitions.
- `/docs`: Project documentation and architecture.
