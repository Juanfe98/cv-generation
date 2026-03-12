import { StyleSheet } from '@react-pdf/renderer'

/**
 * Color palette for Creative PDF template
 */
const colors = {
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748b',
  slate300: '#cbd5e1',
  blue500: '#3b82f6',
  blue600: '#2563eb',
}

/**
 * PDF styles for Creative Template
 * Timeline-based layout with visual chronology
 */
export const styles = StyleSheet.create({
  // Page
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: colors.slate900,
  },

  // Header (centered)
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.slate300,
    paddingBottom: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: colors.slate900,
    textAlign: 'center',
  },
  headline: {
    fontSize: 14,
    color: colors.slate600,
    marginTop: 4,
    textAlign: 'center',
  },
  contactLine: {
    fontSize: 9,
    color: colors.slate500,
    marginTop: 8,
    textAlign: 'center',
  },

  // Main section headings (with blue accent)
  section: {
    marginTop: 20,
  },
  sectionHeading: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.slate800,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: colors.blue500,
    paddingBottom: 4,
    marginBottom: 12,
  },

  // Timeline container
  timelineContainer: {
    position: 'relative',
    paddingLeft: 24,
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 8,
    bottom: 8,
    width: 2,
    backgroundColor: colors.slate300,
  },

  // Timeline entry
  timelineEntry: {
    position: 'relative',
    marginBottom: 16,
  },
  timelineEntryLast: {
    position: 'relative',
    marginBottom: 0,
  },
  timelineDot: {
    position: 'absolute',
    left: -21,
    top: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.blue500,
  },
  timelineDate: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.blue600,
    marginBottom: 2,
  },
  timelineTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.slate900,
  },
  timelineSubtitle: {
    fontSize: 9,
    color: colors.slate500,
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

  // Two-column grid (Education + Skills)
  twoColumnGrid: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 20,
  },
  gridColumn: {
    width: '50%',
  },
  gridHeading: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.slate800,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate300,
    paddingBottom: 4,
    marginBottom: 10,
  },

  // Education entry
  educationEntry: {
    marginBottom: 10,
  },
  educationTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.slate900,
  },
  educationDate: {
    fontSize: 9,
    color: colors.slate500,
    marginTop: 2,
  },
  educationDegree: {
    fontSize: 9,
    color: colors.slate600,
    marginTop: 2,
  },

  // Skills list
  skillsList: {
    paddingLeft: 12,
  },
  skillItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  skillBullet: {
    fontSize: 9,
    color: colors.slate700,
    width: 10,
  },
  skillText: {
    fontSize: 9,
    color: colors.slate700,
    flex: 1,
  },

  // Projects section
  projectEntry: {
    marginTop: 10,
  },
  projectEntryFirst: {
    marginTop: 0,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    flexWrap: 'wrap',
  },
  projectTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.slate900,
  },
  projectDescription: {
    fontSize: 9,
    color: colors.slate600,
  },
  projectLink: {
    fontSize: 9,
    color: colors.blue600,
    marginTop: 2,
  },
})
