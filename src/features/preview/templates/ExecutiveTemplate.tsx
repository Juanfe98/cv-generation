import type {
  CvModel,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  Profile,
  ProfileLink,
} from '../../../core/cv/types'
import {
  formatDateRange,
  formatEducationDateRange,
  formatDegreeField,
} from '../../../core/formatters'

interface ExecutiveTemplateProps {
  cv: CvModel
}

// Sidebar section styles (smaller headings for compact left column)
const sidebarSectionStyles = 'mt-5 first:mt-0 break-inside-avoid-page'
const sidebarHeadingStyles =
  'text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2'
const sidebarContentStyles = 'space-y-1'

// Main section styles (larger headings for primary content)
const mainSectionStyles = 'mt-6 first:mt-0 break-inside-avoid-page'
const mainHeadingStyles =
  'border-b border-slate-200 pb-1 text-lg font-semibold text-slate-800'
const mainContentStyles = 'mt-3'
const entrySpacingStyles = 'mt-4 first:mt-0 break-inside-avoid-page'
const highlightListStyles = 'mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700'

/** Extract initials from full name (e.g., "Jane Smith" → "JS") */
function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

// Header (full width at top)
function HeaderSection({ profile }: { profile: Profile }) {
  return (
    <header className="border-b border-slate-300 pb-4 break-inside-avoid-page">
      <h1 className="text-2xl font-bold text-slate-900 break-words">{profile.fullName}</h1>
      {profile.headline && (
        <p className="mt-1 text-lg text-slate-600 break-words">{profile.headline}</p>
      )}
    </header>
  )
}

// Photo placeholder with initials
function PhotoPlaceholder({ fullName }: { fullName: string }) {
  const initials = getInitials(fullName)

  return (
    <div
      className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-semibold text-slate-600"
      aria-label="Photo placeholder"
    >
      {initials}
    </div>
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
      <h2 className={sidebarHeadingStyles}>Contact</h2>
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

function LinksSection({ links }: { links: ProfileLink[] }) {
  if (links.length === 0) return null

  return (
    <section className={sidebarSectionStyles}>
      <h2 className={sidebarHeadingStyles}>Links</h2>
      <div className={sidebarContentStyles}>
        {links.map((link, index) => (
          <div key={index} className="text-sm break-words">
            <a
              href={link.url}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
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
      <h2 className={sidebarHeadingStyles}>Skills</h2>
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
      <h2 className={mainHeadingStyles}>Experience</h2>
      <div className={mainContentStyles}>
        {experience.map((item) => (
          <ExperienceEntry key={item.id} item={item} />
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
      <h2 className={mainHeadingStyles}>Education</h2>
      <div className={mainContentStyles}>
        {education.map((item) => (
          <EducationEntry key={item.id} item={item} />
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
            className="text-sm text-blue-600 hover:underline break-all shrink-0 max-w-[200px] truncate print:max-w-none print:truncate"
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
      <h2 className={mainHeadingStyles}>Projects</h2>
      <div className={mainContentStyles}>
        {projects.map((item) => (
          <ProjectEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

/**
 * Executive Template - Sidebar + Photo layout for senior professionals
 *
 * Layout:
 * - Header (full width): Name + Headline
 * - Sidebar (~30%): Photo placeholder, Contact, Links, Skills
 * - Main (~70%): Experience, Education, Projects
 *
 * Empty sections are automatically omitted.
 */
export function ExecutiveTemplate({ cv }: ExecutiveTemplateProps) {
  const hasMainContent =
    cv.experience.length > 0 || cv.education.length > 0 || cv.projects.length > 0

  return (
    <article className="mx-auto max-w-[800px] bg-white p-8 print:max-w-none print:p-6 print:text-black">
      <HeaderSection profile={cv.profile} />

      <div className="mt-6 flex gap-6">
        {/* Sidebar - ~30% (always shows photo placeholder since fullName is required) */}
        <aside className="w-[30%] shrink-0">
          <PhotoPlaceholder fullName={cv.profile.fullName} />
          <ContactSection profile={cv.profile} />
          <LinksSection links={cv.profile.links} />
          <SkillsSection skills={cv.skills} />
        </aside>

        {/* Main content - ~70% */}
        {hasMainContent && (
          <main className="min-w-0 flex-1">
            <ExperienceSection experience={cv.experience} />
            <EducationSection education={cv.education} />
            <ProjectsSection projects={cv.projects} />
          </main>
        )}
      </div>
    </article>
  )
}
