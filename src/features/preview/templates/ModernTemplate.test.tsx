import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ModernTemplate } from './ModernTemplate'
import type { CvModel } from '../../../core/cv/types'

const createEmptyCv = (): CvModel => ({
  schemaVersion: 1,
  profile: {
    fullName: 'John Doe',
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
  projects: [],
  languages: [],
  certifications: [],
  additionalInfo: '',
  settings: { templateId: 'modern' },
})

const createPopulatedCv = (): CvModel => ({
  schemaVersion: 1,
  profile: {
    fullName: 'Jane Smith',
    headline: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    email: 'jane@example.com',
    phone: '555-1234',
    website: 'https://jane.dev',
    links: [],
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Corp',
      role: 'Software Engineer',
      location: 'Remote',
      startDate: '2022-01',
      endDate: '',
      isCurrent: true,
      highlights: ['Built scalable APIs', 'Led team of 5'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'MIT',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js'],
  projects: [
    {
      id: 'proj-1',
      name: 'Open Source Tool',
      description: 'A developer productivity tool',
      highlights: ['10k+ GitHub stars', 'Used by 500+ companies'],
      link: 'https://github.com/example/tool',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'Native' },
    { id: 'lang-2', name: 'Spanish', level: 'Fluent' },
  ],
  certifications: [
    { id: 'cert-1', name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2023-06' },
  ],
  additionalInfo: '',
  settings: { templateId: 'modern' },
})

describe('ModernTemplate', () => {
  describe('two-column structure', () => {
    it('renders aside element for sidebar when content exists', () => {
      const cv = createPopulatedCv()
      const { container } = render(<ModernTemplate cv={cv} />)

      expect(container.querySelector('aside')).toBeInTheDocument()
    })

    it('renders main element for main content when content exists', () => {
      const cv = createPopulatedCv()
      const { container } = render(<ModernTemplate cv={cv} />)

      expect(container.querySelector('main')).toBeInTheDocument()
    })

    it('does not render aside when no sidebar content exists', () => {
      const cv = createEmptyCv()
      cv.experience = [
        {
          id: 'exp-1',
          company: 'Company',
          role: 'Role',
          location: '',
          startDate: '2022-01',
          endDate: '',
          isCurrent: true,
          highlights: [],
        },
      ]
      const { container } = render(<ModernTemplate cv={cv} />)

      expect(container.querySelector('aside')).not.toBeInTheDocument()
      expect(container.querySelector('main')).toBeInTheDocument()
    })

    it('does not render main when no main content exists', () => {
      const cv = createEmptyCv()
      cv.profile.email = 'test@example.com'
      const { container } = render(<ModernTemplate cv={cv} />)

      expect(container.querySelector('aside')).toBeInTheDocument()
      expect(container.querySelector('main')).not.toBeInTheDocument()
    })
  })

  describe('header section', () => {
    it('renders profile name', () => {
      const cv = createEmptyCv()
      render(<ModernTemplate cv={cv} />)

      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('renders headline when provided', () => {
      const cv = createPopulatedCv()
      render(<ModernTemplate cv={cv} />)

      expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    })

    it('does not render headline element when empty', () => {
      const cv = createEmptyCv()
      render(<ModernTemplate cv={cv} />)

      // Only name should be in header
      const header = screen.getByRole('banner')
      expect(header.querySelectorAll('p')).toHaveLength(0)
    })
  })

  describe('sidebar sections', () => {
    it('renders Contact section with all contact info', () => {
      const cv = createPopulatedCv()
      render(<ModernTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument()
      expect(screen.getByText('jane@example.com')).toBeInTheDocument()
      expect(screen.getByText('555-1234')).toBeInTheDocument()
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
      expect(screen.getByText('https://jane.dev')).toBeInTheDocument()
    })

    it('does not render Contact section when no contact info', () => {
      const cv = createEmptyCv()
      cv.skills = ['React'] // Add sidebar content to render aside
      render(<ModernTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /contact/i })).not.toBeInTheDocument()
    })

    it('renders Skills section', () => {
      const cv = createPopulatedCv()
      render(<ModernTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })

    it('does not render Skills section when empty', () => {
      const cv = createEmptyCv()
      cv.profile.email = 'test@example.com' // Add sidebar content to render aside
      render(<ModernTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /skills/i })).not.toBeInTheDocument()
    })

    it('renders Languages section', () => {
      const cv = createPopulatedCv()
      render(<ModernTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /languages/i })).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
      expect(screen.getByText(/Native/)).toBeInTheDocument()
    })

    it('does not render Languages section when empty', () => {
      const cv = createEmptyCv()
      cv.profile.email = 'test@example.com' // Add sidebar content
      render(<ModernTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /languages/i })).not.toBeInTheDocument()
    })

    it('renders Certifications section', () => {
      const cv = createPopulatedCv()
      render(<ModernTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /certifications/i })).toBeInTheDocument()
      expect(screen.getByText('AWS Solutions Architect')).toBeInTheDocument()
      expect(screen.getByText(/Amazon/)).toBeInTheDocument()
    })

    it('does not render Certifications section when empty', () => {
      const cv = createEmptyCv()
      cv.profile.email = 'test@example.com' // Add sidebar content
      render(<ModernTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /certifications/i })).not.toBeInTheDocument()
    })
  })

  describe('main content sections', () => {
    it('renders Experience section', () => {
      const cv = createPopulatedCv()
      render(<ModernTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument()
      expect(screen.getByText(/Software Engineer at Tech Corp/)).toBeInTheDocument()
      expect(screen.getByText('Built scalable APIs')).toBeInTheDocument()
    })

    it('does not render Experience section when empty', () => {
      const cv = createEmptyCv()
      cv.projects = [
        {
          id: 'proj-1',
          name: 'Test Project',
          description: '',
          highlights: [],
          link: '',
        },
      ]
      render(<ModernTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /experience/i })).not.toBeInTheDocument()
    })

    it('renders Projects section', () => {
      const cv = createPopulatedCv()
      render(<ModernTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
      expect(screen.getByText('Open Source Tool')).toBeInTheDocument()
      expect(screen.getByText('A developer productivity tool')).toBeInTheDocument()
    })

    it('does not render Projects section when empty', () => {
      const cv = createEmptyCv()
      cv.experience = [
        {
          id: 'exp-1',
          company: 'Company',
          role: 'Role',
          location: '',
          startDate: '2022-01',
          endDate: '',
          isCurrent: true,
          highlights: [],
        },
      ]
      render(<ModernTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /projects/i })).not.toBeInTheDocument()
    })

    it('renders Education section', () => {
      const cv = createPopulatedCv()
      render(<ModernTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument()
      expect(screen.getByText('MIT')).toBeInTheDocument()
      expect(screen.getByText('Bachelor of Science in Computer Science')).toBeInTheDocument()
    })

    it('does not render Education section when empty', () => {
      const cv = createEmptyCv()
      cv.experience = [
        {
          id: 'exp-1',
          company: 'Company',
          role: 'Role',
          location: '',
          startDate: '2022-01',
          endDate: '',
          isCurrent: true,
          highlights: [],
        },
      ]
      render(<ModernTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /education/i })).not.toBeInTheDocument()
    })
  })

  describe('section ordering', () => {
    it('renders sidebar sections in correct order', () => {
      const cv = createPopulatedCv()
      const { container } = render(<ModernTemplate cv={cv} />)

      const sidebar = container.querySelector('aside')
      const sidebarHeadings = sidebar?.querySelectorAll('h2')
      const headingTexts = Array.from(sidebarHeadings || []).map((h) => h.textContent)

      expect(headingTexts).toEqual(['Contact', 'Skills', 'Languages', 'Certifications'])
    })

    it('renders main sections in correct order', () => {
      const cv = createPopulatedCv()
      const { container } = render(<ModernTemplate cv={cv} />)

      const main = container.querySelector('main')
      const mainHeadings = main?.querySelectorAll('h2')
      const headingTexts = Array.from(mainHeadings || []).map((h) => h.textContent)

      expect(headingTexts).toEqual(['Experience', 'Projects', 'Education'])
    })
  })

  describe('long content handling', () => {
    const createCvWithLongContent = (): CvModel => ({
      schemaVersion: 1,
      profile: {
        fullName: 'Alexandra Christina Montgomery-Worthington III',
        headline:
          'Senior Principal Distinguished Staff Software Engineer and Technical Architect',
        location: 'San Francisco Bay Area, California, United States',
        email: 'alexandra.montgomery-worthington@verylongcompanyname.enterprise.com',
        phone: '+1 (555) 123-4567 ext. 89012',
        website: 'https://www.alexandra-montgomery-worthington-portfolio.dev',
        links: [],
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Global International Multinational Technology Solutions Corporation Ltd.',
          role: 'Senior Principal Distinguished Staff Software Engineer',
          location: 'San Francisco Bay Area, California, United States (Remote-First)',
          startDate: '2022-01',
          endDate: '',
          isCurrent: true,
          highlights: [
            "Led the complete redesign and implementation of the company's flagship distributed microservices platform serving over 50 million daily active users across 150 countries",
          ],
        },
      ],
      education: [],
      skills: ['TypeScript/JavaScript (ES2024+)', 'React/Next.js/Remix', 'Node.js/Deno/Bun'],
      projects: [],
      languages: [],
      certifications: [],
      additionalInfo: '',
      settings: { templateId: 'modern' },
    })

    it('renders long names with break-words class', () => {
      const cv = createCvWithLongContent()
      const { container } = render(<ModernTemplate cv={cv} />)

      const nameHeading = container.querySelector('h1')
      expect(nameHeading).toHaveClass('break-words')
    })

    it('renders long experience titles with break-words class', () => {
      const cv = createCvWithLongContent()
      const { container } = render(<ModernTemplate cv={cv} />)

      const main = container.querySelector('main')
      const experienceTitle = main?.querySelector('h3')
      expect(experienceTitle).toHaveClass('break-words')
    })

    it('renders long highlights with break-words class', () => {
      const cv = createCvWithLongContent()
      const { container } = render(<ModernTemplate cv={cv} />)

      const highlightItems = container.querySelectorAll('ul.list-disc li')
      expect(highlightItems.length).toBeGreaterThan(0)
      highlightItems.forEach((item) => {
        expect(item).toHaveClass('break-words')
      })
    })

    it('renders long sidebar content with break-words class', () => {
      const cv = createCvWithLongContent()
      const { container } = render(<ModernTemplate cv={cv} />)

      const sidebar = container.querySelector('aside')
      const contactItems = sidebar?.querySelectorAll('section > div > div')
      expect(contactItems?.length).toBeGreaterThan(0)
      contactItems?.forEach((item) => {
        expect(item).toHaveClass('break-words')
      })
    })
  })
})
