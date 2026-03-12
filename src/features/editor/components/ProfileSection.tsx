import { useEffect, useRef } from 'react'
import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCv } from '../../../app/providers'
import { profileSchema } from '../../../core'

type ProfileFormInput = z.input<typeof profileSchema>

const DEBOUNCE_MS = 300

const inputStyles =
  'mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:shadow focus:border-blue-500 focus:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/10'

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
    <div>
      {/* Helper text */}
      <p className="mb-5 text-sm text-slate-500">
        This is the first thing recruiters see. Keep it current and easy to scan.
      </p>

      {/* Form fields */}
      <div className="space-y-5">
        {/* Full Name / Headline */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
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
              className={inputStyles}
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
              className={inputStyles}
            />
            <p className="mt-1 text-xs text-slate-500">
              The title you want recruiters to notice first
            </p>
          </div>
        </div>

        {/* Email / Phone */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
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
              className={inputStyles}
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
              placeholder="+1 (555) 000-0000"
              className={inputStyles}
            />
          </div>
        </div>

        {/* Location / Website */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
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
              className={inputStyles}
            />
            <p className="mt-1 text-xs text-slate-500">
              City and country is usually enough
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
              className={inputStyles}
            />
            <p className="mt-1 text-xs text-slate-500">
              Portfolio, LinkedIn, or personal website
            </p>
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>
        </div>

        {/* Reassurance note */}
        <p className="pt-2 text-xs text-slate-400">
          Only your name is required to continue. You can update the rest anytime.
        </p>
      </div>
    </div>
  )
}
