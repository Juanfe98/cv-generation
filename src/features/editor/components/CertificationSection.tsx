import { useState } from 'react'
import { useCv } from '../../../app/providers'
import type { CertificationItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
import { EditorCard, ReorderButtons, AddItemButton, EditButton, DeleteButton } from '../../../shared/editor'
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
        <p className="text-sm text-slate-500">Add professional certifications or licenses.</p>
      )}

      {certifications.map((cert, index) => (
        <EditorCard key={cert.id}>
          {editingId === cert.id ? (
            <CertificationForm
              certification={cert}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <EditorCard.Header
              left={
                <>
                  <h3 className="font-medium text-slate-900">{cert.name}</h3>
                  {cert.issuer && (
                    <p className="text-sm text-slate-600">{cert.issuer}</p>
                  )}
                  {cert.date && (
                    <p className="text-sm text-slate-500">{cert.date}</p>
                  )}
                </>
              }
              right={
                <>
                  <ReorderButtons
                    onMoveUp={() => handleMoveUp(index)}
                    onMoveDown={() => handleMoveDown(index)}
                    disabledUp={index === 0}
                    disabledDown={index === certifications.length - 1}
                  />
                  <EditButton onClick={() => setEditingId(cert.id)} />
                  <DeleteButton onClick={() => handleDelete(cert.id)} />
                </>
              }
            />
          )}
        </EditorCard>
      ))}

      {isAdding ? (
        <EditorCard>
          <CertificationForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
        </EditorCard>
      ) : (
        <AddItemButton onClick={() => setIsAdding(true)}>
          Add Certification
        </AddItemButton>
      )}
    </div>
  )
}
