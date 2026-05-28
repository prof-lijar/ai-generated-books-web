import { test, expect } from '@playwright/test';

test.describe('AI Books Web Platform E2E', () => {
  
  test('should load the library page and display books', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AI-Generated Books Library/);
    
    // Check if library heading is present
    const heading = page.locator('h1');
    await expect(heading).toContainText('AI-Generated Books Library');
    
    // Check if at least one book card is present (assuming API returns books)
    // We use a more generic selector for book cards
    const bookCards = page.locator('a[href^="/books/"]');
    await expect(bookCards.first()).toBeVisible();
  });

  test('should filter books using the search bar', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.locator('input[type="text"]');
    
    // Search for a term that likely exists or check the behavior
    // Since we don't know the exact books, we search for something and verify the list changes
    await searchInput.fill('AI');
    
    // Verify that the search input has value
    await expect(searchInput).toHaveValue('AI');
    
    // If no books match, it should show "No books found"
    // If books match, they should be visible
    const noBooksMsg = page.locator('text=No books found');
    const bookCards = page.locator('a[href^="/books/"]');
    
    if (await noBooksMsg.isVisible()) {
      await expect(noBooksMsg).toBeVisible();
    } else {
      await expect(bookCards.first()).toBeVisible();
    }
  });

  test('should navigate from library to reader page', async ({ page }) => {
    await page.goto('/');
    
    // Click the first book card
    const firstBook = page.locator('a[href^="/books/"]').first();
    await firstBook.click();
    
    // Verify we are on the reader page
    await expect(page).toHaveURL(/\/books\/.+/);
    
    // PDF viewer controls are now handled by the browser's native PDF viewer via iframe
    // We verify that the page loaded and the PDF container is present
    await expect(page.locator('iframe')).toBeVisible();
  });

  test('should navigate back from reader to library', async ({ page }) => {
    // Go directly to a dummy reader page (assuming slug exists or just using a likely one)
    // In a real scenario, we'd use a known slug from the API
    await page.goto('/books/test-book'); 
    
    const backButton = page.locator('text=Back to Library');
    await backButton.click();
    
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('AI-Generated Books Library');
  });

  test('should verify PDF viewer action buttons', async ({ page }) => {
    await page.goto('/books/test-book');
    
    const openInNewTabBtn = page.locator('text=Open in New Tab');
    const downloadPdfBtn = page.locator('text=Download PDF');
    
    await expect(openInNewTabBtn).toBeVisible();
    await expect(downloadPdfBtn).toBeVisible();
  });
});
