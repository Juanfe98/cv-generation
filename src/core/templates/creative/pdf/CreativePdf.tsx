import { Document, Page, View, Text, Link } from '@react-pdf/renderer'
import type {
  CvModel,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  Profile,
} from '../../../cv/types'
import type { TemplateFormatters } from '../../index'
import { styles } from './styles'

interface CreativePdfProps {
  cv: CvModel
  formatters: TemplateFormatters
}

// Header (centered with contact line)
function HeaderSection({
  profile,
  formatContactLine,
}: {
  profile: Profile
  formatContactLine: TemplateFormatters['formatContactLine']
}) {
  const contactLine = formatContactLine(profile)

  return (
    <View style={styles.header}>
      <Text style={styles.name}>{profile.fullName}</Text>
      {profile.headline && <Text style={styles.headline}>{profile.headline}</Text>}
      {contactLine && <Text style={styles.contactLine}>{contactLine}</Text>}
    </View>
  )
}

// Highlights list
function HighlightsList({ highlights }: { highlights: string[] }) {
  if (highlights.length === 0) return null

  return (
    <View style={styles.highlightsList}>
      {highlights.map((highlight, index) => (
        <View key={index} style={styles.highlightItem}>
          <Text style={styles.highlightBullet}>{'\u2022'}</Text>
          <Text style={styles.highlightText}>{highlight}</Text>
        </View>
      ))}
    </View>
  )
}

// Timeline entry
function TimelineEntry({
  item,
  isLast,
  formatDateRange,
}: {
  item: ExperienceItem
  isLast: boolean
  formatDateRange: TemplateFormatters['formatDateRange']
}) {
  const dateRange = formatDateRange(item.startDate, item.endDate, item.isCurrent)

  return (
    <View style={isLast ? styles.timelineEntryLast : styles.timelineEntry}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineDate}>{dateRange}</Text>
      <Text style={styles.timelineTitle}>
        {item.role} at {item.company}
      </Text>
      {item.location && <Text style={styles.timelineSubtitle}>{item.location}</Text>}
      <HighlightsList highlights={item.highlights} />
    </View>
  )
}

// Experience Timeline Section
function ExperienceTimelineSection({
  experience,
  formatDateRange,
}: {
  experience: ExperienceItem[]
  formatDateRange: TemplateFormatters['formatDateRange']
}) {
  if (experience.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Experience</Text>
      <View style={styles.timelineContainer}>
        {experience.length > 1 && <View style={styles.timelineLine} />}
        {experience.map((item, index) => (
          <TimelineEntry
            key={item.id}
            item={item}
            isLast={index === experience.length - 1}
            formatDateRange={formatDateRange}
          />
        ))}
      </View>
    </View>
  )
}

// Education entry
function EducationEntry({
  item,
  formatters,
}: {
  item: EducationItem
  formatters: Pick<TemplateFormatters, 'formatEducationDateRange' | 'formatDegreeField'>
}) {
  const dateRange = formatters.formatEducationDateRange(item.startDate, item.endDate)
  const degreeField = formatters.formatDegreeField(item.degree, item.field)

  return (
    <View style={styles.educationEntry}>
      <Text style={styles.educationTitle}>{item.institution}</Text>
      {dateRange && <Text style={styles.educationDate}>{dateRange}</Text>}
      {degreeField && <Text style={styles.educationDegree}>{degreeField}</Text>}
    </View>
  )
}

// Education Section (for grid)
function EducationSection({
  education,
  formatters,
}: {
  education: EducationItem[]
  formatters: Pick<TemplateFormatters, 'formatEducationDateRange' | 'formatDegreeField'>
}) {
  if (education.length === 0) return null

  return (
    <View style={styles.gridColumn}>
      <Text style={styles.gridHeading}>Education</Text>
      {education.map((item) => (
        <EducationEntry key={item.id} item={item} formatters={formatters} />
      ))}
    </View>
  )
}

// Skills Section (for grid)
function SkillsSection({ skills }: { skills: string[] }) {
  if (skills.length === 0) return null

  return (
    <View style={styles.gridColumn}>
      <Text style={styles.gridHeading}>Skills</Text>
      <View style={styles.skillsList}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillItem}>
            <Text style={styles.skillBullet}>{'\u2022'}</Text>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

// Project entry
function ProjectEntry({ item, isFirst }: { item: ProjectItem; isFirst: boolean }) {
  return (
    <View style={isFirst ? styles.projectEntryFirst : styles.projectEntry}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{item.name}</Text>
        {item.description && <Text style={styles.projectDescription}>— {item.description}</Text>}
      </View>
      {item.link && (
        <Link src={item.link} style={styles.projectLink}>
          {item.link}
        </Link>
      )}
      <HighlightsList highlights={item.highlights} />
    </View>
  )
}

// Projects Section
function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  if (projects.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Projects</Text>
      {projects.map((item, index) => (
        <ProjectEntry key={item.id} item={item} isFirst={index === 0} />
      ))}
    </View>
  )
}

/**
 * Creative PDF Template - Timeline-based layout
 *
 * Layout:
 * - Header (full width, centered): Name, Headline, Contact line
 * - Experience (full width): Timeline with dots for visual chronology
 * - Two-column grid: Education + Skills
 * - Projects (full width)
 *
 * Empty sections are automatically omitted.
 */
export function CreativePdf({ cv, formatters }: CreativePdfProps) {
  const hasEducationOrSkills = cv.education.length > 0 || cv.skills.length > 0

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <HeaderSection profile={cv.profile} formatContactLine={formatters.formatContactLine} />

        {/* Experience Timeline */}
        <ExperienceTimelineSection
          experience={cv.experience}
          formatDateRange={formatters.formatDateRange}
        />

        {/* Two-column: Education + Skills */}
        {hasEducationOrSkills && (
          <View style={styles.twoColumnGrid}>
            <EducationSection
              education={cv.education}
              formatters={{
                formatEducationDateRange: formatters.formatEducationDateRange,
                formatDegreeField: formatters.formatDegreeField,
              }}
            />
            <SkillsSection skills={cv.skills} />
          </View>
        )}

        {/* Projects */}
        <ProjectsSection projects={cv.projects} />
      </Page>
    </Document>
  )
}
