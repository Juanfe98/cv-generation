/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo } from 'react'
import type { AccentColor, SpacingPreset } from '../cv/types'
import type { ThemeContextValue, ThemeTokens } from './types'
import { ACCENT_COLORS, SPACING_PRESETS } from './tokens'

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  accentColor: AccentColor
  spacingPreset: SpacingPreset
  children: React.ReactNode
}

export function ThemeProvider({ accentColor, spacingPreset, children }: ThemeProviderProps) {
  const tokens: ThemeTokens = useMemo(
    () => ({
      accentColor: ACCENT_COLORS[accentColor],
      spacing: SPACING_PRESETS[spacingPreset],
    }),
    [accentColor, spacingPreset]
  )

  // Inject CSS variables for HTML templates
  useEffect(() => {
    const root = document.documentElement
    const colors = tokens.accentColor
    const spacing = tokens.spacing

    // Accent colors
    root.style.setProperty('--theme-accent-primary', colors.primary)
    root.style.setProperty('--theme-accent-light', colors.light)
    root.style.setProperty('--theme-accent-dark', colors.dark)

    // Spacing
    root.style.setProperty('--theme-section-gap', `${spacing.sectionGap}px`)
    root.style.setProperty('--theme-entry-gap', `${spacing.entryGap}px`)
    root.style.setProperty('--theme-page-padding', `${spacing.pagePadding}px`)

    return () => {
      root.style.removeProperty('--theme-accent-primary')
      root.style.removeProperty('--theme-accent-light')
      root.style.removeProperty('--theme-accent-dark')
      root.style.removeProperty('--theme-section-gap')
      root.style.removeProperty('--theme-entry-gap')
      root.style.removeProperty('--theme-page-padding')
    }
  }, [tokens])

  const value: ThemeContextValue = useMemo(
    () => ({
      accentColor,
      spacingPreset,
      tokens,
    }),
    [accentColor, spacingPreset, tokens]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function useThemeTokens(): ThemeTokens {
  return useTheme().tokens
}
