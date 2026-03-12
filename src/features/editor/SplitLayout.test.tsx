import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CvProvider } from '../../app/providers'
import { SplitLayout } from './SplitLayout'

function renderWithProvider(children: React.ReactNode = <div>Editor Content</div>) {
  return render(
    <CvProvider>
      <SplitLayout>{children}</SplitLayout>
    </CvProvider>
  )
}

describe('SplitLayout', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('rendering', () => {
    it('renders the preview panel', () => {
      renderWithProvider()

      expect(screen.getByTestId('preview-panel')).toBeInTheDocument()
    })

    it('renders the editor container with children', () => {
      renderWithProvider(<div>My Editor Content</div>)

      expect(screen.getByTestId('editor-container')).toBeInTheDocument()
      expect(screen.getByText('My Editor Content')).toBeInTheDocument()
    })

    it('renders the mobile view toggle', () => {
      renderWithProvider()

      expect(screen.getByRole('button', { name: /editor/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /preview/i })).toBeInTheDocument()
    })
  })

  describe('mobile view toggle', () => {
    it('shows editor view by default', () => {
      renderWithProvider()

      const editorButton = screen.getByRole('button', { name: /editor/i })
      expect(editorButton).toHaveClass('border-blue-600')
    })

    it('switches to preview view when preview button is clicked', async () => {
      const user = userEvent.setup()
      renderWithProvider()

      const previewButton = screen.getByRole('button', { name: /preview/i })
      await user.click(previewButton)

      expect(previewButton).toHaveClass('border-blue-600')
    })

    it('switches back to editor view when editor button is clicked', async () => {
      const user = userEvent.setup()
      renderWithProvider()

      const previewButton = screen.getByRole('button', { name: /preview/i })
      const editorButton = screen.getByRole('button', { name: /editor/i })

      await user.click(previewButton)
      expect(previewButton).toHaveClass('border-blue-600')

      await user.click(editorButton)
      expect(editorButton).toHaveClass('border-blue-600')
    })
  })

  describe('layout containers', () => {
    it('renders preview container', () => {
      renderWithProvider()

      expect(screen.getByTestId('preview-container')).toBeInTheDocument()
    })

    it('renders editor container', () => {
      renderWithProvider()

      expect(screen.getByTestId('editor-container')).toBeInTheDocument()
    })
  })
})
