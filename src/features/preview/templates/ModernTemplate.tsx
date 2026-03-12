import type {
  CvModel,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
  LanguageItem,
  Profile,
} from '../../../core/cv/types'
import {
  formatDate,
  formatDateRange,
  formatEducationDateRange,
  formatDegreeField,
} from '../../../core/formatters'

interface ModernTemplateProps {
  cv: CvModel
}

// Sidebar section styles (smaller headings for compact left column)
const sidebarSectionStyles = 'mt-5 first:mt-0 break-inside-avoid-page'
const sidebarHeadingStyles =
  'text-xs font-semibold uppercase tracking-wider mb-2'
const sidebarContentStyles = 'space-y-1'

// Main section styles (larger headings for primary content)
const mainSectionStyles = 'mt-6 first:mt-0 break-inside-avoid-page'
const mainHeadingStyles =
  'border-b pb-1 text-lg font-semibold'
const mainContentStyles = 'mt-3'
const entrySpacingStyles = 'mt-4 first:mt-0 break-inside-avoid-page'
const highlightListStyles = 'mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700'

// Theme-aware styles
const getSidebarHeadingStyle = () => ({
  color: 'var(--theme-accent-primary, #2563eb)',
})

const getMainHeadingStyle = () => ({
  borderColor: 'var(--theme-accent-primary, #2563eb)',
  color: 'var(--theme-accent-dark, #1e40af)',
})

// Header (full width at top)
function HeaderSection({ profile }: { profile: Profile }) {
  return (
    <header className="border-b pb-4 break-inside-avoid-page" style={{ borderColor: 'var(--theme-accent-primary, #2563eb)' }}>
      <h1 className="text-2xl font-bold text-slate-900 break-words">{profile.fullName}</h1>
      {profile.headline && (
        <p className="mt-1 text-lg text-slate-600 break-words">{profile.headline}</p>
      )}
    </header>
  )
}

// Sidebar components
function ContactSection({ profile }: { profile: Profile }) {
  const contactItems = [
    { label: 'Email', value: profile.email },
    { label: 'Phone', value: profile.phone },
    { label: 'Location', value: profile.location },
    { label: 'Website', value: profile.website },
  ].filter((item) => item.value)

  if (contactItems.length === 0) return null

  return (
    <section className={sidebarSectionStyles}>
      <h2 className={sidebarHeadingStyles} style={getSidebarHeadingStyle()}>Contact</h2>
      <div className={sidebarContentStyles}>
        {contactItems.map((item) => (
          <div key={item.label} className="text-sm text-slate-700 break-words">
            {item.value}
          </div>
        ))}
      </div>
    </section>
  )
}

