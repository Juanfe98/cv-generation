import type { AccentColor, SpacingPreset } from '../cv/types'

export interface AccentColorTokens {
  primary: string
  light: string
  dark: string
}

export interface SpacingTokens {
  sectionGap: number
  entryGap: number
  pagePadding: number
}

export interface ThemeTokens {
  accentColor: AccentColorTokens
  spacing: SpacingTokens
}

export interface ThemeContextValue {
  accentColor: AccentColor
  spacingPreset: SpacingPreset
  tokens: ThemeTokens
}
