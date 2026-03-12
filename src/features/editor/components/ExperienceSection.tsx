import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useCv } from '../../../app/providers'
import type { ExperienceItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
import { EditorCard, ReorderButtons, AddItemButton, EditButton, DeleteButton } from '../../../shared/editor'
import { ExperienceForm } from './ExperienceForm'

export function ExperienceSection() {
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
        <p className="text-sm text-slate-500">Add roles that highlight your professional journey.</p>
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
                    <div className="flex items-start gap-2">
                      <button
                        type="button"
                        onClick={() => toggleExpand(exp.id)}
                        className="mt-0.5 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4" />
                        )}
                      </button>
                      <div>
                        <h3 className="font-medium text-slate-900">{exp.role}</h3>
                        <p className="text-sm text-slate-600">
                          {exp.company}
                          {!isExpanded && (
                            <span className="text-slate-400">
                              {' · '}
                              {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  }
                  right={
                    <>
                      <ReorderButtons
                        onMoveUp={() => handleMoveUp(index)}
                        onMoveDown={() => handleMoveDown(index)}
                        disabledUp={index === 0}
                        disabledDown={index === experiences.length - 1}
                      />
                      <EditButton onClick={() => setEditingId(exp.id)} />
                      <DeleteButton onClick={() => handleDelete(exp.id)} />
                    </>
                  }
                />
                {isExpanded && (
                  <div className="mt-3 pl-6">
                    <p className="text-sm text-slate-500">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </p>
                    {exp.highlights.length > 0 && (
                      <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
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
          Add Experience
        </AddItemButton>
      )}
    </div>
  )
}
