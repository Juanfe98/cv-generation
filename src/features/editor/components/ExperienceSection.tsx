import { useState } from 'react'
import { useCv } from '../../../app/providers'
import type { ExperienceItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
import { EditorCard, ReorderButtons, AddItemButton, EditButton, DeleteButton } from '../../../shared/editor'
import { ExperienceForm } from './ExperienceForm'

export function ExperienceSection() {
  const { cv, updateCv } = useCv()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

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
        <p className="text-sm text-slate-500">No experience entries yet.</p>
      )}

      {experiences.map((exp, index) => (
        <EditorCard key={exp.id}>
          {editingId === exp.id ? (
            <ExperienceForm
              experience={exp}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <EditorCard.Header
              left={
                <>
                  <h3 className="font-medium text-slate-900">{exp.role}</h3>
                  <p className="text-sm text-slate-600">{exp.company}</p>
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
                </>
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
          )}
        </EditorCard>
      ))}

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
