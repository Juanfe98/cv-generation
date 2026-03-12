import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import { Layout } from './Layout'
import { CvProvider } from './providers'
import { EditorPage } from '../features/editor/EditorPage'
import { PreviewPage } from '../features/preview/PreviewPage'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'editor', element: <EditorPage /> },
      { path: 'preview', element: <PreviewPage /> },
    ],
  },
]

function renderWithProviders(initialEntries: string[]) {
  const router = createMemoryRouter(routes, { initialEntries })
  return render(
    <CvProvider>
      <RouterProvider router={router} />
    </CvProvider>
  )
}

describe('Router', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders EditorPage at /editor', () => {
    renderWithProviders(['/editor'])

    expect(screen.getByTestId('editor-container')).toBeInTheDocument()
    expect(screen.getByText('Getting Started')).toBeInTheDocument()
  })

  it('renders PreviewPage at /preview', () => {
    renderWithProviders(['/preview'])

    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderWithProviders(['/editor'])

    expect(screen.getByRole('link', { name: /editor/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /preview/i })).toBeInTheDocument()
  })

  it('renders fallback name "Unnamed" when CV has no name', () => {
    renderWithProviders(['/editor'])

    expect(screen.getByRole('heading', { name: /unnamed/i })).toBeInTheDocument()
  })
})
