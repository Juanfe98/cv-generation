import { StyleSheet } from '@react-pdf/renderer'
import type { AccentColor, SpacingPreset } from '../../../cv/types'
import { ACCENT_COLORS, SPACING_PRESETS } from '../../../theme'

/**
 * Color palette matching the HTML template
 */
const baseColors = {
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748b',
  slate300: '#cbd5e1',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
}

export interface ThemeConfig {
  accentColor: AccentColor
  spacingPreset: SpacingPreset
}

/**
 * Creates PDF styles based on theme configuration
 */
export function createStyles(theme: ThemeConfig) {
  const accentColors = ACCENT_COLORS[theme.accentColor]
  const spacing = SPACING_PRESETS[theme.spacingPreset]

  return StyleSheet.create({
    // Page
    page: {
      padding: spacing.pagePadding,
      fontSize: 10,
      fontFamily: 'Helvetica',
      color: baseColors.slate900,
    },

    // Profile/Header section
    header: {
      borderBottomWidth: 1,
      borderBottomColor: baseColors.slate300,
      paddingBottom: 16,
      marginBottom: 0,
    },
    name: {
      fontSize: 20,
      fontFamily: 'Helvetica-Bold',
      color: baseColors.slate900,
    },
    headline: {
      fontSize: 14,
      color: baseColors.slate600,
      marginTop: 4,
    },
    contactLine: {
      fontSize: 9,
      color: baseColors.slate500,
      marginTop: 8,
    },

    // Section container
    section: {
      marginTop: spacing.sectionGap,
    },
    sectionHeading: {
      fontSize: 14,
      fontFamily: 'Helvetica-Bold',
      color: baseColors.slate800,
      borderBottomWidth: 1,
      borderBottomColor: baseColors.slate200,
      paddingBottom: 4,
      marginBottom: spacing.entryGap,
    },

    // Entry items (experience, education, projects)
    entry: {
      marginTop: spacing.entryGap,
    },
    entryFirst: {
      marginTop: 0,
    },
    entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16,
    },
    entryTitle: {
      fontSize: 11,
      fontFamily: 'Helvetica-Bold',
      color: baseColors.slate900,
      flex: 1,
    },
    entryDate: {
      fontSize: 9,
      color: baseColors.slate500,
      flexShrink: 0,
    },
    entrySubtitle: {
      fontSize: 9,
      color: baseColors.slate500,
      marginTop: 2,
    },
    entryDescription: {
      fontSize: 9,
      color: baseColors.slate600,
      marginTop: 2,
    },

    // Highlights list (bullet points)
    highlightsList: {
      marginTop: 6,
      paddingLeft: 0,
    },
    highlightItem: {
      flexDirection: 'row',
      marginTop: 3,
      paddingRight: 10,
    },
    highlightBullet: {
      fontSize: 9,
      color: baseColors.slate700,
      width: 12,
    },
    highlightText: {
      fontSize: 9,
      color: baseColors.slate700,
      flex: 1,
    },

    // Skills (chips)
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 0,
    },
    skillChip: {
      fontSize: 9,
      color: baseColors.slate700,
      backgroundColor: baseColors.slate100,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 12,
    },

    // Compact entries (certifications, languages)
    compactEntry: {
      marginTop: 6,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    compactEntryFirst: {
      marginTop: 0,
    },
    compactEntryName: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: baseColors.slate900,
    },
    compactEntryDetails: {
      fontSize: 10,
      color: baseColors.slate500,
    },

    // Link
    link: {
      fontSize: 9,
      color: accentColors.primary,
      flexShrink: 0,
      maxWidth: 200,
    },
  })
}

// Default styles for backward compatibility
export const styles = createStyles({ accentColor: 'blue', spacingPreset: 'standard' })
