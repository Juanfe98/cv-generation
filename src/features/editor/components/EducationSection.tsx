import { useState } from 'react'
import { useCv } from '../../../app/providers'
import type { EducationItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
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
        <p className="text-sm text-slate-500">No education entries yet.</p>
      )}

      {educationList.map((edu, index) => (
        <div
          key={edu.id}
          className="rounded-lg border border-slate-200 bg-white p-4"
        >
          {editingId === edu.id ? (
            <EducationForm
              education={edu}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-start justify-between">
              <div className="flex-1">
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
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === educationList.length - 1}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(edu.id)}
                  className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(edu.id)}
                  className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {isAdding ? (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <EducationForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Education
        </button>
      )}
    </div>
  )
}
