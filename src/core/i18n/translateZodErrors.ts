import type { FieldErrors, FieldError, FieldValues } from 'react-hook-form'
import i18n from './config'

/**
 * Translates a single error message if it's a translation key
 * Translation keys are in the format "namespace:key" (e.g., "validation:fieldRequired")
 */
export function translateErrorMessage(message: string | undefined): string {
  if (!message) return ''

  // Check if the message looks like a translation key (namespace:key format)
  if (message.includes(':') && !message.includes(' ')) {
    const translated = i18n.t(message)
    // If translation is the same as the key, it wasn't found - return original
    return translated !== message ? translated : message
  }

  return message
}

/**
 * Translates all error messages in a FieldErrors object
 * Works recursively for nested errors
 */
export function translateFieldErrors<T extends FieldValues>(
  errors: FieldErrors<T>
): FieldErrors<T> {
  const translated: FieldErrors<T> = {} as FieldErrors<T>

  for (const key in errors) {
    const error = errors[key]

    if (!error) continue

    if (typeof error === 'object' && 'message' in error) {
      // It's a FieldError
      const fieldError = error as FieldError
      translated[key as keyof T] = {
        ...fieldError,
        message: translateErrorMessage(fieldError.message),
      } as FieldErrors<T>[keyof T]
    } else if (typeof error === 'object') {
      // It's nested errors (for arrays or nested objects)
      translated[key as keyof T] = translateFieldErrors(
        error as FieldErrors<FieldValues>
      ) as FieldErrors<T>[keyof T]
    }
  }

  return translated
}
