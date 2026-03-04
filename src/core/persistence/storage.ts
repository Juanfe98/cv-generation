import { createEmptyCv, safeParseCv } from '../cv'
import type { CvModel } from '../cv'
import { STORAGE_KEY } from './constants'

/**
 * Load CV from localStorage
 * Returns empty CV if storage is missing, invalid JSON, or invalid schema
 */
export function loadCv(): CvModel {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return createEmptyCv()
    }

    const parsed = JSON.parse(stored)
    const result = safeParseCv(parsed)

    if (!result.success) {
      console.warn('Invalid CV data in localStorage, returning empty CV')
      return createEmptyCv()
    }

    return result.data
  } catch (error) {
    console.warn('Error loading CV from localStorage:', error)
    return createEmptyCv()
  }
}

/**
 * Save CV to localStorage
 */
export function saveCv(cv: CvModel): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
}

/**
 * Clear storage and return empty CV
 */
export function resetCv(): CvModel {
  localStorage.removeItem(STORAGE_KEY)
  return createEmptyCv()
}
