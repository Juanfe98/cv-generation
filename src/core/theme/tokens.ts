import type { AccentColor, SpacingPreset } from '../cv/types'
import type { AccentColorTokens, SpacingTokens } from './types'

export const ACCENT_COLORS: Record<AccentColor, AccentColorTokens> = {
  blue: { primary: '#2563eb', light: '#dbeafe', dark: '#1e40af' },
  emerald: { primary: '#059669', light: '#d1fae5', dark: '#065f46' },
  violet: { primary: '#7c3aed', light: '#ede9fe', dark: '#5b21b6' },
  amber: { primary: '#d97706', light: '#fef3c7', dark: '#92400e' },
}

export const SPACING_PRESETS: Record<SpacingPreset, SpacingTokens> = {
  compact: { sectionGap: 16, entryGap: 8, pagePadding: 32 },
  standard: { sectionGap: 24, entryGap: 12, pagePadding: 40 },
  relaxed: { sectionGap: 32, entryGap: 16, pagePadding: 48 },
}

export const ACCENT_COLOR_OPTIONS: { value: AccentColor; label: string; colorClass: string }[] = [
  { value: 'blue', label: 'Blue', colorClass: 'bg-blue-500' },
  { value: 'emerald', label: 'Emerald', colorClass: 'bg-emerald-500' },
  { value: 'violet', label: 'Violet', colorClass: 'bg-violet-500' },
  { value: 'amber', label: 'Amber', colorClass: 'bg-amber-500' },
]

export const SPACING_PRESET_OPTIONS: { value: SpacingPreset; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'standard', label: 'Standard' },
  { value: 'relaxed', label: 'Relaxed' },
]