function SkillsSection({ skills }: { skills: string[] }) {
  if (skills.length === 0) return null

  return (
    <section className={sidebarSectionStyles}>
      <h2 className={sidebarHeadingStyles} style={getSidebarHeadingStyle()}>Skills</h2>
      <div className={sidebarContentStyles}>
        {skills.map((skill, index) => (
          <div key={index} className="text-sm text-slate-700 break-words">
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}

function SidebarLanguageEntry({ item }: { item: LanguageItem }) {
  return (
    <div className="text-sm text-slate-700 break-words">
      <span className="font-medium">{item.name}</span>
      {item.level && <span className="text-slate-500"> — {item.level}</span>}
    </div>
  )
}

function LanguagesSection({ languages }: { languages: LanguageItem[] }) {
  if (languages.length === 0) return null

  return (
    <section className={sidebarSectionStyles}>
      <h2 className={sidebarHeadingStyles} style={getSidebarHeadingStyle()}>Languages</h2>
      <div className={sidebarContentStyles}>
        {languages.map((item) => (
          <SidebarLanguageEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function SidebarCertificationEntry({ item }: { item: CertificationItem }) {
  const dateStr = item.date ? formatDate(item.date) : null

  return (
    <div className="text-sm text-slate-700 break-words">
      <div className="font-medium">{item.name}</div>
      {(item.issuer || dateStr) && (
        <div className="text-slate-500 text-xs">
          {[item.issuer, dateStr].filter(Boolean).join(' • ')}
        </div>
      )}
    </div>
  )
}

function CertificationsSection({ certifications }: { certifications: CertificationItem[] }) {
  if (certifications.length === 0) return null

  return (
    <section className={sidebarSectionStyles}>
      <h2 className={sidebarHeadingStyles} style={getSidebarHeadingStyle()}>Certifications</h2>
      <div className={sidebarContentStyles}>
        {certifications.map((item) => (
          <SidebarCertificationEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

// Main content components
function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const dateRange = formatDateRange(item.startDate, item.endDate, item.isCurrent)

  return (
    <div className={entrySpacingStyles}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-semibold text-slate-900 break-words min-w-0 flex-1">
          {item.role} at {item.company}
        </h3>
        <span className="text-sm text-slate-500 shrink-0">{dateRange}</span>
      </div>
      {item.location && <p className="text-sm text-slate-500 break-words">{item.location}</p>}
      {item.highlights.length > 0 && (
        <ul className={highlightListStyles}>
          {item.highlights.map((highlight, index) => (
            <li key={index} className="break-words">
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ExperienceSection({ experience }: { experience: ExperienceItem[] }) {
  if (experience.length === 0) return null

  return (
    <section className={mainSectionStyles}>
      <h2 className={mainHeadingStyles} style={getMainHeadingStyle()}>Experience</h2>
      <div className={mainContentStyles}>
        {experience.map((item) => (
          <ExperienceEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function ProjectEntry({ item }: { item: ProjectItem }) {
  return (
    <div className={entrySpacingStyles}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-semibold text-slate-900 break-words min-w-0 flex-1">{item.name}</h3>
        {item.link && (
          <a
            href={item.link}
            className="text-sm hover:underline break-all shrink-0 max-w-[200px] truncate print:max-w-none print:truncate"
            style={{ color: 'var(--theme-accent-primary, #2563eb)' }}
            target="_blank"
            rel="noopener noreferrer"
            title={item.link}
          >
            {item.link}
          </a>
        )}
      </div>
      {item.description && (
        <p className="text-sm text-slate-600 break-words">{item.description}</p>
      )}
      {item.highlights.length > 0 && (
        <ul className={highlightListStyles}>
          {item.highlights.map((highlight, index) => (
            <li key={index} className="break-words">
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  if (projects.length === 0) return null

  return (
    <section className={mainSectionStyles}>
      <h2 className={mainHeadingStyles} style={getMainHeadingStyle()}>Projects</h2>
      <div className={mainContentStyles}>
        {projects.map((item) => (
          <ProjectEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function EducationEntry({ item }: { item: EducationItem }) {
  const dateRange = formatEducationDateRange(item.startDate, item.endDate)
  const degreeField = formatDegreeField(item.degree, item.field)

  return (
    <div className={entrySpacingStyles}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-semibold text-slate-900 break-words min-w-0 flex-1">
          {item.institution}
        </h3>
        {dateRange && <span className="text-sm text-slate-500 shrink-0">{dateRange}</span>}
      </div>
      {degreeField && <p className="text-sm text-slate-600 break-words">{degreeField}</p>}
    </div>
  )
}

function EducationSection({ education }: { education: EducationItem[] }) {
  if (education.length === 0) return null

  return (
    <section className={mainSectionStyles}>
      <h2 className={mainHeadingStyles} style={getMainHeadingStyle()}>Education</h2>
      <div className={mainContentStyles}>
        {education.map((item) => (
          <EducationEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

/**
 * Modern Template - Two-column CV layout
 *
 * Layout:
 * - Header (full width): Name + Headline
 * - Sidebar (~30%): Contact, Skills, Languages, Certifications
 * - Main (~70%): Experience, Projects, Education
 *
 * Empty sections are automatically omitted.
 */
export function ModernTemplate({ cv }: ModernTemplateProps) {
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
    <article className="mx-auto max-w-[800px] bg-white p-8 print:max-w-none print:p-6 print:text-black">
      <HeaderSection profile={cv.profile} />

      {(hasSidebarContent || hasMainContent) && (
        <div className="mt-6 flex gap-6">
          {/* Sidebar - ~30% */}
          {hasSidebarContent && (
            <aside className="w-[30%] shrink-0">
              <ContactSection profile={cv.profile} />
              <SkillsSection skills={cv.skills} />
              <LanguagesSection languages={cv.languages} />
              <CertificationsSection certifications={cv.certifications} />
            </aside>
          )}

          {/* Main content - ~70% (or full width if no sidebar) */}
          {hasMainContent && (
            <main className="min-w-0 flex-1">
              <ExperienceSection experience={cv.experience} />
              <ProjectsSection projects={cv.projects} />
              <EducationSection education={cv.education} />
            </main>
          )}
        </div>
      )}
    </article>
  )
}
