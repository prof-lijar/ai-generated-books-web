# AI-Generated Books Web Platform

A production-ready web application that allows users to browse and read AI-generated books hosted in the [prof-lijar/ai-generated-books](https://github.com/prof-lijar/ai-generated-books) repository.

## 🚀 Features

- **Library View**: Browse all available AI-generated books with search and filtering.
- **In-Browser PDF Reader**: A professional PDF viewing experience with:
  - Next/Previous page navigation
  - Zoom in/out
  - Fit to width
  - Direct download
  - Open in new tab
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Dynamic Data**: Fetches book lists and content directly from the source GitHub repository.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API**: [GitHub REST API](https://docs.github.com/en/rest)
- **Deployment**: Optimized for [Vercel](https://vercel.com/)

## ⚙️ Setup & Installation

### Prerequisites

- Node.js 18.x or later
- npm (or yarn/pnpm)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/prof-lijar/ai-generated-books-web.git
   cd ai-generated-books-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration (Optional)**:
   Create a `.env.local` file in the root directory to increase GitHub API rate limits:
   ```env
   GITHUB_TOKEN=your_personal_access_token_here
   ```
   *Note: The app works without a token, but you may hit rate limits if you browse many books quickly.*

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub.
2. Import the project into the [Vercel Dashboard](https://vercel.com/new).
3. (Optional) Add the `GITHUB_TOKEN` environment variable in the Vercel project settings.
4. Deploy.

### Other Platforms

Since this is a standard Next.js application, it can be deployed to any platform supporting Node.js or static exports (Netlify, Railway, Fly.io, etc.).

## 🤝 Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
