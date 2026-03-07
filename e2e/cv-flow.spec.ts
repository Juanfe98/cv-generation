import { test, expect } from '@playwright/test'

test.describe('CV Editor Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage once at test start, then reload to apply
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('complete edit -> save -> preview -> persist flow', async ({ page }) => {
    // Go to editor
    await page.goto('/editor')
    await expect(page).toHaveURL('/editor')

    // Fill Profile section
    await page.getByLabel(/full name/i).fill('Jane Doe')
    await page.getByLabel(/headline/i).fill('Software Engineer')
    await page.getByLabel(/email/i).fill('jane@example.com')
    await page.getByLabel(/location/i).fill('New York, NY')

    // Save Profile
    await page.getByRole('button', { name: /save/i }).click()

    // Verify Save button is disabled after save (dirty state cleared)
    await expect(page.getByRole('button', { name: /save/i })).toBeDisabled()

    // Add Experience
    await page.getByRole('button', { name: /add experience/i }).click()
    await page.getByLabel(/company/i).fill('Tech Corp')
    await page.getByLabel(/role/i).fill('Senior Developer')
    await page.getByLabel(/start date/i).fill('2022-01')
    await page.getByLabel(/i currently work here/i).check()

    // Save Experience entry (click the submit button in the form)
    await page.getByRole('button', { name: /^add$/i }).first().click()

    // Verify experience appears in list
    await expect(page.getByText('Senior Developer').first()).toBeVisible()

    // Add Skills - find the skills section input and add button
    const skillsSection = page.locator('section', { has: page.getByRole('heading', { name: /skills/i }) })
    await skillsSection.getByPlaceholder(/react, typescript/i).fill('React')
    await skillsSection.getByRole('button', { name: /^add$/i }).click()
    await skillsSection.getByPlaceholder(/react, typescript/i).fill('TypeScript')
    await skillsSection.getByRole('button', { name: /^add$/i }).click()

    // Save Skills
    await skillsSection.getByRole('button', { name: /save/i }).click()

    // Navigate to Preview
    await page.getByRole('link', { name: /preview/i }).click()
    await expect(page).toHaveURL('/preview')

    // Verify content is rendered in preview
    await expect(page.getByRole('heading', { name: 'Jane Doe' })).toBeVisible()
    await expect(page.getByText('Software Engineer')).toBeVisible()
    await expect(page.getByText(/jane@example.com/)).toBeVisible()
    await expect(page.getByRole('heading', { name: /experience/i })).toBeVisible()
    await expect(page.getByText(/Senior Developer/)).toBeVisible()
    await expect(page.getByRole('heading', { name: /skills/i })).toBeVisible()
    await expect(page.getByText('React')).toBeVisible()
    await expect(page.getByText('TypeScript')).toBeVisible()

    // Wait for debounced save to complete (300ms debounce + buffer)
    await page.waitForTimeout(500)

    // Verify persistence - reload page
    await page.reload()

    // Content should still be there after reload
    await expect(page.getByRole('heading', { name: 'Jane Doe' })).toBeVisible()
    await expect(page.getByText('Software Engineer')).toBeVisible()
    await expect(page.getByRole('heading', { name: /experience/i })).toBeVisible()
    await expect(page.getByText(/Senior Developer/)).toBeVisible()
  })

  test('data persists across navigation', async ({ page }) => {
    // Go to editor and fill minimal data
    await page.goto('/editor')

    await page.getByLabel(/full name/i).fill('Persistence Test')
    await page.getByRole('button', { name: /save/i }).click()

    // Navigate away to preview
    await page.getByRole('link', { name: /preview/i }).click()
    await expect(page.getByRole('heading', { name: 'Persistence Test' })).toBeVisible()

    // Navigate back to editor
    await page.getByRole('link', { name: /editor/i }).click()

    // Data should still be in the form
    await expect(page.getByLabel(/full name/i)).toHaveValue('Persistence Test')
  })

  test('empty sections are not shown in preview', async ({ page }) => {
    // Go to editor and fill only profile
    await page.goto('/editor')

    await page.getByLabel(/full name/i).fill('Minimal CV')
    await page.getByRole('button', { name: /save/i }).click()

    // Go to preview
    await page.getByRole('link', { name: /preview/i }).click()

    // Profile should be visible
    await expect(page.getByRole('heading', { name: 'Minimal CV' })).toBeVisible()

    // Empty sections should NOT be visible
    await expect(page.getByRole('heading', { name: /experience/i })).not.toBeVisible()
    await expect(page.getByRole('heading', { name: /education/i })).not.toBeVisible()
    await expect(page.getByRole('heading', { name: /skills/i })).not.toBeVisible()
    await expect(page.getByRole('heading', { name: /projects/i })).not.toBeVisible()
  })
})
