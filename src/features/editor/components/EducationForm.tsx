import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { educationItemSchema, normalizeEducationItem } from '../../../core'
import type { EducationItem } from '../../../core'

type EducationFormInput = z.input<typeof educationItemSchema>

interface EducationFormProps {
  education?: EducationItem
  onSubmit: (data: EducationItem) => void
  onCancel: () => void
}

export function EducationForm({ education, onSubmit, onCancel }: EducationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EducationFormInput>({
    resolver: zodResolver(educationItemSchema),
    defaultValues: education ?? {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    },
  })

  const handleFormSubmit = (data: EducationFormInput) => {
    const parsed = educationItemSchema.parse(data)
    const normalized = normalizeEducationItem(parsed as EducationItem)
    onSubmit(normalized)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="institution"
          className="block text-sm font-medium text-slate-700"
        >
          Institution *
        </label>
        <input
          id="institution"
          type="text"
          {...register('institution')}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.institution && (
          <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="degree"
            className="block text-sm font-medium text-slate-700"
          >
            Degree
          </label>
          <input
            id="degree"
            type="text"
            {...register('degree')}
            placeholder="e.g., Bachelor of Science"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="field"
            className="block text-sm font-medium text-slate-700"
          >
            Field of Study
          </label>
          <input
            id="field"
            type="text"
            {...register('field')}
            placeholder="e.g., Computer Science"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-slate-700"
          >
            Start Date (YYYY-MM)
          </label>
          <input
            id="startDate"
            type="text"
            placeholder="2018-09"
            {...register('startDate')}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-slate-700"
          >
            End Date (YYYY-MM)
          </label>
          <input
            id="endDate"
            type="text"
            placeholder="2022-05"
            {...register('endDate')}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!isDirty}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {education ? 'Update' : 'Add'}
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
