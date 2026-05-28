# Project Progress

## Current Phase
development — Fixing critical bug #22 to ensure books are correctly loaded from all subdirectories in the source repository.

## Tech Stack
Next.js (App Router), TypeScript, Tailwind CSS, GitHub API, Vercel.

## What Was Completed This Cycle
- Identified a critical bug (#22) preventing books from loading correctly.
- Reverted project status from 'completed' to 'development' to address the issue.

## What Is In Progress
- Issue #22: [Bug] Books not loading — fetchBooks() must iterate subdirectories for PDFs (assigned to Backend)

## What Is Blocked
- None.

## Next Cycle Plan
- Backend to implement recursive directory traversal for the GitHub API fetch.
- QA to verify the fix and ensure all books are visible in the library.

## Feature Checklist
- [x] Library Page (fetch books from GitHub) — needs fix for subdirectories
- [x] Search/Filter functional — done
- [x] PDF Reader Page (embedded viewer) — done
- [x] PDF Controls (zoom, navigation) — done
- [x] PDF Loading Reliability — needs fix (#22)
- [x] Responsive UI Audit — completed
- [x] CI/CD Pipeline & Deployment — completed
- [x] Professional Documentation (README) — done
