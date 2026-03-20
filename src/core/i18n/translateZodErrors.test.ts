import type { FieldErrors } from 'react-hook-form'
import { describe, it, expect } from 'vitest'
import { translateErrorMessage, translateFieldErrors } from './translateZodErrors'

describe('translateZodErrors', () => {
  describe('translateErrorMessage', () => {
    it('translates validation:fieldRequired to English', () => {
      const result = translateErrorMessage('validation:fieldRequired')
      expect(result).toBe('This field is required')
    })

    it('translates validation:invalidEmail to English', () => {
      const result = translateErrorMessage('validation:invalidEmail')
      expect(result).toBe('Please enter a valid email address')
    })

    it('passes through non-translation key messages', () => {
      const message = 'Some custom error message'
      const result = translateErrorMessage(message)
      expect(result).toBe(message)
    })

    it('returns empty string for undefined', () => {
      const result = translateErrorMessage(undefined)
      expect(result).toBe('')
    })

    it('passes through messages with spaces (not translation keys)', () => {
      const message = 'This has spaces so not a key'
      const result = translateErrorMessage(message)
      expect(result).toBe(message)
    })
  })

  describe('translateFieldErrors', () => {
    it('translates nested field errors', () => {
      const errors = {
        fullName: { message: 'validation:fieldRequired', type: 'required' },
        email: { message: 'validation:invalidEmail', type: 'invalid' },
      }

      const result = translateFieldErrors(errors)

      expect(result.fullName?.message).toBe('This field is required')
      expect(result.email?.message).toBe('Please enter a valid email address')
    })

    it('handles empty errors object', () => {
      const result = translateFieldErrors({})
      expect(result).toEqual({})
    })

    it('preserves other error properties', () => {
      const errors: FieldErrors<{ field: string }> = {
        field: { message: 'validation:fieldRequired', type: 'required' },
      }

      const result = translateFieldErrors(errors)

      expect(result.field?.type).toBe('required')
      expect(result.field?.message).toBe('This field is required')
    })
  })
})
