import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { certificationItemSchema, normalizeCertificationItem, translateErrorMessage } from '../../../core'
import type { CertificationItem } from '../../../core'

type CertificationFormInput = z.input<typeof certificationItemSchema>

interface CertificationFormProps {
  certification?: CertificationItem
  onSubmit: (data: CertificationItem) => void
  onCancel: () => void
}

export function CertificationForm({ certification, onSubmit, onCancel }: CertificationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CertificationFormInput>({
    resolver: zodResolver(certificationItemSchema),
    defaultValues: certification ?? {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
    },
  })

  const handleFormSubmit = (data: CertificationFormInput) => {
    const parsed = certificationItemSchema.parse(data)
    const normalized = normalizeCertificationItem(parsed as CertificationItem)
    onSubmit(normalized)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Certification Name *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          placeholder="e.g., AWS Solutions Architect"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{translateErrorMessage(errors.name.message)}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="issuer"
            className="block text-sm font-medium text-slate-700"
          >
            Issuer
          </label>
          <input
            id="issuer"
            type="text"
            {...register('issuer')}
            placeholder="e.g., Amazon Web Services"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-slate-700"
          >
            Date (YYYY-MM)
          </label>
          <input
            id="date"
            type="text"
            placeholder="2024-01"
            {...register('date')}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{translateErrorMessage(errors.date.message)}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!isDirty}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {certification ? 'Update' : 'Add'}
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
