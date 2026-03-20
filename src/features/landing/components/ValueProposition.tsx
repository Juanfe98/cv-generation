import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks'

const benefitIcons = [
  // Ready in minutes
  (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  // Preview as you type
  (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  // Your data stays yours
  (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  ),
]

const benefitKeys = ['free', 'privacy', 'fast']

export function ValueProposition() {
  const { t } = useTranslation('landing')
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="relative border-y border-slate-100 bg-slate-50/50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid gap-8 sm:gap-12 md:grid-cols-3 ${
            isVisible ? 'stagger-children visible' : 'stagger-children'
          }`}
        >
          {benefitKeys.map((key, index) => (
            <div key={key} className="text-center md:text-left">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 md:mx-0">
                {benefitIcons[index]}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t(`valueProposition.${key}.title`)}
              </h3>
              <p className="mt-2 text-slate-600">
                {t(`valueProposition.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
