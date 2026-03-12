import { Document, Page, View, Text, Link } from '@react-pdf/renderer'
import type {
  CvModel,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  Profile,
  ProfileLink,
} from '../../../cv/types'
import type { TemplateFormatters } from '../../index'
import { styles } from './styles'

interface ExecutivePdfProps {
  cv: CvModel
  formatters: TemplateFormatters
}

// Header (full width at top)
function HeaderSection({ profile }: { profile: Profile }) {
  return (
    <View style={styles.header}>
      <Text style={styles.name}>{profile.fullName}</Text>
      {profile.headline && <Text style={styles.headline}>{profile.headline}</Text>}
    </View>
  )
}

// Sidebar: Contact
function ContactSection({ profile }: { profile: Profile }) {
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

// Sidebar: Links
function LinksSection({ links }: { links: ProfileLink[] }) {
  if (links.length === 0) return null

  return (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarHeading}>Links</Text>
      {links.map((link, index) => (
        <View key={index} style={styles.linkItem}>
          <Link src={link.url} style={styles.link}>
            {link.label}
          </Link>
        </View>
      ))}
    </View>
  )
}

// Sidebar: Skills
function SkillsSection({ skills }: { skills: string[] }) {
  if (skills.length === 0) return null

  return (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarHeading}>Skills</Text>
      {skills.map((skill, index) => (
        <Text key={index} style={styles.skillItem}>
          {skill}
        </Text>
      ))}
    </View>
  )
}

// Main: Highlights list
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

// Main: Experience
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

// Main: Education
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

// Main: Projects
function ProjectEntry({ item, isFirst }: { item: ProjectItem; isFirst: boolean }) {
  return (
    <View style={isFirst ? styles.entryFirst : styles.entry}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>{item.name}</Text>
        {item.link && (
          <Link src={item.link} style={styles.projectLink}>
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

/**
 * Executive PDF Template - Two-column layout for senior professionals
 *
 * Layout:
 * - Header (full width): Name + Headline
 * - Sidebar (~30%): Contact, Links, Skills
 * - Main (~70%): Experience, Education, Projects
 *
 * Note: Photo is intentionally skipped for simpler PDF layout.
 * Empty sections are automatically omitted.
 */
export function ExecutivePdf({ cv, formatters }: ExecutivePdfProps) {
  const hasSidebarContent =
    cv.profile.email ||
    cv.profile.phone ||
    cv.profile.location ||
    cv.profile.website ||
    cv.profile.links.length > 0 ||
    cv.skills.length > 0

  const hasMainContent =
    cv.experience.length > 0 || cv.education.length > 0 || cv.projects.length > 0

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <HeaderSection profile={cv.profile} />

        <View style={styles.twoColumn}>
          {hasSidebarContent && (
            <View style={styles.sidebar}>
              <ContactSection profile={cv.profile} />
              <LinksSection links={cv.profile.links} />
              <SkillsSection skills={cv.skills} />
            </View>
          )}

          {hasMainContent && (
            <View style={hasSidebarContent ? styles.main : { width: '100%' }}>
              <ExperienceSection
                experience={cv.experience}
                formatDateRange={formatters.formatDateRange}
              />
              <EducationSection
                education={cv.education}
                formatters={{
                  formatEducationDateRange: formatters.formatEducationDateRange,
                  formatDegreeField: formatters.formatDegreeField,
                }}
              />
              <ProjectsSection projects={cv.projects} />
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}
