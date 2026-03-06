import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatDateRange,
  formatEducationDateRange,
  formatContactLine,
  formatDegreeField,
} from './index'

describe('formatDate', () => {
  it('formats YYYY-MM to readable date', () => {
    expect(formatDate('2024-01')).toBe('Jan 2024')
    expect(formatDate('2023-12')).toBe('Dec 2023')
    expect(formatDate('2020-06')).toBe('Jun 2020')
  })

  it('returns empty string for empty input', () => {
    expect(formatDate('')).toBe('')
  })

  it('returns empty string for invalid input', () => {
    expect(formatDate('invalid')).toBe('')
    expect(formatDate('2024')).toBe('')
  })
})

describe('formatDateRange', () => {
  it('formats date range with start and end', () => {
    expect(formatDateRange('2020-01', '2022-12')).toBe('Jan 2020 – Dec 2022')
  })

  it('formats current role with Present', () => {
    expect(formatDateRange('2022-06', '', true)).toBe('Jun 2022 – Present')
  })

  it('ignores end date when isCurrent is true', () => {
    expect(formatDateRange('2022-06', '2023-12', true)).toBe('Jun 2022 – Present')
  })

  it('handles missing start date gracefully', () => {
    expect(formatDateRange('', '2022-12')).toBe(' – Dec 2022')
  })

  it('handles missing end date gracefully', () => {
    expect(formatDateRange('2020-01', '')).toBe('Jan 2020 – ')
  })
})

describe('formatEducationDateRange', () => {
  it('formats date range with both dates', () => {
    expect(formatEducationDateRange('2018-09', '2022-05')).toBe('Sep 2018 – May 2022')
  })

  it('uses ? for missing start date', () => {
    expect(formatEducationDateRange('', '2022-05')).toBe('? – May 2022')
  })

  it('uses ? for missing end date', () => {
    expect(formatEducationDateRange('2018-09', '')).toBe('Sep 2018 – ?')
  })

  it('returns null when both dates are empty', () => {
    expect(formatEducationDateRange('', '')).toBeNull()
  })
})

describe('formatContactLine', () => {
  it('formats all contact fields', () => {
    const profile = {
      fullName: 'John Doe',
      headline: '',
      email: 'john@example.com',
      phone: '555-1234',
      location: 'New York',
      website: 'https://john.dev',
      links: [],
    }
    expect(formatContactLine(profile)).toBe(
      'john@example.com • 555-1234 • New York • https://john.dev'
    )
  })

  it('omits empty fields (no undefined •)', () => {
    const profile = {
      fullName: 'John Doe',
      headline: '',
      email: 'john@example.com',
      phone: '',
      location: 'New York',
      website: '',
      links: [],
    }
    expect(formatContactLine(profile)).toBe('john@example.com • New York')
  })

  it('returns empty string when all fields are empty', () => {
    const profile = {
      fullName: 'John Doe',
      headline: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      links: [],
    }
    expect(formatContactLine(profile)).toBe('')
  })

  it('handles single field', () => {
    const profile = {
      fullName: 'John Doe',
      headline: '',
      email: 'john@example.com',
      phone: '',
      location: '',
      website: '',
      links: [],
    }
    expect(formatContactLine(profile)).toBe('john@example.com')
  })
})

describe('formatDegreeField', () => {
  it('combines degree and field', () => {
    expect(formatDegreeField('Bachelor of Science', 'Computer Science')).toBe(
      'Bachelor of Science in Computer Science'
    )
  })

  it('returns only degree when field is empty', () => {
    expect(formatDegreeField('PhD', '')).toBe('PhD')
  })

  it('returns only field when degree is empty', () => {
    expect(formatDegreeField('', 'Biology')).toBe('Biology')
  })

  it('returns empty string when both are empty', () => {
    expect(formatDegreeField('', '')).toBe('')
  })
})
