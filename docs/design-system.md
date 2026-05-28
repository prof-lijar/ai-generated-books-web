# Design System - AI Generated Books Web Platform

## Brand Identity
The visual identity is designed to feel like a "Modern Digital Library": clean, professional, accessible, and focused on readability. It uses a sophisticated palette of deep indigos and slates to evoke trust and intelligence.

## Color Palette

### Brand Colors
| Token | Light Mode | Dark Mode | Description |
| :--- | :--- | :--- | :--- |
| `--color-primary` | `#4f46e5` (Indigo 600) | `#818cf8` (Indigo 400) | Main brand color for primary actions |
| `--color-primary-hover` | `#4338ca` (Indigo 700) | `#6366f1` (Indigo 500) | Primary action hover state |
| `--color-secondary` | `#475569` (Slate 600) | `#94a3b8` (Slate 400) | Secondary actions and accents |
| `--color-accent` | `#f59e0b` (Amber 500) | `#fbbf24` (Amber 400) | Highlights and special callouts |

### Neutral Palette
| Token | Light Mode | Dark Mode | Description |
| :--- | :--- | :--- | :--- |
| `--color-bg-main` | `#f8fafc` (Slate 50) | `#0f172a` (Slate 900) | Page background |
| `--color-bg-surface` | `#ffffff` (White) | `#1e293b` (Slate 800) | Card, modal, and surface background |
| `--color-bg-muted` | `#f1f5f9` (Slate 100) | `#334155` (Slate 700) | Muted backgrounds, input fills |
| `--color-text-main` | `#0f172a` (Slate 900) | `#f1f5f9` (Slate 100) | Primary headings and body text |
| `--color-text-muted` | `#64748b` (Slate 500) | `#94a3b8` (Slate 400) | Secondary and helper text |
| `--color-border` | `#e2e8f0` (Slate 200) | `#334155` (Slate 700) | Subtle dividers and borders |

## Typography

### Font Families
- **Sans**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`
- **Mono**: `JetBrains Mono`, `ui-monospace`, `SFMono-Regular`, `monospace`

### Type Scale
| Level | Size | Weight | Line Height |
| :--- | :--- | :--- | :--- |
| `text-xs` | 0.75rem (12px) | Regular | 1rem |
| `text-sm` | 0.875rem (14px) | Regular | 1.25rem |
| `text-base` | 1rem (16px) | Regular | 1.5rem |
| `text-lg` | 1.125rem (18px) | Medium | 1.75rem |
| `text-xl` | 1.25rem (20px) | SemiBold | 1.75rem |
| `text-2xl` | 1.5rem (24px) | SemiBold | 2rem |
| `text-3xl` | 1.875rem (30px) | Bold | 2.25rem |
| `text-4xl` | 2.25rem (36px) | Bold | 2.5rem |

## Spacing & Layout

### Spacing Scale (4px base)
- `1`: 4px
- `2`: 8px
- `3`: 12px
- `4`: 16px
- `6`: 24px
- `8`: 32px
- `12`: 48px
- `16`: 64px

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## UI Tokens

### Border Radius
- `radius-sm`: 4px
- `radius-md`: 8px
- `radius-lg`: 12px
- `radius-xl`: 16px
- `radius-full`: 9999px

### Shadows
- `shadow-sm`: 0 1px 2px 0 rgb(0 0 0 / 0.05)
- `shadow-md`: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
- `shadow-lg`: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
- `shadow-xl`: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)

## Accessibility Standards
- **Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text (WCAG 2.1 AA).
- **Focus States**: All interactive elements must have a visible `:focus-visible` ring using `--color-primary`.
- **Semantic HTML**: Use appropriate tags (`main`, `nav`, `section`, `article`, `header`, `footer`).
