import { useState } from 'react'
import { useCv } from '../../../app/providers'
import type { CertificationItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
import { CertificationForm } from './CertificationForm'

export function CertificationSection() {
  const { cv, updateCv } = useCv()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const certifications = cv.certifications

  const handleAdd = (data: CertificationItem) => {
    updateCv(draft => {
      draft.certifications = [...(draft.certifications || []), data]
    })
    setIsAdding(false)
  }

  const handleUpdate = (data: CertificationItem) => {
    updateCv(draft => {
      const index = draft.certifications.findIndex(c => c.id === data.id)
      if (index !== -1) {
        draft.certifications[index] = data
      }
    })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    updateCv(draft => {
      draft.certifications = draft.certifications.filter(c => c.id !== id)
    })
  }

  const handleMoveUp = (index: number) => {
    if (index <= 0) return
    updateCv(draft => {
      draft.certifications = reorderArray(draft.certifications, index, index - 1)
    })
  }

  const handleMoveDown = (index: number) => {
    if (index >= certifications.length - 1) return
    updateCv(draft => {
      draft.certifications = reorderArray(draft.certifications, index, index + 1)
    })
  }

  return (
    <div className="space-y-4">
      {certifications.length === 0 && !isAdding && (
        <p className="text-sm text-slate-500">No certifications yet.</p>
      )}

      {certifications.map((cert, index) => (
        <div
          key={cert.id}
          className="rounded-lg border border-slate-200 bg-white p-4"
        >
          {editingId === cert.id ? (
            <CertificationForm
              certification={cert}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">{cert.name}</h3>
                {cert.issuer && (
                  <p className="text-sm text-slate-600">{cert.issuer}</p>
                )}
                {cert.date && (
                  <p className="text-sm text-slate-500">{cert.date}</p>
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
                  disabled={index === certifications.length - 1}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(cert.id)}
                  className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(cert.id)}
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
          <CertificationForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Certification
        </button>
      )}
    </div>
  )
}
