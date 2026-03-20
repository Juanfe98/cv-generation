import { useEffect, useRef } from 'react'
import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCv } from '../../../app/providers'
import { profileSchema } from '../../../core'
import { translateErrorMessage } from '../../../core/i18n/translateZodErrors'

type ProfileFormInput = z.input<typeof profileSchema>

const DEBOUNCE_MS = 300

const inputStyles =
  'mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:shadow focus:border-blue-500 focus:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/10'

export function ProfileSection() {
  const { t } = useTranslation('editor')
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
    // eslint-disable-next-line react-hooks/incompatible-library -- subscription pattern is intentional and properly cleaned up
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
      {/* Form fields */}
      <div className="space-y-5">
        {/* Full Name / Headline */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-slate-700"
            >
              {t('profile.fullName')}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              placeholder={t('profile.fullNamePlaceholder')}
              className={inputStyles}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {translateErrorMessage(errors.fullName.message)}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="headline"
              className="block text-sm font-medium text-slate-700"
            >
              {t('profile.headline')}
            </label>
            <input
              id="headline"
              type="text"
              {...register('headline')}
              placeholder={t('profile.headlinePlaceholder')}
              className={inputStyles}
            />
          </div>
        </div>

        {/* Email / Phone */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              {t('profile.email')}
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder={t('profile.emailPlaceholder')}
              className={inputStyles}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {translateErrorMessage(errors.email.message)}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-700"
            >
              {t('profile.phone')}
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder={t('profile.phonePlaceholder')}
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
              {t('profile.location')}
            </label>
            <input
              id="location"
              type="text"
              {...register('location')}
              placeholder={t('profile.locationPlaceholder')}
              className={inputStyles}
            />
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-slate-700"
            >
              {t('profile.website')}
            </label>
            <input
              id="website"
              type="url"
              {...register('website')}
              placeholder={t('profile.websitePlaceholder')}
              className={inputStyles}
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">
                {translateErrorMessage(errors.website.message)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
