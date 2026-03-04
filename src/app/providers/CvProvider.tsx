import { useCallback } from 'react'
import type { ReactNode } from 'react'
import { produce } from 'immer'
import type { Draft } from 'immer'
import type { CvModel } from '../../core'
import { usePersistedCv } from '../../shared/hooks'
import { CvContext } from './CvContext'
import type { CvContextValue } from './CvContext'

interface CvProviderProps {
  children: ReactNode
}

export function CvProvider({ children }: CvProviderProps) {
  const [cv, setCvInternal, { reset, isSaving }] = usePersistedCv()

  const setCv = useCallback(
    (newCv: CvModel) => {
      setCvInternal(newCv)
    },
    [setCvInternal]
  )

  const updateCv = useCallback(
    (updater: (draft: Draft<CvModel>) => void) => {
      setCvInternal(prev => produce(prev, updater))
    },
    [setCvInternal]
  )

  const value: CvContextValue = {
    cv,
    setCv,
    updateCv,
    resetCv: reset,
    isSaving,
  }

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>
}
