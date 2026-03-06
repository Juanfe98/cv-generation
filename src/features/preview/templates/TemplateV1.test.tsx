import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TemplateV1 } from './TemplateV1'
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
})

describe('TemplateV1', () => {
  describe('empty sections', () => {
    it('renders profile even with minimal data', () => {
      const cv = createEmptyCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('does not render Experience section when empty', () => {
      const cv = createEmptyCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.queryByRole('heading', { name: /experience/i })).not.toBeInTheDocument()
    })

    it('does not render Education section when empty', () => {
      const cv = createEmptyCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.queryByRole('heading', { name: /education/i })).not.toBeInTheDocument()
    })

    it('does not render Projects section when empty', () => {
      const cv = createEmptyCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.queryByRole('heading', { name: /projects/i })).not.toBeInTheDocument()
    })

    it('does not render Skills section when empty', () => {
      const cv = createEmptyCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.queryByRole('heading', { name: /skills/i })).not.toBeInTheDocument()
    })

    it('does not render Certifications section when empty', () => {
      const cv = createEmptyCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.queryByRole('heading', { name: /certifications/i })).not.toBeInTheDocument()
    })

    it('does not render Languages section when empty', () => {
      const cv = createEmptyCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.queryByRole('heading', { name: /languages/i })).not.toBeInTheDocument()
    })
  })

  describe('populated sections', () => {
    it('renders Profile with all details', () => {
      const cv = createPopulatedCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
      expect(screen.getByText(/jane@example.com/)).toBeInTheDocument()
    })

    it('renders Experience section with heading and entry', () => {
      const cv = createPopulatedCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument()
      expect(screen.getByText(/Software Engineer at Tech Corp/)).toBeInTheDocument()
      expect(screen.getByText('Built scalable APIs')).toBeInTheDocument()
    })

    it('renders Education section with heading and entry', () => {
      const cv = createPopulatedCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument()
      expect(screen.getByText('MIT')).toBeInTheDocument()
      expect(screen.getByText('Bachelor of Science in Computer Science')).toBeInTheDocument()
    })

    it('renders Projects section with heading and entry', () => {
      const cv = createPopulatedCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
      expect(screen.getByText('Open Source Tool')).toBeInTheDocument()
      expect(screen.getByText('A developer productivity tool')).toBeInTheDocument()
      expect(screen.getByText('10k+ GitHub stars')).toBeInTheDocument()
    })

    it('renders Skills section with heading and chips', () => {
      const cv = createPopulatedCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })

    it('renders Certifications section with heading and entry', () => {
      const cv = createPopulatedCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.getByRole('heading', { name: /certifications/i })).toBeInTheDocument()
      expect(screen.getByText('AWS Solutions Architect')).toBeInTheDocument()
      expect(screen.getByText(/Amazon/)).toBeInTheDocument()
    })

    it('renders Languages section with heading and entries', () => {
      const cv = createPopulatedCv()
      render(<TemplateV1 cv={cv} />)

      expect(screen.getByRole('heading', { name: /languages/i })).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
      expect(screen.getByText(/Native/)).toBeInTheDocument()
      expect(screen.getByText('Spanish')).toBeInTheDocument()
    })
  })

  describe('section ordering', () => {
    it('renders sections in correct order', () => {
      const cv = createPopulatedCv()
      const { container } = render(<TemplateV1 cv={cv} />)

      const headings = container.querySelectorAll('h2')
      const headingTexts = Array.from(headings).map(h => h.textContent)

      expect(headingTexts).toEqual([
        'Experience',
        'Education',
        'Projects',
        'Skills',
        'Certifications',
        'Languages',
      ])
    })
  })

  describe('styling consistency', () => {
    it('renders bullet points for experience highlights', () => {
      const cv = createPopulatedCv()
      const { container } = render(<TemplateV1 cv={cv} />)

      const experienceList = container.querySelector('section ul.list-disc')
      expect(experienceList).toBeInTheDocument()
    })

    it('renders bullet points for project highlights', () => {
      const cv = createPopulatedCv()
      const { container } = render(<TemplateV1 cv={cv} />)

      // Both Experience and Projects should have list-disc
      const lists = container.querySelectorAll('ul.list-disc')
      expect(lists.length).toBeGreaterThanOrEqual(2)
    })
  })
})
