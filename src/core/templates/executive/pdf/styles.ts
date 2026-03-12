import { StyleSheet } from '@react-pdf/renderer'

/**
 * Color palette for Executive PDF template
 */
const colors = {
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748b',
  slate300: '#cbd5e1',
  slate200: '#e2e8f0',
  blue600: '#2563eb',
}

/**
 * PDF styles for Executive Template
 * Two-column layout (no photo) for senior professionals
 */
export const styles = StyleSheet.create({
  // Page
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: colors.slate900,
  },

  // Header (full width at top)
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.slate300,
    paddingBottom: 16,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: colors.slate900,
  },
  headline: {
    fontSize: 14,
    color: colors.slate600,
    marginTop: 4,
  },

  // Two-column layout
  twoColumn: {
    flexDirection: 'row',
    gap: 20,
  },
  sidebar: {
    width: '30%',
  },
  main: {
    width: '70%',
  },

  // Sidebar section
  sidebarSection: {
    marginBottom: 16,
  },
  sidebarHeading: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sidebarItem: {
    fontSize: 9,
    color: colors.slate700,
    marginBottom: 4,
  },

  // Links section
  linkItem: {
    marginBottom: 4,
  },
  link: {
    fontSize: 9,
    color: colors.blue600,
  },

  // Skills in sidebar
  skillItem: {
    fontSize: 9,
    color: colors.slate700,
    marginBottom: 4,
  },

  // Main section
  section: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.slate800,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    paddingBottom: 4,
    marginBottom: 12,
  },

  // Entry items
  entry: {
    marginTop: 10,
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
    color: colors.slate900,
    flex: 1,
  },
  entryDate: {
    fontSize: 9,
    color: colors.slate500,
    flexShrink: 0,
  },
  entrySubtitle: {
    fontSize: 9,
    color: colors.slate500,
    marginTop: 2,
  },
  entryDescription: {
    fontSize: 9,
    color: colors.slate600,
    marginTop: 2,
  },

  // Highlights list
  highlightsList: {
    marginTop: 6,
  },
  highlightItem: {
    flexDirection: 'row',
    marginTop: 3,
  },
  highlightBullet: {
    fontSize: 9,
    color: colors.slate700,
    width: 12,
  },
  highlightText: {
    fontSize: 9,
    color: colors.slate700,
    flex: 1,
  },

  // Project link
  projectLink: {
    fontSize: 9,
    color: colors.blue600,
    flexShrink: 0,
    maxWidth: 200,
  },
})
