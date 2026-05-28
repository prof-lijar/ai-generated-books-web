import type { Config } from \"tailwindcss\";

const config: Config = {
  content: [
    \"./src/pages/**/*.{js,ts,jsx,tsx,mdx}\",
    \"./src/components/**/*.{js,ts,jsx,tsx,mdx}\",
    \"./src/app/**/*.{js,ts,jsx,tsx,mdx}\",
  ],
  theme: {
    extend: {
      colors: {
        primary: \"var(--color-primary)\",
        \"primary-hover\": \"var(--color-primary-hover)\",
        secondary: \"var(--color-secondary)\",
        accent: \"var(--color-accent)\",
        bg: {
          main: \"var(--color-bg-main)\",
          surface: \"var(--color-bg-surface)\",
          muted: \"var(--color-bg-muted)\",
        },
        text: {
          main: \"var(--color-text-main)\",
          muted: \"var(--color-text-muted)\",
        },
        border: \"var(--color-border)\",
      },
      borderRadius: {
        sm: \"var(--radius-sm)\",
        md: \"var(--radius-md)\",
        lg: \"var(--radius-lg)\",
        xl: \"var(--radius-xl)\",
        full: \"var(--radius-full)\",
      },
      boxShadow: {
        sm: \"var(--shadow-sm)\",
        md: \"var(--shadow-md)\",
        lg: \"var(--shadow-lg)\",
        xl: \"var(--shadow-xl)\",
      },
    },
  },
  plugins: [],
};
export default config;
