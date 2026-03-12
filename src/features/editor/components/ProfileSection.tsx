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
    <div className="space-y-6">
      {/* Section header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          This appears at the top of your CV. Make sure your contact details are up to date.
        </p>
      </div>

      {/* Form fields */}
      <div className="space-y-6">
        {/* Full Name / Headline */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-slate-700"
            >
              Full Name
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            {errors.fullName && (
              <p className="mt-1.5 text-sm text-red-600">{errors.fullName.message}</p>
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
              className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Your professional title or role
            </p>
          </div>
        </div>

        {/* Email / Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
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
              placeholder="you@example.com"
              className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
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
              placeholder="+1 (555) 000-0000"
              className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Location / Website */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
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
              className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              City and country or region
            </p>
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
              placeholder="https://yourportfolio.com"
              className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Portfolio, LinkedIn, or personal site
            </p>
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
