import { type ReactNode } from 'react'
import { useCv } from '../../../../app/providers'
import { useWizardStep } from '../useWizardStep'
import type {
  Profile,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  LanguageItem,
} from '../../../../core/cv/types'

export function ReviewStep() {
  const { cv } = useCv()
  const { goToStep } = useWizardStep()

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Review Your CV</h2>
        <p className="text-sm text-slate-600">
          Review your information before previewing your CV.
        </p>
      </div>

      <SummaryCard
        title="Personal Info"
        stepNumber={1}
        isEmpty={!cv.profile.fullName}
        onEdit={goToStep}
        summary={<ProfileSummary profile={cv.profile} />}
      />

      <SummaryCard
        title="Experience"
        count={cv.experience.length}
        stepNumber={2}
        isEmpty={cv.experience.length === 0}
        onEdit={goToStep}
        summary={<ExperienceSummary items={cv.experience} />}
      />

      <SummaryCard
        title="Education"
        count={cv.education.length}
        stepNumber={3}
        isEmpty={cv.education.length === 0}
        onEdit={goToStep}
        summary={<EducationSummary items={cv.education} />}
      />

      <SummaryCard
        title="Skills"
        count={cv.skills.length}
        stepNumber={4}
        isEmpty={cv.skills.length === 0}
        onEdit={goToStep}
        summary={<SkillsSummary skills={cv.skills} />}
      />

      <SummaryCard
        title="Projects"
        count={cv.projects.length}
        stepNumber={4}
        isEmpty={cv.projects.length === 0}
        onEdit={goToStep}
        summary={<ProjectsSummary items={cv.projects} />}
      />

      <SummaryCard
        title="Languages"
        count={cv.languages.length}
        stepNumber={4}
        isEmpty={cv.languages.length === 0}
        onEdit={goToStep}
        summary={<LanguagesSummary items={cv.languages} />}
      />
    </div>
  )
}

interface SummaryCardProps {
  title: string
  count?: number
  stepNumber: number
  isEmpty: boolean
  onEdit: (step: number) => void
  summary: ReactNode
}

function SummaryCard({
  title,
  count,
  stepNumber,
  isEmpty,
  onEdit,
  summary,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isEmpty ? (
            <span className="text-slate-400">○</span>
          ) : (
            <svg
              className="h-5 w-5 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <h3 className="font-medium text-slate-900">
            {title}
            {count !== undefined && count > 0 && (
              <span className="ml-1 text-slate-500">({count})</span>
            )}
          </h3>
        </div>
        <button
          onClick={() => onEdit(stepNumber)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Edit
        </button>
      </div>
      {!isEmpty && <div className="mt-2">{summary}</div>}
      {isEmpty && <p className="mt-2 text-sm text-slate-400">Not added yet</p>}
    </div>
  )
}

function ProfileSummary({ profile }: { profile: Profile }) {
  const parts = [profile.fullName, profile.headline, profile.email].filter(
    Boolean
  )
  return (
    <p className="text-sm text-slate-600">{parts.join(' • ') || 'No info'}</p>
  )
}

function ExperienceSummary({ items }: { items: ExperienceItem[] }) {
  const displayItems = items.slice(0, 3)
  const remaining = items.length - 3

  return (
    <ul className="space-y-1 text-sm text-slate-600">
      {displayItems.map(item => (
        <li key={item.id}>
          {item.role} at {item.company}
          {item.startDate && (
            <span className="text-slate-400">
              {' '}
              ({item.startDate}
              {item.isCurrent ? ' - Present' : item.endDate ? ` - ${item.endDate}` : ''})
            </span>
          )}
        </li>
      ))}
      {remaining > 0 && (
        <li className="text-slate-400">+{remaining} more</li>
      )}
    </ul>
  )
}

function EducationSummary({ items }: { items: EducationItem[] }) {
  const displayItems = items.slice(0, 3)
  const remaining = items.length - 3

  return (
    <ul className="space-y-1 text-sm text-slate-600">
      {displayItems.map(item => (
        <li key={item.id}>
          {item.degree}
          {item.field && ` in ${item.field}`} at {item.institution}
        </li>
      ))}
      {remaining > 0 && (
        <li className="text-slate-400">+{remaining} more</li>
      )}
    </ul>
  )
}

function SkillsSummary({ skills }: { skills: string[] }) {
  const displaySkills = skills.slice(0, 6)
  const remaining = skills.length - 6

  return (
    <div className="flex flex-wrap gap-1">
      {displaySkills.map(skill => (
        <span
          key={skill}
          className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
        >
          {skill}
        </span>
      ))}
      {remaining > 0 && (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-400">
          +{remaining} more
        </span>
      )}
    </div>
  )
}

function ProjectsSummary({ items }: { items: ProjectItem[] }) {
  const displayItems = items.slice(0, 3)
  const remaining = items.length - 3

  return (
    <ul className="space-y-1 text-sm text-slate-600">
      {displayItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
      {remaining > 0 && (
        <li className="text-slate-400">+{remaining} more</li>
      )}
    </ul>
  )
}

function LanguagesSummary({ items }: { items: LanguageItem[] }) {
  return (
    <p className="text-sm text-slate-600">
      {items.map(item => `${item.name} (${item.level})`).join(', ')}
    </p>
  )
}
