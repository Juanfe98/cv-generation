import { useContext } from 'react'
import { CvContext } from './CvContext'
import type { CvContextValue } from './CvContext'

export function useCv(): CvContextValue {
  const context = useContext(CvContext)

  if (context === null) {
    throw new Error('useCv must be used within a CvProvider')
  }

  return context
}
