import { useState } from 'react'
import { useCv } from '../../../app/providers'
import type { LanguageItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
import { EditorCard, ReorderButtons, AddItemButton, EditButton, DeleteButton } from '../../../shared/editor'
import { LanguageForm } from './LanguageForm'

export function LanguageSection() {
  const { cv, updateCv } = useCv()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const languages = cv.languages

  const handleAdd = (data: LanguageItem) => {
    updateCv(draft => {
      draft.languages = [...(draft.languages || []), data]
    })
    setIsAdding(false)
  }

  const handleUpdate = (data: LanguageItem) => {
    updateCv(draft => {
      const index = draft.languages.findIndex(l => l.id === data.id)
      if (index !== -1) {
        draft.languages[index] = data
      }
    })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    updateCv(draft => {
      draft.languages = draft.languages.filter(l => l.id !== id)
    })
  }

  const handleMoveUp = (index: number) => {
    if (index <= 0) return
    updateCv(draft => {
      draft.languages = reorderArray(draft.languages, index, index - 1)
    })
  }

  const handleMoveDown = (index: number) => {
    if (index >= languages.length - 1) return
    updateCv(draft => {
      draft.languages = reorderArray(draft.languages, index, index + 1)
    })
  }

  return (
    <div className="space-y-4">
      {languages.length === 0 && !isAdding && (
        <p className="text-sm text-slate-500">Add languages you speak and your proficiency level.</p>
      )}

      {languages.map((lang, index) => (
        <EditorCard key={lang.id}>
          {editingId === lang.id ? (
            <LanguageForm
              language={lang}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <EditorCard.Header
              left={
                <h3 className="font-medium text-slate-900">
                  {lang.name}
                  {lang.level && (
                    <span className="font-normal text-slate-500"> — {lang.level}</span>
                  )}
                </h3>
              }
              right={
                <>
                  <ReorderButtons
                    onMoveUp={() => handleMoveUp(index)}
                    onMoveDown={() => handleMoveDown(index)}
                    disabledUp={index === 0}
                    disabledDown={index === languages.length - 1}
                  />
                  <EditButton onClick={() => setEditingId(lang.id)} />
                  <DeleteButton onClick={() => handleDelete(lang.id)} />
                </>
              }
            />
          )}
        </EditorCard>
      ))}

      {isAdding ? (
        <EditorCard>
          <LanguageForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
        </EditorCard>
      ) : (
        <AddItemButton onClick={() => setIsAdding(true)}>
          Add Language
        </AddItemButton>
      )}
    </div>
  )
}
