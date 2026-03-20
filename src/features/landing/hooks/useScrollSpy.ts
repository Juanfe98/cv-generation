import { useEffect, useState } from 'react'

interface UseScrollSpyOptions {
  /** IDs of sections to track (without #) */
  sectionIds: string[]
  /** Offset from top of viewport to trigger active state */
  offset?: number
}

export function useScrollSpy({
  sectionIds,
  offset = 100,
}: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Find the section that's currently in view
      let currentActiveId: string | null = null

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        // Section is considered active if its top is above the offset point
        // and its bottom is still below the offset point
        if (rect.top <= offset && rect.bottom > offset) {
          currentActiveId = id
          break
        }
      }

      // If we're at the top of the page, no section is active
      if (window.scrollY < 50) {
        currentActiveId = null
      }

      setActiveId(currentActiveId)
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeId
}
