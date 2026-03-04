import { createContext } from 'react'
import type { Draft } from 'immer'
import type { CvModel } from '../../core'

export interface CvContextValue {
  cv: CvModel
  setCv: (cv: CvModel) => void
  updateCv: (updater: (draft: Draft<CvModel>) => void) => void
  resetCv: () => void
  isSaving: boolean
}

export const CvContext = createContext<CvContextValue | null>(null)
