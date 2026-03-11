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
import { styles } from './styles'

interface TemplateV1PdfProps {
  cv: CvModel
  formatters: TemplateFormatters
}

function ProfileSection({
  profile,
  formatContactLine,
}: {
  profile: CvModel['profile']
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

function ExperienceEntry({
  item,
  isFirst,
  formatDateRange,
}: {
  item: ExperienceItem
  isFirst: boolean
  formatDateRange: TemplateFormatters['formatDateRange']
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
      <HighlightsList highlights={item.highlights} />
    </View>
  )
}

function ExperienceSection({
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
      {experience.map((item, index) => (
        <ExperienceEntry
          key={item.id}
          item={item}
          isFirst={index === 0}
          formatDateRange={formatDateRange}
        />
      ))}
    </View>
  )
}

function EducationEntry({
  item,
  isFirst,
  formatters,
}: {
  item: EducationItem
  isFirst: boolean
  formatters: Pick<TemplateFormatters, 'formatEducationDateRange' | 'formatDegreeField'>
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
}: {
  education: EducationItem[]
  formatters: Pick<TemplateFormatters, 'formatEducationDateRange' | 'formatDegreeField'>
}) {
  if (education.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Education</Text>
      {education.map((item, index) => (
        <EducationEntry key={item.id} item={item} isFirst={index === 0} formatters={formatters} />
      ))}
    </View>
  )
}

function ProjectEntry({ item, isFirst }: { item: ProjectItem; isFirst: boolean }) {
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
      <HighlightsList highlights={item.highlights} />
    </View>
  )
}

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

function SkillsSection({ skills }: { skills: string[] }) {
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
}: {
  item: CertificationItem
  isFirst: boolean
  formatDate: TemplateFormatters['formatDate']
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
}: {
  certifications: CertificationItem[]
  formatDate: TemplateFormatters['formatDate']
}) {
  if (certifications.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Certifications</Text>
      {certifications.map((item, index) => (
        <CertificationEntry key={item.id} item={item} isFirst={index === 0} formatDate={formatDate} />
      ))}
    </View>
  )
}

function LanguageEntry({ item, isFirst }: { item: LanguageItem; isFirst: boolean }) {
  return (
    <View style={isFirst ? styles.compactEntryFirst : styles.compactEntry}>
      <Text style={styles.compactEntryName}>{item.name}</Text>
      {item.level && <Text style={styles.compactEntryDetails}> \u2014 {item.level}</Text>}
    </View>
  )
}

function LanguagesSection({ languages }: { languages: LanguageItem[] }) {
  if (languages.length === 0) return null

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Languages</Text>
      {languages.map((item, index) => (
        <LanguageEntry key={item.id} item={item} isFirst={index === 0} />
      ))}
    </View>
  )
}

/**
 * PDF Template V1 - Clean, professional CV layout
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
export function TemplateV1Pdf({ cv, formatters }: TemplateV1PdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ProfileSection profile={cv.profile} formatContactLine={formatters.formatContactLine} />
        <ExperienceSection experience={cv.experience} formatDateRange={formatters.formatDateRange} />
        <EducationSection
          education={cv.education}
          formatters={{
            formatEducationDateRange: formatters.formatEducationDateRange,
            formatDegreeField: formatters.formatDegreeField,
          }}
        />
        <ProjectsSection projects={cv.projects} />
        <SkillsSection skills={cv.skills} />
        <CertificationsSection
          certifications={cv.certifications}
          formatDate={formatters.formatDate}
        />
        <LanguagesSection languages={cv.languages} />
      </Page>
    </Document>
  )
}
