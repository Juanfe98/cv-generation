import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks'

const stepIcons = [
  // Fill in details
  (
    <svg
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  ),
  // Choose template
  (
    <svg
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
      />
    </svg>
  ),
  // Download
  (
    <svg
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  ),
]

const stepNumbers = ['01', '02', '03']
const stepKeys = ['step1', 'step2', 'step3']

export function HowItWorks() {
  const { t } = useTranslation('landing')
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* Background decoration */}
      <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50 opacity-50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full bg-blue-50 opacity-50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            {t('navbar.howItWorks')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t('howItWorks.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 sm:mt-20">
          <div className="relative">
            {/* Connection line - desktop only */}
            <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent lg:block" />

            <div
              className={`grid gap-8 sm:gap-12 lg:grid-cols-3 ${
                isVisible ? 'stagger-children visible' : 'stagger-children'
              }`}
            >
              {stepKeys.map((key, index) => (
                <div key={key} className="relative">
                  {/* Card */}
                  <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md sm:p-8">
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-6 sm:left-8">
                      <span className="inline-flex h-8 items-center justify-center rounded-full bg-slate-900 px-4 text-sm font-semibold text-white">
                        {stepNumbers[index]}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                      {stepIcons[index]}
                    </div>

                    {/* Content */}
                    <h3 className="mt-5 text-xl font-semibold text-slate-900">
                      {t(`howItWorks.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-slate-600">
                      {t(`howItWorks.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
