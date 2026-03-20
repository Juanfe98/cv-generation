import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useCv } from '../../../app/providers'
import type { ExperienceItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
import { EditorCard, ReorderButtons, AddItemButton, EditButton, DeleteButton } from '../../../shared/editor'
import { ExperienceForm } from './ExperienceForm'

function formatDateRange(start: string, end: string, isCurrent: boolean, presentText: string): string {
  const formatDate = (d: string) => {
    if (!d) return ''
    const [year, month] = d.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`
  }
  return `${formatDate(start)} – ${isCurrent ? presentText : formatDate(end)}`
}

export function ExperienceSection() {
  const { t } = useTranslation('editor')
  const { cv, updateCv } = useCv()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const experiences = cv.experience

  const handleAdd = (data: ExperienceItem) => {
    updateCv(draft => {
      draft.experience = [...(draft.experience || []), data]
    })
    setIsAdding(false)
  }

  const handleUpdate = (data: ExperienceItem) => {
    updateCv(draft => {
      const index = draft.experience.findIndex(e => e.id === data.id)
      if (index !== -1) {
        draft.experience[index] = data
      }
    })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    updateCv(draft => {
      draft.experience = draft.experience.filter(e => e.id !== id)
    })
  }

  const handleMoveUp = (index: number) => {
    if (index <= 0) return
    updateCv(draft => {
      draft.experience = reorderArray(draft.experience, index, index - 1)
    })
  }

  const handleMoveDown = (index: number) => {
    if (index >= experiences.length - 1) return
    updateCv(draft => {
      draft.experience = reorderArray(draft.experience, index, index + 1)
    })
  }

  return (
    <div className="space-y-4">
      {experiences.length === 0 && !isAdding && (
        <p className="text-sm text-slate-500">{t('experience.emptyState')}</p>
      )}

      {experiences.map((exp, index) => {
        const isExpanded = expandedIds.has(exp.id)
        const isEditing = editingId === exp.id

        return (
          <EditorCard key={exp.id}>
            {isEditing ? (
              <ExperienceForm
                experience={exp}
                onSubmit={handleUpdate}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <EditorCard.Header
                  left={
                    <button
                      type="button"
                      onClick={() => toggleExpand(exp.id)}
                      className="flex flex-1 items-start gap-3 text-left"
                    >
                      <ChevronRightIcon
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                      />
                      <div className="min-w-0">
                        <h3 className="font-medium text-slate-900">{exp.role}</h3>
                        <p className="text-sm text-slate-500">
                          {exp.company}
                          {exp.location && ` · ${exp.location}`}
                        </p>
                        {!isExpanded && (
                          <p className="mt-0.5 text-xs text-slate-400">
                            {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent, t('experience.present'))}
                          </p>
                        )}
                      </div>
                    </button>
                  }
                  right={
                    <div className="flex items-center gap-1">
                      <div className="flex items-center rounded bg-slate-100 p-0.5">
                        <ReorderButtons
                          onMoveUp={() => handleMoveUp(index)}
                          onMoveDown={() => handleMoveDown(index)}
                          disabledUp={index === 0}
                          disabledDown={index === experiences.length - 1}
                        />
                      </div>
                      <div className="mx-1 h-4 w-px bg-slate-200" />
                      <EditButton onClick={() => setEditingId(exp.id)} />
                      <DeleteButton onClick={() => handleDelete(exp.id)} />
                    </div>
                  }
                />
                {isExpanded && (
                  <div className="mt-3 space-y-3 pl-8">
                    <p className="text-sm font-medium text-slate-600">
                      {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent, t('experience.present'))}
                      {exp.location && (
                        <span className="font-normal text-slate-400"> · {exp.location}</span>
                      )}
                    </p>
                    {exp.highlights.length > 0 && (
                      <ul className="space-y-1 text-sm text-slate-600">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-slate-300">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </>
            )}
          </EditorCard>
        )
      })}

      {isAdding ? (
        <EditorCard>
          <ExperienceForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
        </EditorCard>
      ) : (
        <AddItemButton onClick={() => setIsAdding(true)}>
          {t('experience.addExperience')}
        </AddItemButton>
      )}
    </div>
  )
}
