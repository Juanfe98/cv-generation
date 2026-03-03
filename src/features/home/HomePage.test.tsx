import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: /cv builder/i })).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<HomePage />)

    expect(screen.getByText(/build your professional cv with ease/i)).toBeInTheDocument()
  })
})
