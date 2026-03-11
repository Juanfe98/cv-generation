import type {
  CvModel,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  Profile,
} from '../../../core/cv/types'
import {
  formatDateRange,
  formatEducationDateRange,
  formatDegreeField,
  formatContactLine,
} from '../../../core/formatters'

interface CreativeTemplateProps {
  cv: CvModel
}

// Section styles
const sectionStyles = 'mt-6 first:mt-0 break-inside-avoid-page'
const gridSectionStyles = 'break-inside-avoid-page' // No margin for grid children
const headingStyles =
  'text-lg font-semibold uppercase tracking-wider text-slate-800 border-b-2 border-blue-500 pb-1 mb-4'
const entrySpacingStyles = 'break-inside-avoid-page'
const highlightListStyles = 'mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700'

// Header with contact line
function HeaderSection({ profile }: { profile: Profile }) {
  const contactLine = formatContactLine(profile)

  return (
    <header className="text-center border-b border-slate-300 pb-4 break-inside-avoid-page">
      <h1 className="text-3xl font-bold text-slate-900 break-words">{profile.fullName}</h1>
      {profile.headline && (
        <p className="mt-1 text-lg text-slate-600 break-words">{profile.headline}</p>
      )}
      {contactLine && (
        <p className="mt-2 text-sm text-slate-500 break-words">{contactLine}</p>
      )}
    </header>
  )
}

// Timeline experience entry
function TimelineEntry({ item, isLast }: { item: ExperienceItem; isLast: boolean }) {
  const dateRange = formatDateRange(item.startDate, item.endDate, item.isCurrent)

  return (
    <div className={`relative pb-6 ${isLast ? 'pb-0' : ''} ${entrySpacingStyles}`}>
      {/* Dot */}
      <div
        className="absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm"
        data-testid="timeline-dot"
      />
      {/* Content */}
      <div>
        <div className="text-sm font-medium text-blue-600">{dateRange}</div>
        <h3 className="font-semibold text-slate-900 break-words">
          {item.role} at {item.company}
        </h3>
        {item.location && (
          <p className="text-sm text-slate-500 break-words">{item.location}</p>
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
    </div>
  )
}

// Experience section with timeline
function ExperienceTimelineSection({ experience }: { experience: ExperienceItem[] }) {
  if (experience.length === 0) return null

  return (
    <section className={sectionStyles}>
      <h2 className={headingStyles}>Experience</h2>
      <div className="relative pl-8" data-testid="timeline-container">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-300" />
        {/* Timeline entries */}
        {experience.map((item, index) => (
          <TimelineEntry
            key={item.id}
            item={item}
            isLast={index === experience.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

// Education entry
function EducationEntry({ item }: { item: EducationItem }) {
  const dateRange = formatEducationDateRange(item.startDate, item.endDate)
  const degreeField = formatDegreeField(item.degree, item.field)

  return (
    <div className={entrySpacingStyles}>
      <h3 className="font-semibold text-slate-900 break-words">{item.institution}</h3>
      {dateRange && <p className="text-sm text-slate-500">{dateRange}</p>}
      {degreeField && <p className="text-sm text-slate-600 break-words">{degreeField}</p>}
    </div>
  )
}

// Education section
function EducationSection({ education }: { education: EducationItem[] }) {
  if (education.length === 0) return null

  return (
    <section className={gridSectionStyles}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-3">
        Education
      </h2>
      <div className="space-y-3">
        {education.map((item) => (
          <EducationEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

// Skills section
function SkillsSection({ skills }: { skills: string[] }) {
  if (skills.length === 0) return null

  return (
    <section className={gridSectionStyles}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-3">
        Skills
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
        {skills.map((skill, index) => (
          <li key={index} className="break-words">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}

// Project entry
function ProjectEntry({ item }: { item: ProjectItem }) {
  return (
    <div className={`mt-3 first:mt-0 ${entrySpacingStyles}`}>
      <div className="flex flex-wrap items-baseline gap-x-2">
        <h3 className="font-semibold text-slate-900 break-words">{item.name}</h3>
        {item.description && (
          <span className="text-sm text-slate-600 break-words">— {item.description}</span>
        )}
      </div>
      {item.link && (
        <a
          href={item.link}
          className="text-sm text-blue-600 hover:underline break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.link}
        </a>
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

// Projects section
function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  if (projects.length === 0) return null

  return (
    <section className={sectionStyles}>
      <h2 className={headingStyles}>Projects</h2>
      <div>
        {projects.map((item) => (
          <ProjectEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

/**
 * Creative Template - Timeline-based CV layout
 *
 * Layout:
 * - Header (full width, centered): Name, Headline, Contact line
 * - Experience (full width): Timeline with dots for visual chronology
 * - Two-column grid: Education + Skills
 * - Projects (full width)
 *
 * Empty sections are automatically omitted.
 */
export function CreativeTemplate({ cv }: CreativeTemplateProps) {
  const hasEducationOrSkills = cv.education.length > 0 || cv.skills.length > 0

  return (
    <article className="mx-auto max-w-[800px] bg-white p-8 print:max-w-none print:p-6 print:text-black">
      <HeaderSection profile={cv.profile} />

      {/* Experience Timeline - full width, main feature */}
      <ExperienceTimelineSection experience={cv.experience} />

      {/* Two-column: Education + Skills */}
      {hasEducationOrSkills && (
        <div className="mt-6 grid grid-cols-2 gap-6" data-testid="two-column-grid">
          <EducationSection education={cv.education} />
          <SkillsSection skills={cv.skills} />
        </div>
      )}

      {/* Projects - full width */}
      <ProjectsSection projects={cv.projects} />
    </article>
  )
}
