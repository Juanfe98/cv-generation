import { useState, useEffect, useRef, useCallback } from 'react'
import type { SetStateAction } from 'react'
import type { CvModel } from '../../core'
import { loadCv, saveCv, resetCv } from '../../core'

const DEBOUNCE_MS = 300

interface UsePersistedCvActions {
  reset: () => void
  isSaving: boolean
}

type UsePersistedCvReturn = [
  CvModel,
  (action: SetStateAction<CvModel>) => void,
  UsePersistedCvActions,
]

export function usePersistedCv(): UsePersistedCvReturn {
  const [cv, setCv] = useState<CvModel>(() => loadCv())
  const isInitialMount = useRef(true)
  const [isSaving, setIsSaving] = useState(false)

  const wrappedSetCv = useCallback((action: SetStateAction<CvModel>) => {
    setIsSaving(true)
    setCv(action)
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const timeoutId = setTimeout(() => {
      saveCv(cv)
      setIsSaving(false)
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [cv])

  const reset = useCallback(() => {
    const emptyCv = resetCv()
    setCv(emptyCv)
  }, [])

  return [cv, wrappedSetCv, { reset, isSaving }]
}
