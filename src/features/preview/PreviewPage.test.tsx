import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { CvProvider } from '../../app/providers'
import { STORAGE_KEY } from '../../core'
import { PreviewPage } from './PreviewPage'

function renderWithProvider() {
  return render(
    <CvProvider>
      <PreviewPage />
    </CvProvider>
  )
}

describe('PreviewPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the name from cv', () => {
    const existingCv = {
      schemaVersion: 1,
      profile: {
        fullName: 'John Doe',
        headline: 'Software Engineer',
        location: 'New York',
        email: 'john@example.com',
        phone: '',
        website: '',
        links: [],
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      languages: [],
      certifications: [],
      additionalInfo: '',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingCv))

    renderWithProvider()

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
