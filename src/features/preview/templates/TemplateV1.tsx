import type {
  CvModel,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
  LanguageItem,
} from '../../../core/cv/types'
import {
  formatDate,
  formatDateRange,
  formatEducationDateRange,
  formatContactLine,
  formatDegreeField,
} from '../../../core/formatters'

interface TemplateV1Props {
  cv: CvModel
}

// Consistent styles
const sectionStyles = 'mt-6'
const headingStyles = 'border-b border-slate-200 pb-1 text-lg font-semibold text-slate-800'
const contentWrapperStyles = 'mt-3'
const entrySpacingStyles = 'mt-4 first:mt-0'
const compactEntrySpacingStyles = 'mt-2 first:mt-0'
const highlightListStyles = 'mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700'

function ProfileSection({ profile }: { profile: CvModel['profile'] }) {
  const contactLine = formatContactLine(profile)

  return (
    <header className="border-b border-slate-300 pb-4">
      <h1 className="text-2xl font-bold text-slate-900">{profile.fullName}</h1>
      {profile.headline && (
        <p className="mt-1 text-lg text-slate-600">{profile.headline}</p>
      )}
      {contactLine && (
        <p className="mt-2 text-sm text-slate-500">{contactLine}</p>
      )}
    </header>
  )
}

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const dateRange = formatDateRange(item.startDate, item.endDate, item.isCurrent)

  return (
    <div className={entrySpacingStyles}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-semibold text-slate-900">
          {item.role} at {item.company}
        </h3>
        <span className="text-sm text-slate-500">{dateRange}</span>
      </div>
      {item.location && (
        <p className="text-sm text-slate-500">{item.location}</p>
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

function ExperienceSection({ experience }: { experience: ExperienceItem[] }) {
  if (experience.length === 0) return null

  return (
    <section className={sectionStyles}>
      <h2 className={headingStyles}>Experience</h2>
      <div className={contentWrapperStyles}>
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
        <h3 className="font-semibold text-slate-900">{item.institution}</h3>
        {dateRange && <span className="text-sm text-slate-500">{dateRange}</span>}
      </div>
      {degreeField && <p className="text-sm text-slate-600">{degreeField}</p>}
    </div>
  )
}

function EducationSection({ education }: { education: EducationItem[] }) {
  if (education.length === 0) return null

  return (
    <section className={sectionStyles}>
      <h2 className={headingStyles}>Education</h2>
      <div className={contentWrapperStyles}>
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
        <h3 className="font-semibold text-slate-900">{item.name}</h3>
        {item.link && (
          <a
            href={item.link}
            className="text-sm text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.link}
          </a>
        )}
      </div>
      {item.description && (
        <p className="text-sm text-slate-600">{item.description}</p>
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
    <section className={sectionStyles}>
      <h2 className={headingStyles}>Projects</h2>
      <div className={contentWrapperStyles}>
        {projects.map((item) => (
          <ProjectEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function SkillsSection({ skills }: { skills: string[] }) {
  if (skills.length === 0) return null

  return (
    <section className={sectionStyles}>
      <h2 className={headingStyles}>Skills</h2>
      <div className={`${contentWrapperStyles} flex flex-wrap gap-2`}>
        {skills.map((skill, index) => (
          <span
            key={index}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

function CertificationEntry({ item }: { item: CertificationItem }) {
  const details = [item.issuer, item.date ? formatDate(item.date) : null]
    .filter(Boolean)
    .join(' • ')

  return (
    <div className={compactEntrySpacingStyles}>
      <span className="font-medium text-slate-900">{item.name}</span>
      {details && <span className="text-sm text-slate-500"> — {details}</span>}
    </div>
  )
}

function CertificationsSection({ certifications }: { certifications: CertificationItem[] }) {
  if (certifications.length === 0) return null

  return (
    <section className={sectionStyles}>
      <h2 className={headingStyles}>Certifications</h2>
      <div className={contentWrapperStyles}>
        {certifications.map((item) => (
          <CertificationEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function LanguageEntry({ item }: { item: LanguageItem }) {
  return (
    <div className={compactEntrySpacingStyles}>
      <span className="font-medium text-slate-900">{item.name}</span>
      {item.level && <span className="text-sm text-slate-500"> — {item.level}</span>}
    </div>
  )
}

function LanguagesSection({ languages }: { languages: LanguageItem[] }) {
  if (languages.length === 0) return null

  return (
    <section className={sectionStyles}>
      <h2 className={headingStyles}>Languages</h2>
      <div className={contentWrapperStyles}>
        {languages.map((item) => (
          <LanguageEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

/**
 * Template V1 - Clean, professional CV layout
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
 */
export function TemplateV1({ cv }: TemplateV1Props) {
  return (
    <article className="mx-auto max-w-[800px] bg-white p-8 print:max-w-none print:p-0">
      <ProfileSection profile={cv.profile} />
      <ExperienceSection experience={cv.experience} />
      <EducationSection education={cv.education} />
      <ProjectsSection projects={cv.projects} />
      <SkillsSection skills={cv.skills} />
      <CertificationsSection certifications={cv.certifications} />
      <LanguagesSection languages={cv.languages} />
    </article>
  )
}
