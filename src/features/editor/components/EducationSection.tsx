import { useState } from 'react'
import { useCv } from '../../../app/providers'
import type { EducationItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
import { EditorCard, ReorderButtons, AddItemButton, EditButton, DeleteButton } from '../../../shared/editor'
import { EducationForm } from './EducationForm'

function formatDegreeField(degree: string, field: string): string {
  if (degree && field) return `${degree} in ${field}`
  if (degree) return degree
  if (field) return field
  return ''
}

export function EducationSection() {
  const { cv, updateCv } = useCv()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const educationList = cv.education

  const handleAdd = (data: EducationItem) => {
    updateCv(draft => {
      draft.education = [...(draft.education || []), data]
    })
    setIsAdding(false)
  }

  const handleUpdate = (data: EducationItem) => {
    updateCv(draft => {
      const index = draft.education.findIndex(e => e.id === data.id)
      if (index !== -1) {
        draft.education[index] = data
      }
    })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    updateCv(draft => {
      draft.education = draft.education.filter(e => e.id !== id)
    })
  }

  const handleMoveUp = (index: number) => {
    if (index <= 0) return
    updateCv(draft => {
      draft.education = reorderArray(draft.education, index, index - 1)
    })
  }

  const handleMoveDown = (index: number) => {
    if (index >= educationList.length - 1) return
    updateCv(draft => {
      draft.education = reorderArray(draft.education, index, index + 1)
    })
  }

  return (
    <div className="space-y-4">
      {educationList.length === 0 && !isAdding && (
        <p className="text-sm text-slate-500">Add degrees, bootcamps, or relevant coursework.</p>
      )}

      {educationList.map((edu, index) => (
        <EditorCard key={edu.id}>
          {editingId === edu.id ? (
            <EducationForm
              education={edu}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <EditorCard.Header
              left={
                <>
                  <h3 className="font-medium text-slate-900">{edu.institution}</h3>
                  {formatDegreeField(edu.degree, edu.field) && (
                    <p className="text-sm text-slate-600">
                      {formatDegreeField(edu.degree, edu.field)}
                    </p>
                  )}
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-sm text-slate-500">
                      {edu.startDate || '?'} - {edu.endDate || '?'}
                    </p>
                  )}
                </>
              }
              right={
                <>
                  <ReorderButtons
                    onMoveUp={() => handleMoveUp(index)}
                    onMoveDown={() => handleMoveDown(index)}
                    disabledUp={index === 0}
                    disabledDown={index === educationList.length - 1}
                  />
                  <EditButton onClick={() => setEditingId(edu.id)} />
                  <DeleteButton onClick={() => handleDelete(edu.id)} />
                </>
              }
            />
          )}
        </EditorCard>
      ))}

      {isAdding ? (
        <EditorCard>
          <EducationForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
        </EditorCard>
      ) : (
        <AddItemButton onClick={() => setIsAdding(true)}>
          Add Education
        </AddItemButton>
      )}
    </div>
  )
}
