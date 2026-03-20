import { useEffect, useState } from 'react'

interface UseParallaxOptions {
  /** Speed multiplier. 0.1 = slow, 0.5 = medium. Negative values move opposite direction. */
  speed?: number
  /** Maximum offset in pixels to prevent extreme movement */
  maxOffset?: number
}

// Check for reduced motion preference
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useParallax({
  speed = 0.15,
  maxOffset = 100,
}: UseParallaxOptions = {}) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    // Skip if user prefers reduced motion
    if (prefersReducedMotion) {
      return
    }

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          // Calculate offset with speed multiplier, clamped to maxOffset
          const rawOffset = scrollY * speed
          const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset))
          setOffset(clampedOffset)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial calculation
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, maxOffset])

  return { offset, style: { transform: `translateY(${offset}px)` } }
}
