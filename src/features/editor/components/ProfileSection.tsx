import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCv } from '../../../app/providers'
import { profileSchema, normalizeProfile } from '../../../core'
import type { Profile } from '../../../core'

type ProfileFormInput = z.input<typeof profileSchema>

export function ProfileSection() {
  const { cv, updateCv } = useCv()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: cv.profile,
  })

  const onSubmit = (data: ProfileFormInput) => {
    // Parse through schema to apply defaults, then normalize
    const parsed = profileSchema.parse(data)
    const normalized = normalizeProfile(parsed as Profile)
    updateCv(draft => {
      draft.profile = normalized
    })
    // Reset form state with saved values to clear dirty flag
    reset(normalized)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-slate-700"
        >
          Full Name *
        </label>
        <input
          id="fullName"
          type="text"
          {...register('fullName')}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="headline"
          className="block text-sm font-medium text-slate-700"
        >
          Headline
        </label>
        <input
          id="headline"
          type="text"
          {...register('headline')}
          placeholder="e.g., Senior Software Engineer"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-slate-700"
        >
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
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

      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium text-slate-700"
        >
          Website
        </label>
        <input
          id="website"
          type="url"
          {...register('website')}
          placeholder="https://yourwebsite.com"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.website && (
          <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isDirty}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Save
      </button>
    </form>
  )
}
