import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectItemSchema, normalizeProjectItem } from '../../../core'
import type { ProjectItem } from '../../../core'

type ProjectFormInput = z.input<typeof projectItemSchema>

interface ProjectFormProps {
  project?: ProjectItem
  onSubmit: (data: ProjectItem) => void
  onCancel: () => void
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectItemSchema),
    defaultValues: project ?? {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      highlights: [],
      link: '',
    },
  })

  const handleFormSubmit = (data: ProjectFormInput) => {
    const parsed = projectItemSchema.parse(data)
    const normalized = normalizeProjectItem(parsed as ProjectItem)
    onSubmit(normalized)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Project Name *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          placeholder="e.g., Open Source CLI Tool"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-700"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          {...register('description')}
          placeholder="Brief description of the project"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-slate-700"
        >
          Link
        </label>
        <input
          id="link"
          type="text"
          {...register('link')}
          placeholder="https://github.com/username/project"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.link && (
          <p className="mt-1 text-sm text-red-600">{errors.link.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="highlights"
          className="block text-sm font-medium text-slate-700"
        >
          Highlights (one per line)
        </label>
        <textarea
          id="highlights"
          rows={3}
          {...register('highlights', {
            setValueAs: (v: string | string[]) => {
              if (Array.isArray(v)) return v
              return v
                .split('\n')
                .map((s: string) => s.trim())
                .filter(Boolean)
            },
          })}
          defaultValue={project?.highlights?.join('\n') ?? ''}
          placeholder="Built with React and TypeScript&#10;10k+ downloads&#10;Featured on Hacker News"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!isDirty}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {project ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
