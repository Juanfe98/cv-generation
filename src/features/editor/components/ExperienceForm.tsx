import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { experienceItemSchema, normalizeExperienceItem } from '../../../core'
import type { ExperienceItem } from '../../../core'

type ExperienceFormInput = z.input<typeof experienceItemSchema>

interface ExperienceFormProps {
  experience?: ExperienceItem
  onSubmit: (data: ExperienceItem) => void
  onCancel: () => void
}

export function ExperienceForm({ experience, onSubmit, onCancel }: ExperienceFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<ExperienceFormInput>({
    resolver: zodResolver(experienceItemSchema),
    defaultValues: experience ?? {
      id: crypto.randomUUID(),
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      highlights: [],
    },
  })

  const isCurrent = watch('isCurrent')

  const handleFormSubmit = (data: ExperienceFormInput) => {
    const parsed = experienceItemSchema.parse(data)
    // Normalize handles trimming, empty filtering, and clearing endDate for current roles
    const normalized = normalizeExperienceItem(parsed as ExperienceItem)
    onSubmit(normalized)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-slate-700"
          >
            Company *
          </label>
          <input
            id="company"
            type="text"
            {...register('company')}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-slate-700"
          >
            Role *
          </label>
          <input
            id="role"
            type="text"
            {...register('role')}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-slate-700"
        >
          Location
        </label>
        <input
          id="location"
          type="text"
          {...register('location')}
          placeholder="e.g., San Francisco, CA"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-slate-700"
          >
            Start Date * (YYYY-MM)
          </label>
          <input
            id="startDate"
            type="text"
            placeholder="2024-01"
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
            placeholder="2024-12"
            {...register('endDate')}
            disabled={isCurrent}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100"
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="isCurrent"
          type="checkbox"
          {...register('isCurrent')}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isCurrent" className="ml-2 text-sm text-slate-700">
          I currently work here
        </label>
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
          defaultValue={experience?.highlights?.join('\n') ?? ''}
          placeholder="Led team of 5 engineers&#10;Increased revenue by 20%"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!isDirty}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {experience ? 'Update' : 'Add'}
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
