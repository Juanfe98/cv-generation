import { describe, it, expect } from 'vitest'
import { exportPdf, PdfExportError } from './exportPdf'
import type { CvModel, ExperienceItem } from '../cv/types'

const createMinimalCv = (): CvModel => ({
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
  settings: { templateId: 'classic' },
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
  settings: { templateId: 'classic' },
})

describe('exportPdf', () => {
  describe('successful exports', () => {
    it('returns Blob for minimal CV', async () => {
      const cv = createMinimalCv()
      const blob = await exportPdf(cv, 'v1')

      expect(blob).toBeInstanceOf(Blob)
      expect(blob.type).toBe('application/pdf')
      expect(blob.size).toBeGreaterThan(0)
    })

    it('returns Blob for fully populated CV', async () => {
      const cv = createPopulatedCv()
      const blob = await exportPdf(cv, 'v1')

      expect(blob).toBeInstanceOf(Blob)
      expect(blob.type).toBe('application/pdf')
      expect(blob.size).toBeGreaterThan(0)
    })
  })

  describe('validation', () => {
    it('throws PdfExportError for CV without name', async () => {
      const cv = createMinimalCv()
      cv.profile.fullName = ''

      await expect(exportPdf(cv, 'v1')).rejects.toThrow(PdfExportError)
      await expect(exportPdf(cv, 'v1')).rejects.toThrow('Full name is required')
    })

    it('throws PdfExportError for CV with whitespace-only name', async () => {
      const cv = createMinimalCv()
      cv.profile.fullName = '   '

      await expect(exportPdf(cv, 'v1')).rejects.toThrow(PdfExportError)
    })
  })

  describe('long content handling', () => {
    it('handles CV with many experience entries', async () => {
      const cv = createMinimalCv()
      cv.experience = Array.from({ length: 20 }, (_, i): ExperienceItem => ({
        id: `exp-${i}`,
        company: `Company ${i}`,
        role: `Software Engineer ${i}`,
        location: 'Remote',
        startDate: '2020-01',
        endDate: '2021-01',
        isCurrent: false,
        highlights: ['Built APIs', 'Led team'],
      }))

      const blob = await exportPdf(cv, 'v1')

      expect(blob).toBeInstanceOf(Blob)
      expect(blob.size).toBeGreaterThan(0)
    })

    it('handles CV with long highlights text', async () => {
      const cv = createMinimalCv()
      const longHighlight = 'A'.repeat(500)
      cv.experience = [
        {
          id: 'exp-1',
          company: 'Company',
          role: 'Engineer',
          location: 'Remote',
          startDate: '2020-01',
          endDate: '',
          isCurrent: true,
          highlights: [longHighlight, longHighlight],
        },
      ]

      const blob = await exportPdf(cv, 'v1')

      expect(blob).toBeInstanceOf(Blob)
      expect(blob.size).toBeGreaterThan(0)
    })

    it('handles CV with all sections populated with multiple entries', async () => {
      const cv = createPopulatedCv()

      // Add more entries to each section
      cv.experience.push({
        id: 'exp-2',
        company: 'Another Corp',
        role: 'Lead Engineer',
        location: 'NYC',
        startDate: '2018-01',
        endDate: '2022-01',
        isCurrent: false,
        highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
      })

      cv.education.push({
        id: 'edu-2',
        institution: 'Stanford',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: '2018-09',
        endDate: '2020-05',
      })

      cv.skills.push('Python', 'Go', 'Rust', 'Docker', 'Kubernetes')

      cv.projects.push({
        id: 'proj-2',
        name: 'Another Project',
        description: 'Description of another project',
        highlights: ['Feature 1', 'Feature 2'],
        link: 'https://example.com',
      })

      cv.languages.push({ id: 'lang-3', name: 'French', level: 'Basic' })

      cv.certifications.push({
        id: 'cert-2',
        name: 'GCP Professional',
        issuer: 'Google',
        date: '2024-01',
      })

      const blob = await exportPdf(cv, 'v1')

      expect(blob).toBeInstanceOf(Blob)
      expect(blob.size).toBeGreaterThan(0)
    })
  })
})
