import { Document, Page, View, Text, Link } from '@react-pdf/renderer'
import type {
  CvModel,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
  LanguageItem,
} from '../../../cv/types'
import type { TemplateFormatters } from '../../index'
import { createStyles } from './styles'

interface ClassicPdfProps {
  cv: CvModel
  formatters: TemplateFormatters
}

type Styles = ReturnType<typeof createStyles>

function ProfileSection({
  profile,
  formatContactLine,
  styles,
}: {
  profile: CvModel['profile']
  formatContactLine: TemplateFormatters['formatContactLine']
  styles: Styles
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

function HighlightsList({ highlights, styles }: { highlights: string[]; styles: Styles }) {
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

function ExperienceEntry({
  item,
  isFirst,
  formatDateRange,
  styles,
}: {
  item: ExperienceItem
  isFirst: boolean
  formatDateRange: TemplateFormatters['formatDateRange']
  styles: Styles
}) {
  const dateRange = formatDateRange(item.startDate, item.endDate, item.isCurrent)

  return (
    <View style={isFirst ? styles.entryFirst : styles.entry}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>
          {item.role} at {item.company}
        </Text>
        <Text style={styles.entryDate}>{dateRange}</Text>
      </View>
      {item.location && <Text style={styles.entrySubtitle}>{item.location}</Text>}
      <HighlightsList highlights={item.highlights} styles={styles} />
    </View>
  )
}

function ExperienceSection({
  experience,
  formatDateRange,
  styles,
}: {
  experience: ExperienceItem[]
  formatDateRange: TemplateFormatters['formatDateRange']
  styles: Styles
}) {
  if (experience.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Experience</Text>
      {experience.map((item, index) => (
        <ExperienceEntry
          key={item.id}
          item={item}
          isFirst={index === 0}
          formatDateRange={formatDateRange}
          styles={styles}
        />
      ))}
    </View>
  )
}

function EducationEntry({
  item,
  isFirst,
  formatters,
  styles,
}: {
  item: EducationItem
  isFirst: boolean
  formatters: Pick<TemplateFormatters, 'formatEducationDateRange' | 'formatDegreeField'>
  styles: Styles
}) {
  const dateRange = formatters.formatEducationDateRange(item.startDate, item.endDate)
  const degreeField = formatters.formatDegreeField(item.degree, item.field)

  return (
    <View style={isFirst ? styles.entryFirst : styles.entry}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>{item.institution}</Text>
        {dateRange && <Text style={styles.entryDate}>{dateRange}</Text>}
      </View>
      {degreeField && <Text style={styles.entryDescription}>{degreeField}</Text>}
    </View>
  )
}

function EducationSection({
  education,
  formatters,
  styles,
}: {
  education: EducationItem[]
  formatters: Pick<TemplateFormatters, 'formatEducationDateRange' | 'formatDegreeField'>
  styles: Styles
}) {
  if (education.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Education</Text>
      {education.map((item, index) => (
        <EducationEntry key={item.id} item={item} isFirst={index === 0} formatters={formatters} styles={styles} />
      ))}
    </View>
  )
}

function ProjectEntry({ item, isFirst, styles }: { item: ProjectItem; isFirst: boolean; styles: Styles }) {
  return (
    <View style={isFirst ? styles.entryFirst : styles.entry}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>{item.name}</Text>
        {item.link && (
          <Link src={item.link} style={styles.link}>
            {item.link}
          </Link>
        )}
      </View>
      {item.description && <Text style={styles.entryDescription}>{item.description}</Text>}
      <HighlightsList highlights={item.highlights} styles={styles} />
    </View>
  )
}

function ProjectsSection({ projects, styles }: { projects: ProjectItem[]; styles: Styles }) {
  if (projects.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Projects</Text>
      {projects.map((item, index) => (
        <ProjectEntry key={item.id} item={item} isFirst={index === 0} styles={styles} />
      ))}
    </View>
  )
}

function SkillsSection({ skills, styles }: { skills: string[]; styles: Styles }) {
  if (skills.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Skills</Text>
      <View style={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <Text key={index} style={styles.skillChip}>
            {skill}
          </Text>
        ))}
      </View>
    </View>
  )
}

function CertificationEntry({
  item,
  isFirst,
  formatDate,
  styles,
}: {
  item: CertificationItem
  isFirst: boolean
  formatDate: TemplateFormatters['formatDate']
  styles: Styles
}) {
  const details = [item.issuer, item.date ? formatDate(item.date) : null].filter(Boolean).join(' \u2022 ')

  return (
    <View style={isFirst ? styles.compactEntryFirst : styles.compactEntry}>
      <Text style={styles.compactEntryName}>{item.name}</Text>
      {details && <Text style={styles.compactEntryDetails}> \u2014 {details}</Text>}
    </View>
  )
}

function CertificationsSection({
  certifications,
  formatDate,
  styles,
}: {
  certifications: CertificationItem[]
  formatDate: TemplateFormatters['formatDate']
  styles: Styles
}) {
  if (certifications.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Certifications</Text>
      {certifications.map((item, index) => (
        <CertificationEntry key={item.id} item={item} isFirst={index === 0} formatDate={formatDate} styles={styles} />
      ))}
    </View>
  )
}

function LanguageEntry({ item, isFirst, styles }: { item: LanguageItem; isFirst: boolean; styles: Styles }) {
  return (
    <View style={isFirst ? styles.compactEntryFirst : styles.compactEntry}>
      <Text style={styles.compactEntryName}>{item.name}</Text>
      {item.level && <Text style={styles.compactEntryDetails}> \u2014 {item.level}</Text>}
    </View>
  )
}

function LanguagesSection({ languages, styles }: { languages: LanguageItem[]; styles: Styles }) {
  if (languages.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Languages</Text>
      {languages.map((item, index) => (
        <LanguageEntry key={item.id} item={item} isFirst={index === 0} styles={styles} />
      ))}
    </View>
  )
}

/**
 * Classic PDF Template - Clean, professional CV layout
 *
 * Section order:
 * 1. Profile (header)
 * 2. Experience
 * 3. Education
 * 4. Projects
 * 5. Skills
 * 6. Certifications
 * 7. Languages
 *
 * Empty sections are automatically omitted.
 *
 * This is a pure component that renders a @react-pdf/renderer Document tree.
 * Use with pdf().toBlob() to generate PDF output.
 */
export function ClassicPdf({ cv, formatters }: ClassicPdfProps) {
  const styles = createStyles({
    accentColor: cv.settings.accentColor,
    spacingPreset: cv.settings.spacingPreset,
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ProfileSection profile={cv.profile} formatContactLine={formatters.formatContactLine} styles={styles} />
        <ExperienceSection experience={cv.experience} formatDateRange={formatters.formatDateRange} styles={styles} />
        <EducationSection
          education={cv.education}
          formatters={{
            formatEducationDateRange: formatters.formatEducationDateRange,
            formatDegreeField: formatters.formatDegreeField,
          }}
          styles={styles}
        />
        <ProjectsSection projects={cv.projects} styles={styles} />
        <SkillsSection skills={cv.skills} styles={styles} />
        <CertificationsSection
          certifications={cv.certifications}
          formatDate={formatters.formatDate}
          styles={styles}
        />
        <LanguagesSection languages={cv.languages} styles={styles} />
      </Page>
    </Document>
  )
}
