import { describe, it, expect } from 'vitest'
import {
  trimString,
  normalizeStringArray,
  normalizeSkills,
  normalizeProfileLinks,
  normalizeProfile,
  normalizeExperienceItem,
} from './normalize'

describe('trimString', () => {
  it('trims whitespace from both ends', () => {
    expect(trimString('  hello  ')).toBe('hello')
    expect(trimString('\n\ttest\n')).toBe('test')
  })

  it('returns empty string for whitespace-only input', () => {
    expect(trimString('   ')).toBe('')
  })
})

describe('normalizeStringArray', () => {
  it('trims whitespace from entries', () => {
    expect(normalizeStringArray(['  hello  ', 'world  '])).toEqual([
      'hello',
      'world',
    ])
  })

  it('removes empty entries', () => {
    expect(normalizeStringArray(['hello', '', '  ', 'world'])).toEqual([
      'hello',
      'world',
    ])
  })

  it('handles mixed whitespace and content', () => {
    expect(
      normalizeStringArray(['  first  ', '', 'second', '   ', 'third'])
    ).toEqual(['first', 'second', 'third'])
  })

  it('returns empty array when all entries are empty', () => {
    expect(normalizeStringArray(['', '  ', '\n'])).toEqual([])
  })
})

describe('normalizeSkills', () => {
  it('trims and removes empty skills', () => {
    expect(normalizeSkills(['  React  ', '', 'TypeScript'])).toEqual([
      'React',
      'TypeScript',
    ])
  })

  it('removes case-insensitive duplicates', () => {
    expect(normalizeSkills(['React', 'react', 'REACT'])).toEqual(['React'])
    expect(normalizeSkills(['TypeScript', 'typescript', 'Typescript'])).toEqual([
      'TypeScript',
    ])
  })

  it('keeps first occurrence of duplicates', () => {
    const result = normalizeSkills(['react', 'React', 'REACT'])
    expect(result).toEqual(['react'])
  })

  it('handles mixed duplicates and unique skills', () => {
    expect(
      normalizeSkills(['React', 'Vue', 'react', 'Angular', 'vue'])
    ).toEqual(['React', 'Vue', 'Angular'])
  })

  it('trims before comparing for duplicates', () => {
    expect(normalizeSkills(['  React  ', 'React', '  react  '])).toEqual([
      'React',
    ])
  })
})

describe('normalizeProfileLinks', () => {
  it('trims label and url', () => {
    const links = [{ label: '  GitHub  ', url: '  https://github.com  ' }]
    expect(normalizeProfileLinks(links)).toEqual([
      { label: 'GitHub', url: 'https://github.com' },
    ])
  })

  it('removes entries with empty urls', () => {
    const links = [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Empty', url: '' },
      { label: 'Whitespace', url: '   ' },
    ]
    expect(normalizeProfileLinks(links)).toEqual([
      { label: 'GitHub', url: 'https://github.com' },
    ])
  })

  it('removes exact duplicate urls', () => {
    const links = [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Also GitHub', url: 'https://github.com' },
      { label: 'LinkedIn', url: 'https://linkedin.com' },
    ]
    expect(normalizeProfileLinks(links)).toEqual([
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'LinkedIn', url: 'https://linkedin.com' },
    ])
  })

  it('trims urls before comparing for duplicates', () => {
    const links = [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Dupe', url: '  https://github.com  ' },
    ]
    expect(normalizeProfileLinks(links)).toEqual([
      { label: 'GitHub', url: 'https://github.com' },
    ])
  })
})

describe('normalizeProfile', () => {
  it('trims all string fields', () => {
    const profile = {
      fullName: '  John Doe  ',
      headline: '  Developer  ',
      location: '  NYC  ',
      email: '  john@example.com  ',
      phone: '  555-1234  ',
      website: '  https://john.dev  ',
      links: [],
    }
    expect(normalizeProfile(profile)).toEqual({
      fullName: 'John Doe',
      headline: 'Developer',
      location: 'NYC',
      email: 'john@example.com',
      phone: '555-1234',
      website: 'https://john.dev',
      links: [],
    })
  })

  it('normalizes links array', () => {
    const profile = {
      fullName: 'John',
      headline: '',
      location: '',
      email: '',
      phone: '',
      website: '',
      links: [
        { label: '  GitHub  ', url: '  https://github.com  ' },
        { label: 'Empty', url: '' },
      ],
    }
    expect(normalizeProfile(profile).links).toEqual([
      { label: 'GitHub', url: 'https://github.com' },
    ])
  })
})

describe('normalizeExperienceItem', () => {
  const baseItem = {
    id: '1',
    company: '  Acme Corp  ',
    role: '  Developer  ',
    location: '  Remote  ',
    startDate: '  2020-01  ',
    endDate: '  2022-12  ',
    isCurrent: false,
    highlights: ['  Led team  ', '', '  Shipped features  '],
  }

  it('trims string fields', () => {
    const result = normalizeExperienceItem(baseItem)
    expect(result.company).toBe('Acme Corp')
    expect(result.role).toBe('Developer')
    expect(result.location).toBe('Remote')
    expect(result.startDate).toBe('2020-01')
    expect(result.endDate).toBe('2022-12')
  })

  it('normalizes highlights array', () => {
    const result = normalizeExperienceItem(baseItem)
    expect(result.highlights).toEqual(['Led team', 'Shipped features'])
  })

  it('clears endDate when isCurrent is true', () => {
    const currentItem = {
      ...baseItem,
      isCurrent: true,
      endDate: '2022-12',
    }
    const result = normalizeExperienceItem(currentItem)
    expect(result.endDate).toBe('')
    expect(result.isCurrent).toBe(true)
  })

  it('preserves endDate when isCurrent is false', () => {
    const result = normalizeExperienceItem(baseItem)
    expect(result.endDate).toBe('2022-12')
    expect(result.isCurrent).toBe(false)
  })
})
