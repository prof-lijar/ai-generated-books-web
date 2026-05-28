# Design Specification: Request a Book Page

## Overview
The 'Request a Book' page provides a simple interface for users to suggest new books to be added to the AI-generated library. The goal is to minimize friction while ensuring enough information is gathered for the request.

## Layout & Structure
- **Container**: Centered layout using a max-width container (`max-w-2xl` or ~672px).
- **Composition**:
  - **Header Section**:
    - `<h1>`: \"Request a Book\" (text-3xl, bold, text-main).
    - `<p>`: \"Can't find the book you're looking for? Let us know, and we'll try to generate it for you.\" (text-base, text-muted).
  - **Form Card**:
    - Background: `--color-bg-surface`.
    - Border: 1px solid `--color-border`.
    - Shadow: `shadow-md`.
    - Padding: `p-6` (24px) on mobile, `p-8` (32px) on desktop.
    - Radius: `radius-lg`.

## Form Components

### 1. Book Title Field (Required)
- **Label**: \"Book Title\" (text-sm, semi-bold, text-main).
- **Input**:
  - Type: Text.
  - Placeholder: \"e.g., The History of Quantum Computing\".
  - Styling: `text-base`, `p-3`, border `--color-border`, bg `--color-bg-muted` (optional) or white.
  - Focus State: 2px solid `--color-primary`, ring offset.
  - Validation: Required field. Show error text \"Book title is required\" in red beneath the input if empty on submit.

### 2. Email Address Field (Required)
- **Label**: \"Email Address\" (text-sm, semi-bold, text-main).
- **Input**:
  - Type: Email.
  - Placeholder: \"e.g., user@example.com\".
  - Styling: `text-base`, `p-3`, border `--color-border`, bg `--color-bg-muted` (optional) or white.
  - Focus State: 2px solid `--color-primary`, ring offset.
  - Validation: Required field. Must be a valid email format. Show error text \"A valid email address is required\" in red beneath the input if empty or invalid on submit.

### 3. Description/Details Field (Optional)
- **Label**: \"Additional Details (Optional)\" (text-sm, semi-bold, text-main).
- **Input**:
  - Type: Textarea.
  - Placeholder: \"Tell us more about the specific topics, style, or focus you'd like the book to have...\".
  - Styling: `text-base`, `p-3`, min-height 120px, border `--color-border`.
  - Focus State: 2px solid `--color-primary`.

### 4. Submit Button
- **Label**: \"Submit Request\".
- **Variant**: Primary.
- **Size**: Large (`py-3 px-6`).
- **Behavior**: 
  - Full-width on mobile (`w-full`).
  - Auto-width on desktop (`w-max`).
  - Disabled state during submission (opacity 50%, cursor not-allowed).

## Interaction States

### Initial State
- User sees the header and the empty form.

### Loading State
- Submit button shows a loading spinner.
- Input fields are disabled to prevent duplicate submissions.
- Button text changes to \"Sending...\".

### Success State
- The form is replaced by a success message:
  - **Icon**: Large green checkmark.
  - **Heading**: \"Request Sent!\" (text-2xl, bold).
  - **Message**: \"Thank you for your suggestion. We've sent your request to our team via Telegram.\"
  - **Action**: \"Back to Library\" button (Secondary variant).

### Error State
- An error alert appears above the submit button:
  - **Style**: Light red background, red border, red text.
  - **Message**: \"Something went wrong. Please try again later.\"

## Responsive Strategy
- **Mobile (< 640px)**:
  - Reduced horizontal padding on the main container.
  - Form fields and button are full-width.
  - Text alignment: Center for header, left for form labels.
- **Desktop (> 1024px)**:
  - Fixed max-width for the form card to prevent excessive stretching.
  - Generous white space around the card to focus attention.
