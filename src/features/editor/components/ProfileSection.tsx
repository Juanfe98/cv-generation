import { useEffect, useRef } from 'react'
import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCv } from '../../../app/providers'
import { profileSchema } from '../../../core'

type ProfileFormInput = z.input<typeof profileSchema>

const DEBOUNCE_MS = 300

export function ProfileSection() {
  const { cv, updateCv } = useCv()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<ProfileFormInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: cv.profile,
  })

  // Live sync form values to CV context with debounce
  useEffect(() => {
    const subscription = watch(data => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        updateCv(draft => {
          draft.profile = {
            ...draft.profile,
            fullName: data.fullName ?? '',
            headline: data.headline ?? '',
            email: data.email ?? '',
            phone: data.phone ?? '',
            location: data.location ?? '',
            website: data.website ?? '',
          }
        })
      }, DEBOUNCE_MS)
    })

    return () => {
      subscription.unsubscribe()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [watch, updateCv])

  return (
    <div className="space-y-4">
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

    </div>
  )
}
