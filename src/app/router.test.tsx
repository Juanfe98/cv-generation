import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { Layout } from './Layout'
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

describe('Router', () => {
  it('renders EditorPage at /editor', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/editor'] })
    render(<RouterProvider router={router} />)

    expect(screen.getByRole('heading', { name: /editor/i })).toBeInTheDocument()
  })

  it('renders PreviewPage at /preview', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/preview'] })
    render(<RouterProvider router={router} />)

    expect(screen.getByRole('heading', { name: /preview/i })).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/editor'] })
    render(<RouterProvider router={router} />)

    expect(screen.getByRole('link', { name: /editor/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /preview/i })).toBeInTheDocument()
  })
})
