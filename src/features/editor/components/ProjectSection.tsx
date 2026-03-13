import { useState } from 'react'
import { useCv } from '../../../app/providers'
import type { ProjectItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
import { EditorCard, ReorderButtons, AddItemButton, EditButton, DeleteButton } from '../../../shared/editor'
import { ProjectForm } from './ProjectForm'

export function ProjectSection() {
  const { cv, updateCv } = useCv()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const projects = cv.projects

  const handleAdd = (data: ProjectItem) => {
    updateCv(draft => {
      draft.projects = [...(draft.projects || []), data]
    })
    setIsAdding(false)
  }

  const handleUpdate = (data: ProjectItem) => {
    updateCv(draft => {
      const index = draft.projects.findIndex(p => p.id === data.id)
      if (index !== -1) {
        draft.projects[index] = data
      }
    })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    updateCv(draft => {
      draft.projects = draft.projects.filter(p => p.id !== id)
    })
  }

  const handleMoveUp = (index: number) => {
    if (index <= 0) return
    updateCv(draft => {
      draft.projects = reorderArray(draft.projects, index, index - 1)
    })
  }

  const handleMoveDown = (index: number) => {
    if (index >= projects.length - 1) return
    updateCv(draft => {
      draft.projects = reorderArray(draft.projects, index, index + 1)
    })
  }

  return (
    <div className="space-y-4">
      {projects.length === 0 && !isAdding && (
        <p className="text-sm text-slate-500">Add personal or open-source projects that showcase your skills.</p>
      )}

      {projects.map((project, index) => (
        <EditorCard key={project.id}>
          {editingId === project.id ? (
            <ProjectForm
              project={project}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <EditorCard.Header
              left={
                <>
                  <h3 className="font-medium text-slate-900">{project.name}</h3>
                  {project.description && (
                    <p className="text-sm text-slate-600">{project.description}</p>
                  )}
                  {project.link && (
                    <p className="text-sm text-blue-600">{project.link}</p>
                  )}
                  {project.highlights.length > 0 && (
                    <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
                      {project.highlights.map((h, i) => (
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
                    disabledDown={index === projects.length - 1}
                  />
                  <EditButton onClick={() => setEditingId(project.id)} />
                  <DeleteButton onClick={() => handleDelete(project.id)} />
                </>
              }
            />
          )}
        </EditorCard>
      ))}

      {isAdding ? (
        <EditorCard>
          <ProjectForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
        </EditorCard>
      ) : (
        <AddItemButton onClick={() => setIsAdding(true)}>
          Add Project
        </AddItemButton>
      )}
    </div>
  )
}
