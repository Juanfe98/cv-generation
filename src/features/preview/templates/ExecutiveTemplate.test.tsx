import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ExecutiveTemplate } from './ExecutiveTemplate'
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
  settings: { templateId: 'executive', accentColor: 'blue', spacingPreset: 'standard' },
})

const createPopulatedCv = (): CvModel => ({
  schemaVersion: 1,
  profile: {
    fullName: 'Jane Smith',
    headline: 'Chief Technology Officer',
    location: 'San Francisco, CA',
    email: 'jane@example.com',
    phone: '555-1234',
    website: 'https://jane.dev',
    links: [
      { label: 'LinkedIn', url: 'https://linkedin.com/in/janesmith' },
      { label: 'GitHub', url: 'https://github.com/janesmith' },
    ],
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Corp',
      role: 'CTO',
      location: 'Remote',
      startDate: '2022-01',
      endDate: '',
      isCurrent: true,
      highlights: ['Led engineering team of 50', 'Drove 200% revenue growth'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2010-09',
      endDate: '2012-06',
    },
  ],
  skills: ['Leadership', 'Strategy', 'Architecture'],
  projects: [
    {
      id: 'proj-1',
      name: 'Platform Redesign',
      description: 'Led complete platform overhaul',
      highlights: ['Reduced costs by 40%', 'Improved performance 3x'],
      link: 'https://example.com/project',
    },
  ],
  languages: [],
  certifications: [],
  additionalInfo: '',
  settings: { templateId: 'executive', accentColor: 'blue', spacingPreset: 'standard' },
})

