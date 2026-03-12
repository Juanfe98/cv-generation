import { Document, Page, View, Text, Link } from '@react-pdf/renderer'
import type {
  CvModel,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
  LanguageItem,
  Profile,
} from '../../../cv/types'
import type { TemplateFormatters } from '../../index'
import { createStyles } from './styles'

interface ModernPdfProps {
  cv: CvModel
  formatters: TemplateFormatters
}

type Styles = ReturnType<typeof createStyles>

// Header (full width at top)
function HeaderSection({ profile, styles }: { profile: Profile; styles: Styles }) {
  return (
    <View style={styles.header}>
      <Text style={styles.name}>{profile.fullName}</Text>
      {profile.headline && <Text style={styles.headline}>{profile.headline}</Text>}
    </View>
  )
}

// Sidebar: Contact
function ContactSection({ profile, styles }: { profile: Profile; styles: Styles }) {
  const contactItems = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
  ].filter(Boolean)

  if (contactItems.length === 0) return null

  return (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarHeading}>Contact</Text>
      {contactItems.map((item, index) => (
        <Text key={index} style={styles.sidebarItem}>
          {item}
        </Text>
      ))}
    </View>
  )
}

// Sidebar: Skills
function SkillsSection({ skills, styles }: { skills: string[]; styles: Styles }) {
  if (skills.length === 0) return null

  return (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarHeading}>Skills</Text>
      {skills.map((skill, index) => (
        <Text key={index} style={styles.sidebarItem}>
          {skill}
        </Text>
      ))}
    </View>
  )
}

// Sidebar: Languages
function LanguagesSection({ languages, styles }: { languages: LanguageItem[]; styles: Styles }) {
  if (languages.length === 0) return null

  return (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarHeading}>Languages</Text>
      {languages.map((item) => (
        <View key={item.id} style={{ marginBottom: 4 }}>
          <Text style={styles.sidebarItem}>
            <Text style={styles.sidebarItemBold}>{item.name}</Text>
            {item.level && <Text style={styles.sidebarItemLight}> — {item.level}</Text>}
          </Text>
        </View>
      ))}
    </View>
  )
}

// Sidebar: Certifications
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
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarHeading}>Certifications</Text>
      {certifications.map((item) => {
        const dateStr = item.date ? formatDate(item.date) : null
        return (
          <View key={item.id} style={{ marginBottom: 6 }}>
            <Text style={[styles.sidebarItem, styles.sidebarItemBold]}>{item.name}</Text>
            {(item.issuer || dateStr) && (
              <Text style={[styles.sidebarItem, { fontSize: 8 }]}>
                {[item.issuer, dateStr].filter(Boolean).join(' • ')}
              </Text>
            )}
          </View>
        )
      })}
    </View>
  )
}

// Main: Highlights list
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

// Main: Experience
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

// Main: Projects
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

// Main: Education
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

/**
 * Modern PDF Template - Two-column layout with sidebar
 *
 * Layout:
 * - Header (full width): Name + Headline
 * - Sidebar (~30%): Contact, Skills, Languages, Certifications
 * - Main (~70%): Experience, Projects, Education
 *
 * Empty sections are automatically omitted.
 */
export function ModernPdf({ cv, formatters }: ModernPdfProps) {
  const styles = createStyles({
    accentColor: cv.settings.accentColor,
    spacingPreset: cv.settings.spacingPreset,
  })

  const hasSidebarContent =
    cv.profile.email ||
    cv.profile.phone ||
    cv.profile.location ||
    cv.profile.website ||
    cv.skills.length > 0 ||
    cv.languages.length > 0 ||
    cv.certifications.length > 0

  const hasMainContent =
    cv.experience.length > 0 || cv.projects.length > 0 || cv.education.length > 0

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <HeaderSection profile={cv.profile} styles={styles} />

        {(hasSidebarContent || hasMainContent) && (
          <View style={styles.twoColumn}>
            {hasSidebarContent && (
              <View style={styles.sidebar}>
                <ContactSection profile={cv.profile} styles={styles} />
                <SkillsSection skills={cv.skills} styles={styles} />
                <LanguagesSection languages={cv.languages} styles={styles} />
                <CertificationsSection
                  certifications={cv.certifications}
                  formatDate={formatters.formatDate}
                  styles={styles}
                />
              </View>
            )}

            {hasMainContent && (
              <View style={hasSidebarContent ? styles.main : { width: '100%' }}>
                <ExperienceSection
                  experience={cv.experience}
                  formatDateRange={formatters.formatDateRange}
                  styles={styles}
                />
                <ProjectsSection projects={cv.projects} styles={styles} />
                <EducationSection
                  education={cv.education}
                  formatters={{
                    formatEducationDateRange: formatters.formatEducationDateRange,
                    formatDegreeField: formatters.formatDegreeField,
                  }}
                  styles={styles}
                />
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  )
}
