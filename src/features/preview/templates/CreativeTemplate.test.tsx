import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CreativeTemplate } from './CreativeTemplate'
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
  settings: { templateId: 'creative' },
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
      role: 'Senior Engineer',
      location: 'Remote',
      startDate: '2024-01',
      endDate: '',
      isCurrent: true,
      highlights: ['Led team of 5 engineers', 'Built scalable APIs'],
    },
    {
      id: 'exp-2',
      company: 'Startup Inc',
      role: 'Engineer',
      location: 'New York',
      startDate: '2022-06',
      endDate: '2023-12',
      isCurrent: false,
      highlights: ['Implemented core features'],
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
      highlights: ['10k+ GitHub stars'],
      link: 'https://github.com/example/tool',
    },
  ],
  languages: [],
  certifications: [],
  additionalInfo: '',
  settings: { templateId: 'creative' },
})

describe('CreativeTemplate', () => {
  describe('header section', () => {
    it('renders profile name centered', () => {
      const cv = createEmptyCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('renders headline when provided', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    })

    it('renders contact line with all contact info', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      // Contact line should contain all info joined by bullets
      expect(screen.getByText(/jane@example\.com/)).toBeInTheDocument()
      expect(screen.getByText(/555-1234/)).toBeInTheDocument()
      expect(screen.getByText(/San Francisco, CA/)).toBeInTheDocument()
    })

    it('does not render contact line when no contact info', () => {
      const cv = createEmptyCv()
      const { container } = render(<CreativeTemplate cv={cv} />)

      const header = container.querySelector('header')
      // Should only have h1 (name), no p elements for headline or contact
      const paragraphs = header?.querySelectorAll('p')
      expect(paragraphs?.length).toBe(0)
    })
  })

  describe('experience timeline section', () => {
    it('renders timeline container when experience exists', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByTestId('timeline-container')).toBeInTheDocument()
    })

    it('renders timeline dots for each experience entry', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      const dots = screen.getAllByTestId('timeline-dot')
      expect(dots).toHaveLength(2)
    })

    it('renders experience heading', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument()
    })

    it('renders experience entries with role and company', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByText(/Senior Engineer at Tech Corp/)).toBeInTheDocument()
      expect(screen.getByText(/Engineer at Startup Inc/)).toBeInTheDocument()
    })

    it('renders date range for each experience', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByText(/Jan 2024 – Present/)).toBeInTheDocument()
      expect(screen.getByText(/Jun 2022 – Dec 2023/)).toBeInTheDocument()
    })

    it('renders experience highlights', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByText('Led team of 5 engineers')).toBeInTheDocument()
      expect(screen.getByText('Built scalable APIs')).toBeInTheDocument()
    })

    it('does not render timeline when no experience', () => {
      const cv = createEmptyCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.queryByTestId('timeline-container')).not.toBeInTheDocument()
      expect(screen.queryByRole('heading', { name: /experience/i })).not.toBeInTheDocument()
    })
  })

  describe('two-column layout', () => {
    it('renders two-column grid when education or skills exist', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByTestId('two-column-grid')).toBeInTheDocument()
    })

    it('does not render two-column grid when no education and no skills', () => {
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
      render(<CreativeTemplate cv={cv} />)

      expect(screen.queryByTestId('two-column-grid')).not.toBeInTheDocument()
    })
  })

  describe('education section', () => {
    it('renders education heading', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument()
    })

    it('renders institution name', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByText('MIT')).toBeInTheDocument()
    })

    it('renders degree and field', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByText('Bachelor of Science in Computer Science')).toBeInTheDocument()
    })

    it('does not render education section when empty', () => {
      const cv = createEmptyCv()
      cv.skills = ['React'] // Add skills so grid renders
      render(<CreativeTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /education/i })).not.toBeInTheDocument()
    })
  })

  describe('skills section', () => {
    it('renders skills heading', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
    })

    it('renders all skills', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Node.js')).toBeInTheDocument()
    })

    it('does not render skills section when empty', () => {
      const cv = createEmptyCv()
      cv.education = [
        {
          id: 'edu-1',
          institution: 'University',
          degree: 'BS',
          field: 'CS',
          startDate: '2014-09',
          endDate: '2018-05',
        },
      ]
      render(<CreativeTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /skills/i })).not.toBeInTheDocument()
    })
  })

  describe('projects section', () => {
    it('renders projects heading', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
    })

    it('renders project name and description', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.getByText('Open Source Tool')).toBeInTheDocument()
      expect(screen.getByText(/A developer productivity tool/)).toBeInTheDocument()
    })

    it('renders project link', () => {
      const cv = createPopulatedCv()
      render(<CreativeTemplate cv={cv} />)

      const link = screen.getByRole('link', { name: /github\.com/i })
      expect(link).toHaveAttribute('href', 'https://github.com/example/tool')
    })

    it('does not render projects section when empty', () => {
      const cv = createEmptyCv()
      render(<CreativeTemplate cv={cv} />)

      expect(screen.queryByRole('heading', { name: /projects/i })).not.toBeInTheDocument()
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
      skills: ['TypeScript/JavaScript (ES2024+)', 'React/Next.js/Remix'],
      projects: [],
      languages: [],
      certifications: [],
      additionalInfo: '',
      settings: { templateId: 'creative' },
    })

    it('renders long names with break-words class', () => {
      const cv = createCvWithLongContent()
      const { container } = render(<CreativeTemplate cv={cv} />)

      const nameHeading = container.querySelector('h1')
      expect(nameHeading).toHaveClass('break-words')
    })

    it('renders long experience titles with break-words class', () => {
      const cv = createCvWithLongContent()
      render(<CreativeTemplate cv={cv} />)

      const timelineContainer = screen.getByTestId('timeline-container')
      const experienceTitle = timelineContainer.querySelector('h3')
      expect(experienceTitle).toHaveClass('break-words')
    })

    it('renders long highlights with break-words class', () => {
      const cv = createCvWithLongContent()
      const { container } = render(<CreativeTemplate cv={cv} />)

      const highlightItems = container.querySelectorAll('ul.list-disc li')
      expect(highlightItems.length).toBeGreaterThan(0)
      highlightItems.forEach((item) => {
        expect(item).toHaveClass('break-words')
      })
    })
  })
})