describe('ExecutiveTemplate', () => {
  describe('two-column structure', () => {
    it('renders aside element for sidebar', () => {
      const cv = createPopulatedCv()
      const { container } = render(<ExecutiveTemplate cv={cv} />)

      expect(container.querySelector('aside')).toBeInTheDocument()
    })

    it('renders main element for main content when content exists', () => {
      const cv = createPopulatedCv()
      const { container } = render(<ExecutiveTemplate cv={cv} />)

      expect(container.querySelector('main')).toBeInTheDocument()
    })

    it('does not render main when no main content exists', () => {
      const cv = createEmptyCv()
      const { container } = render(<ExecutiveTemplate cv={cv} />)

      // Sidebar always renders (photo placeholder is always visible)
      expect(container.querySelector('aside')).toBeInTheDocument()
      expect(container.querySelector('main')).not.toBeInTheDocument()
    })

    it('always renders sidebar with photo placeholder', () => {
      const cv = createEmptyCv()
      const { container } = render(<ExecutiveTemplate cv={cv} />)

      expect(container.querySelector('aside')).toBeInTheDocument()
      expect(screen.getByLabelText('Photo placeholder')).toBeInTheDocument()
    })
  })

  describe('header section', () => {
    it('renders profile name', () => {
      const cv = createEmptyCv()
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('renders headline when provided', () => {
      const cv = createPopulatedCv()
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByText('Chief Technology Officer')).toBeInTheDocument()
    })

    it('does not render headline element when empty', () => {
      const cv = createEmptyCv()
      render(<ExecutiveTemplate cv={cv} />)

      const header = screen.getByRole('banner')
      expect(header.querySelectorAll('p')).toHaveLength(0)
    })
  })

  describe('photo placeholder', () => {
    it('renders photo placeholder with initials', () => {
      const cv = createPopulatedCv()
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByText('JS')).toBeInTheDocument()
    })

    it('renders photo placeholder in sidebar', () => {
      const cv = createPopulatedCv()
      render(<ExecutiveTemplate cv={cv} />)

      const placeholder = screen.getByLabelText('Photo placeholder')
      expect(placeholder).toBeInTheDocument()
    })

    it('extracts single initial for single-word name', () => {
      const cv = createEmptyCv()
      cv.profile.fullName = 'Madonna'
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByText('M')).toBeInTheDocument()
    })

    it('extracts first and last initials for multi-word name', () => {
      const cv = createEmptyCv()
      cv.profile.fullName = 'Mary Jane Watson Parker'
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByText('MP')).toBeInTheDocument()
    })
  })

  describe('sidebar sections', () => {
    it('renders Contact section with all contact info', () => {
      const cv = createPopulatedCv()
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument()
      expect(screen.getByText('jane@example.com')).toBeInTheDocument()
      expect(screen.getByText('555-1234')).toBeInTheDocument()
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
      expect(screen.getByText('https://jane.dev')).toBeInTheDocument()
    })

    it('does not render Contact section when no contact info', () => {
      const cv = createEmptyCv()
      cv.skills = ['React'] // Add sidebar content
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /contact/i })).not.toBeInTheDocument()
    })

    it('renders Links section with profile links', () => {
      const cv = createPopulatedCv()
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /links/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
        'href',
        'https://linkedin.com/in/janesmith'
      )
      expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
        'href',
        'https://github.com/janesmith'
      )
    })

    it('does not render Links section when no links', () => {
      const cv = createEmptyCv()
      cv.profile.email = 'test@example.com' // Add sidebar content
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /links/i })).not.toBeInTheDocument()
    })

    it('renders Skills section', () => {
      const cv = createPopulatedCv()
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
      expect(screen.getByText('Leadership')).toBeInTheDocument()
      expect(screen.getByText('Strategy')).toBeInTheDocument()
    })

    it('does not render Skills section when empty', () => {
      const cv = createEmptyCv()
      cv.profile.email = 'test@example.com' // Add sidebar content
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /skills/i })).not.toBeInTheDocument()
    })
  })

  describe('main content sections', () => {
    it('renders Experience section', () => {
      const cv = createPopulatedCv()
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument()
      expect(screen.getByText(/CTO at Tech Corp/)).toBeInTheDocument()
      expect(screen.getByText('Led engineering team of 50')).toBeInTheDocument()
    })

    it('does not render Experience section when empty', () => {
      const cv = createEmptyCv()
      cv.education = [
        {
          id: 'edu-1',
          institution: 'Test University',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
        },
      ]
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /experience/i })).not.toBeInTheDocument()
    })

    it('renders Education section', () => {
      const cv = createPopulatedCv()
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument()
      expect(screen.getByText('Stanford University')).toBeInTheDocument()
      expect(screen.getByText('Master of Science in Computer Science')).toBeInTheDocument()
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
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /education/i })).not.toBeInTheDocument()
    })

    it('renders Projects section', () => {
      const cv = createPopulatedCv()
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
      expect(screen.getByText('Platform Redesign')).toBeInTheDocument()
      expect(screen.getByText('Led complete platform overhaul')).toBeInTheDocument()
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
      render(<ExecutiveTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /projects/i })).not.toBeInTheDocument()
    })
  })

  describe('section ordering', () => {
    it('renders sidebar sections in correct order: Contact, Links, Skills', () => {
      const cv = createPopulatedCv()
      const { container } = render(<ExecutiveTemplate cv={cv} />)

      const sidebar = container.querySelector('aside')
      const sidebarHeadings = sidebar?.querySelectorAll('h2')
      const headingTexts = Array.from(sidebarHeadings || []).map((h) => h.textContent)

      expect(headingTexts).toEqual(['Contact', 'Links', 'Skills'])
    })

    it('renders main sections in correct order: Experience, Education, Projects', () => {
      const cv = createPopulatedCv()
      const { container } = render(<ExecutiveTemplate cv={cv} />)

      const main = container.querySelector('main')
      const mainHeadings = main?.querySelectorAll('h2')
      const headingTexts = Array.from(mainHeadings || []).map((h) => h.textContent)

      expect(headingTexts).toEqual(['Experience', 'Education', 'Projects'])
    })
  })

  describe('long content handling', () => {
    const createCvWithLongContent = (): CvModel => ({
      schemaVersion: 1,
      profile: {
        fullName: 'Alexandra Christina Montgomery-Worthington III',
        headline:
          'Chief Executive Officer and Founder of Global Innovation Partners',
        location: 'San Francisco Bay Area, California, United States',
        email: 'alexandra.montgomery-worthington@verylongcompanyname.enterprise.com',
        phone: '+1 (555) 123-4567 ext. 89012',
        website: 'https://www.alexandra-montgomery-worthington-portfolio.dev',
        links: [
          {
            label: 'LinkedIn Professional Profile',
            url: 'https://linkedin.com/in/alexandra-montgomery-worthington',
          },
        ],
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Global International Multinational Technology Solutions Corporation Ltd.',
          role: 'Chief Executive Officer',
          location: 'San Francisco Bay Area, California, United States (Remote-First)',
          startDate: '2022-01',
          endDate: '',
          isCurrent: true,
          highlights: [
            "Led the complete transformation of the company's global operations spanning over 50 countries with a team of 5000 employees",
          ],
        },
      ],
      education: [],
      skills: ['Executive Leadership', 'Strategic Planning', 'Digital Transformation'],
      projects: [],
      languages: [],
      certifications: [],
      additionalInfo: '',
      settings: { templateId: 'executive', accentColor: 'blue', spacingPreset: 'standard' },
    })

    it('renders long names with break-words class', () => {
      const cv = createCvWithLongContent()
      const { container } = render(<ExecutiveTemplate cv={cv} />)

      const nameHeading = container.querySelector('h1')
      expect(nameHeading).toHaveClass('break-words')
    })

    it('renders long experience titles with break-words class', () => {
      const cv = createCvWithLongContent()
      const { container } = render(<ExecutiveTemplate cv={cv} />)

      const main = container.querySelector('main')
      const experienceTitle = main?.querySelector('h3')
      expect(experienceTitle).toHaveClass('break-words')
    })

    it('renders long highlights with break-words class', () => {
      const cv = createCvWithLongContent()
      const { container } = render(<ExecutiveTemplate cv={cv} />)

      const highlightItems = container.querySelectorAll('ul.list-disc li')
      expect(highlightItems.length).toBeGreaterThan(0)
      highlightItems.forEach((item) => {
        expect(item).toHaveClass('break-words')
      })
    })

    it('renders long sidebar content with break-words class', () => {
      const cv = createCvWithLongContent()
      const { container } = render(<ExecutiveTemplate cv={cv} />)

      const sidebar = container.querySelector('aside')
      const contactItems = sidebar?.querySelectorAll('section > div > div')
      expect(contactItems?.length).toBeGreaterThan(0)
      contactItems?.forEach((item) => {
        expect(item).toHaveClass('break-words')
      })
    })
  })
})
