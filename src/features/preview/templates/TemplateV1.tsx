import type { CvModel, ExperienceItem, EducationItem, CertificationItem, LanguageItem } from '../../../core/cv/types'

interface TemplateV1Props {
  cv: CvModel
}

function formatDate(dateString: string): string {
  if (!dateString) return ''
  const [year, month] = dateString.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function ProfileSection({ profile }: { profile: CvModel['profile'] }) {
  const contactItems = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
  ].filter(Boolean)

  return (
    <header className="border-b border-slate-300 pb-4">
      <h1 className="text-2xl font-bold text-slate-900">{profile.fullName}</h1>
      {profile.headline && (
        <p className="mt-1 text-lg text-slate-600">{profile.headline}</p>
      )}
      {contactItems.length > 0 && (
        <p className="mt-2 text-sm text-slate-500">
          {contactItems.join(' • ')}
        </p>
      )}
    </header>
  )
}

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const dateRange = item.isCurrent
    ? `${formatDate(item.startDate)} – Present`
    : `${formatDate(item.startDate)} – ${formatDate(item.endDate)}`

  return (
    <div className="mt-4 first:mt-0">
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
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
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
    <section className="mt-6">
      <h2 className="border-b border-slate-200 pb-1 text-lg font-semibold text-slate-800">
        Experience
      </h2>
      <div className="mt-3">
        {experience.map((item) => (
          <ExperienceEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function formatDegreeField(degree: string, field: string): string {
  if (degree && field) return `${degree} in ${field}`
  if (degree) return degree
  if (field) return field
  return ''
}

function EducationEntry({ item }: { item: EducationItem }) {
  const dateRange =
    item.startDate || item.endDate
      ? `${formatDate(item.startDate) || '?'} – ${formatDate(item.endDate) || '?'}`
      : null

  const degreeField = formatDegreeField(item.degree, item.field)

  return (
    <div className="mt-4 first:mt-0">
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
    <section className="mt-6">
      <h2 className="border-b border-slate-200 pb-1 text-lg font-semibold text-slate-800">
        Education
      </h2>
      <div className="mt-3">
        {education.map((item) => (
          <EducationEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function SkillsSection({ skills }: { skills: string[] }) {
  if (skills.length === 0) return null

  return (
    <section className="mt-6">
      <h2 className="border-b border-slate-200 pb-1 text-lg font-semibold text-slate-800">
        Skills
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
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
    <div className="mt-2 first:mt-0">
      <span className="font-medium text-slate-900">{item.name}</span>
      {details && <span className="text-sm text-slate-500"> — {details}</span>}
    </div>
  )
}

function CertificationsSection({ certifications }: { certifications: CertificationItem[] }) {
  if (certifications.length === 0) return null

  return (
    <section className="mt-6">
      <h2 className="border-b border-slate-200 pb-1 text-lg font-semibold text-slate-800">
        Certifications
      </h2>
      <div className="mt-3">
        {certifications.map((item) => (
          <CertificationEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function LanguagesSection({ languages }: { languages: LanguageItem[] }) {
  if (languages.length === 0) return null

  return (
    <section className="mt-6">
      <h2 className="border-b border-slate-200 pb-1 text-lg font-semibold text-slate-800">
        Languages
      </h2>
      <div className="mt-3 space-y-1">
        {languages.map((item) => (
          <div key={item.id} className="text-sm text-slate-700">
            <span className="font-medium">{item.name}</span>
            {item.level && <span className="text-slate-500"> — {item.level}</span>}
          </div>
        ))}
      </div>
    </section>
  )
}

export function TemplateV1({ cv }: TemplateV1Props) {
  return (
    <article className="mx-auto max-w-[800px] bg-white p-8 print:max-w-none print:p-0">
      <ProfileSection profile={cv.profile} />
      <ExperienceSection experience={cv.experience} />
      <EducationSection education={cv.education} />
      <SkillsSection skills={cv.skills} />
      <CertificationsSection certifications={cv.certifications} />
      <LanguagesSection languages={cv.languages} />
    </article>
  )
}
