# Privacy Policy

**Last Updated:** May 28, 2026

Welcome to the AI-Generated Books Web Platform. Your privacy is important to us. This Privacy Policy explains how we handle information when you use our website.

## 1. Data Collection
We do not collect, store, or process any personal user data. This website is a static viewer for public PDF documents hosted on GitHub. We do not require user accounts, registration, or any personal information to access the content.

## 2. Cookies
Our website does not use tracking cookies or advertising cookies. We may use essential session cookies required for the basic functionality of the site, but no personal data is tracked or stored via cookies.

## 3. Third-Party Links and Services
The books displayed on this platform are hosted on GitHub. When you view or download a PDF, you are interacting with GitHub's infrastructure. Consequently, your interaction with these files is subject to GitHub's Privacy Statement and Terms of Service.

## 4. Contact Information
If you have any questions about this Privacy Policy or the platform, please contact the site owner via the provided contact methods on the About page or via the project's GitHub repository.

---

## Layout & Design Specifications

To ensure consistency with the platform's design system, the Privacy Policy page should be implemented as follows:

### 1. Structure
- **Wrapper:** Use the standard `Layout` component (Navbar + Footer).
- **Container:** Wrap the content in the `Container` component to maintain responsive margins and a maximum width.
- **Content Area:** A single-column layout centered on the page.

### 2. Typography & Visuals
- **Main Heading (`h1`):** Use the primary brand color and the `text-4xl` (or equivalent) scale.
- **Section Headings (`h2`):** Use `text-2xl` with a subtle bottom border or additional top margin (`mt-8`) to clearly separate sections.
- **Body Text:** Use the standard body font size and line height for optimal readability.
- **Contrast:** Ensure text meets WCAG 2.1 AA contrast ratios against the background.

### 3. Responsive Strategy
- **Mobile:** Single column, standard `px-4` padding.
- **Desktop:** Max-width constrained (e.g., `max-w-3xl`) to prevent line lengths from becoming too long, which improves readability.

### 4. Component Mapping
- **Page Template:** `src/app/privacy-policy/page.tsx` (or similar route).
- **Components to use:** `Container`, `Typography` (if available), `Layout`.
