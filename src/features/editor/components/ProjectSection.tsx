import { useState } from 'react'
import { useCv } from '../../../app/providers'
import type { ProjectItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
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
        <p className="text-sm text-slate-500">No projects yet.</p>
      )}

      {projects.map((project, index) => (
        <div
          key={project.id}
          className="rounded-lg border border-slate-200 bg-white p-4"
        >
          {editingId === project.id ? (
            <ProjectForm
              project={project}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-start justify-between">
              <div className="flex-1">
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
                  disabled={index === projects.length - 1}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(project.id)}
                  className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project.id)}
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
          <ProjectForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Project
        </button>
      )}
    </div>
  )
}
