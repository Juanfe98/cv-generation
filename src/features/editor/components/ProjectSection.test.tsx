import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CvProvider } from '../../../app/providers'
import { STORAGE_KEY } from '../../../core'
import { ProjectSection } from './ProjectSection'

function renderWithProvider() {
  return render(
    <CvProvider>
      <ProjectSection />
    </CvProvider>
  )
}

const createCvWithProjects = (projects: Array<{
  id: string
  name: string
  description?: string
  highlights?: string[]
  link?: string
}>) => ({
  schemaVersion: 1,
  profile: {
    fullName: 'Test User',
    headline: '',
    location: '',
    email: '',
    phone: '',
    website: '',
    links: [],
  },
  experience: [],
  education: [],
  skills: [],
  projects: projects.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description ?? '',
    highlights: p.highlights ?? [],
    link: p.link ?? '',
  })),
  languages: [],
  certifications: [],
  additionalInfo: '',
})

describe('ProjectSection', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows empty state when no projects', () => {
    renderWithProvider()
    expect(screen.getByText(/no projects yet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
  })

  it('renders existing projects from cv', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithProjects([
          {
            id: '1',
            name: 'CLI Tool',
            description: 'A command line tool',
            highlights: ['Fast', 'Lightweight'],
            link: 'https://github.com/test/cli',
          },
          {
            id: '2',
            name: 'Web App',
            description: 'A web application',
          },
        ])
      )
    )

    renderWithProvider()

    expect(screen.getByText('CLI Tool')).toBeInTheDocument()
    expect(screen.getByText('A command line tool')).toBeInTheDocument()
    expect(screen.getByText('https://github.com/test/cli')).toBeInTheDocument()
    expect(screen.getByText('Fast')).toBeInTheDocument()
    expect(screen.getByText('Web App')).toBeInTheDocument()
  })

  it('adds a new project and saves it', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add project/i }))

    await user.type(screen.getByLabelText(/project name/i), 'My Project')
    await user.type(screen.getByLabelText(/description/i), 'A cool project')
    await user.type(screen.getByLabelText(/link/i), 'https://example.com')
    await user.type(screen.getByLabelText(/highlights/i), 'Feature 1\nFeature 2')

    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText('My Project')).toBeInTheDocument()
      expect(screen.getByText('A cool project')).toBeInTheDocument()
      expect(screen.getByText('https://example.com')).toBeInTheDocument()
      expect(screen.getByText('Feature 1')).toBeInTheDocument()
      expect(screen.getByText('Feature 2')).toBeInTheDocument()
    })

    // Verify saved to localStorage (debounced)
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.projects[0].name).toBe('My Project')
      expect(stored.projects[0].highlights).toEqual(['Feature 1', 'Feature 2'])
    })
  })

  it('shows validation error when name is empty', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add project/i }))
    // Type in a non-required field to make form dirty
    await user.type(screen.getByLabelText(/description/i), 'A cool project')
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
    })
  })

  it('validates URL format for link field', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add project/i }))
    await user.type(screen.getByLabelText(/project name/i), 'Test Project')
    await user.type(screen.getByLabelText(/link/i), 'not-a-url')

    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid url/i)).toBeInTheDocument()
    })
  })

  it('edits an existing project', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithProjects([
          { id: '1', name: 'Old Project', description: 'Old description' },
        ])
      )
    )

    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /edit/i }))

    const nameInput = screen.getByLabelText(/project name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'New Project')

    await user.click(screen.getByRole('button', { name: /update/i }))

    await waitFor(() => {
      expect(screen.getByText('New Project')).toBeInTheDocument()
      expect(screen.queryByText('Old Project')).not.toBeInTheDocument()
    })
  })

  it('deletes a project', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithProjects([
          { id: '1', name: 'To Delete' },
        ])
      )
    )

    const user = userEvent.setup()
    renderWithProvider()

    expect(screen.getByText('To Delete')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /delete/i }))

    await waitFor(() => {
      expect(screen.queryByText('To Delete')).not.toBeInTheDocument()
      expect(screen.getByText(/no projects yet/i)).toBeInTheDocument()
    })
  })

  it('cancels adding without saving', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add project/i }))
    await user.type(screen.getByLabelText(/project name/i), 'Not Saved')
    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(screen.queryByText('Not Saved')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
  })

  it('allows empty link field', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add project/i }))
    await user.type(screen.getByLabelText(/project name/i), 'Project Without Link')

    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText('Project Without Link')).toBeInTheDocument()
    })
  })
})
