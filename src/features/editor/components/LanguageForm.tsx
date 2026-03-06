import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { languageItemSchema } from '../../../core'
import type { LanguageItem } from '../../../core'

type LanguageFormInput = z.input<typeof languageItemSchema>

interface LanguageFormProps {
  language?: LanguageItem
  onSubmit: (data: LanguageItem) => void
  onCancel: () => void
}

export function LanguageForm({ language, onSubmit, onCancel }: LanguageFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LanguageFormInput>({
    resolver: zodResolver(languageItemSchema),
    defaultValues: language ?? {
      id: crypto.randomUUID(),
      name: '',
      level: '',
    },
  })

  const handleFormSubmit = (data: LanguageFormInput) => {
    const parsed = languageItemSchema.parse(data)
    onSubmit(parsed as LanguageItem)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Language *
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder="e.g., English, Spanish"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-slate-700"
          >
            Proficiency Level
          </label>
          <input
            id="level"
            type="text"
            {...register('level')}
            placeholder="e.g., Native, Fluent, Intermediate"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {language ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
