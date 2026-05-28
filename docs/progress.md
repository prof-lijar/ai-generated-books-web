# Project Progress

## Current Phase
quality — Fixing critical bugs identified during E2E testing to reach production-ready state.

## Tech Stack
Next.js (App Router), TypeScript, Tailwind CSS, GitHub API, Vercel.

## What Was Completed This Cycle
- Planning cycle to resolve critical bugs #14 and #16.

## What Is In Progress
- Issue #14: [Bug] PDF Loading Mismatch and Stubbed Viewer Controls (P0)
- Issue #16: [Bug] Books not fetched — PDFs are inside subdirectories, not at repo root (P0)

## What Is Blocked
- None.

## Next Cycle Plan
- Backend will fix the PDF fetching logic to handle subdirectories (#16).
- Frontend and Backend will resolve the PDF loading mismatch and implement remaining viewer controls (#14).
- QA will be assigned to verify these critical fixes.

## Feature Checklist
- [x] Library Page (fetch books from GitHub) — done
- [x] Search/Filter functional — done
- [x] PDF Reader Page (embedded viewer) — done
- [x] PDF Controls (zoom, navigation) — done
- [ ] PDF Loading Reliability (Fixing #14 and #16) — in progress
- [x] Responsive UI Audit — completed
- [x] CI/CD Pipeline & Deployment — completed
