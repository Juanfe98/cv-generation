import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParallax } from '../hooks'

function Badge() {
  return (
    <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
      <span className="flex h-2 w-2 items-center justify-center">
        <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="text-sm font-medium text-slate-600">
        Free forever &bull; No account needed
      </span>
    </div>
  )
}

// Check for reduced motion preference at module level
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Typewriter effect hook with highlight state built in
function useTypewriter(text: string, delay: number = 0, speed: number = 50) {
  const [displayText, setDisplayText] = useState(prefersReducedMotion ? text : '')
  const [isTyping, setIsTyping] = useState(false)
  const [isDone, setIsDone] = useState(prefersReducedMotion)
  const [showHighlight, setShowHighlight] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    let typeInterval: ReturnType<typeof setInterval>

    const startTyping = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0

      typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          setIsDone(true)
          // Trigger highlight after typing completes
          setShowHighlight(true)
          setTimeout(() => setShowHighlight(false), 800)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(startTyping)
      if (typeInterval) clearInterval(typeInterval)
    }
  }, [text, delay, speed])

  return { displayText, isTyping, isDone, showHighlight }
}

function ProductMockup() {
  // Parallax effects
  const mockupParallax = useParallax({ speed: -0.15, maxOffset: 70 })
  const leftFloatParallax = useParallax({ speed: -0.25, maxOffset: 100 })
  const rightFloatParallax = useParallax({ speed: -0.1, maxOffset: 50 })
  const glowParallax = useParallax({ speed: 0.06, maxOffset: 35 })

  // Typing animations - staggered (highlight state is built into the hook)
  const name = useTypewriter('Sarah Chen', 1000, 80)
  const role = useTypewriter('Senior Product Designer', 2500, 60)

  return (
    <div className="animate-fade-in-up-delay-4 relative mx-auto mt-16 max-w-5xl lg:mt-20">
      {/* Background glow */}
      <div
        className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-blue-500/20 opacity-50 blur-3xl transition-transform duration-100 ease-out"
        style={glowParallax.style}
      />

      {/* Main container with parallax */}
      <div
        className="relative transition-transform duration-100 ease-out"
        style={mockupParallax.style}
      >
        {/* Browser chrome */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10">
          {/* Browser header */}
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-slate-300" />
              <div className="h-3 w-3 rounded-full bg-slate-300" />
              <div className="h-3 w-3 rounded-full bg-slate-300" />
            </div>
            <div className="ml-4 flex-1">
              <div className="mx-auto flex max-w-md items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs text-slate-400 shadow-sm">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>cvgenerator.app/editor</span>
              </div>
            </div>
          </div>

          {/* App content - Split view */}
          <div className="flex min-h-[320px] sm:min-h-[400px] lg:min-h-[460px]">
            {/* Editor side */}
            <div className="flex w-1/2 flex-col border-r border-slate-100 bg-slate-50/50">
              {/* Editor header */}
              <div className="border-b border-slate-100 bg-white px-4 py-3 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-400 sm:text-sm">
                    Step 1 of 5
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                    Personal Info
                  </span>
                </div>
                {/* Progress steps */}
                <div className="mt-3 flex items-center gap-1">
                  <div className="h-1.5 flex-1 rounded-full bg-blue-500" />
                  <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
                  <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
                  <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
                  <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
                </div>
              </div>

              {/* Form fields with typing animation */}
              <div className="flex-1 space-y-4 bg-white p-4 sm:space-y-5 sm:p-6">
                {/* Name field - animated typing */}
                <div>
                  <div className="mb-1.5 text-xs font-medium text-slate-500 sm:text-sm">
                    Full Name
                  </div>
                  <div
                    className={`flex h-9 items-center rounded-lg border bg-white px-3 transition-colors sm:h-10 ${
                      name.isTyping
                        ? 'border-blue-500 ring-2 ring-blue-100'
                        : 'border-slate-200'
                    }`}
                  >
                    <span className="text-xs font-medium text-slate-800 sm:text-sm">
                      {name.displayText}
                      {name.isTyping && (
                        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-blue-500" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Role field - animated typing */}
                <div>
                  <div className="mb-1.5 text-xs font-medium text-slate-500 sm:text-sm">
                    Professional Title
                  </div>
                  <div
                    className={`flex h-9 items-center rounded-lg border bg-white px-3 transition-colors sm:h-10 ${
                      role.isTyping
                        ? 'border-blue-500 ring-2 ring-blue-100'
                        : 'border-slate-200'
                    }`}
                  >
                    <span className="text-xs font-medium text-slate-800 sm:text-sm">
                      {role.displayText}
                      {role.isTyping && (
                        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-blue-500" />
                      )}
                      {!role.isTyping && !role.isDone && (
                        <span className="text-slate-400">Enter your title...</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Email field - static */}
                <div>
                  <div className="mb-1.5 text-xs font-medium text-slate-500 sm:text-sm">
                    Email
                  </div>
                  <div className="flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 sm:h-10">
                    <span className="text-xs text-slate-400 sm:text-sm">
                      sarah@example.com
                    </span>
                  </div>
                </div>

                {/* Location field - desktop only */}
                <div className="hidden sm:block">
                  <div className="mb-1.5 text-xs font-medium text-slate-500 sm:text-sm">
                    Location
                  </div>
                  <div className="flex h-10 items-center rounded-lg border border-slate-200 bg-white px-3">
                    <span className="text-sm text-slate-400">
                      San Francisco, CA
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="border-t border-slate-100 bg-white px-4 py-3 sm:px-6">
                <div className="flex items-center justify-end gap-2">
                  <div className="h-8 w-20 rounded-lg bg-blue-500 sm:h-9 sm:w-24" />
                </div>
              </div>
            </div>

            {/* Preview side - updates in sync with typing */}
            <div className="w-1/2 bg-slate-100 p-4 sm:p-6 lg:p-8">
              <div className="mx-auto h-full max-w-xs overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                <div className="p-4 sm:p-5">
                  {/* Header - updates with typing */}
                  <div className="border-b border-blue-500 pb-3">
                    <div
                      className={`min-h-[1.25rem] text-sm font-bold text-slate-900 transition-colors sm:min-h-[1.5rem] sm:text-base ${
                        name.showHighlight ? 'bg-blue-50' : ''
                      }`}
                    >
                      {name.displayText || (
                        <span className="text-slate-300">Your Name</span>
                      )}
                    </div>
                    <div
                      className={`mt-0.5 min-h-[1rem] text-xs text-slate-500 transition-colors sm:min-h-[1.25rem] sm:text-sm ${
                        role.showHighlight ? 'bg-blue-50' : ''
                      }`}
                    >
                      {role.displayText || (
                        <span className="text-slate-300">Your Title</span>
                      )}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="mt-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-xs">
                      Contact
                    </div>
                    <div className="mt-1.5 space-y-0.5 text-[10px] text-slate-600 sm:text-xs">
                      <div>sarah@example.com</div>
                      <div>San Francisco, CA</div>
                    </div>
                  </div>

                  {/* Experience preview */}
                  <div className="mt-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-xs">
                      Experience
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="h-1.5 w-full rounded bg-slate-100" />
                      <div className="h-1.5 w-5/6 rounded bg-slate-100" />
                      <div className="h-1.5 w-4/6 rounded bg-slate-100" />
                    </div>
                  </div>

                  {/* Skills preview */}
                  <div className="mt-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-xs">
                      Skills
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <div className="h-4 w-10 rounded-full bg-slate-100 sm:h-5 sm:w-12" />
                      <div className="h-4 w-12 rounded-full bg-slate-100 sm:h-5 sm:w-14" />
                      <div className="h-4 w-8 rounded-full bg-slate-100 sm:h-5 sm:w-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements with parallax */}
      <div
        className="absolute -left-4 top-1/4 hidden animate-fade-in-up-delay-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg transition-transform duration-100 ease-out xl:block"
        style={leftFloatParallax.style}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-4 w-4 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-900">Auto-saved</div>
            <div className="text-[10px] text-slate-500">Just now</div>
          </div>
        </div>
      </div>

      <div
        className="absolute -right-4 bottom-1/4 hidden animate-fade-in-up-delay-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg transition-transform duration-100 ease-out xl:block"
        style={rightFloatParallax.style}
      >
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 ${
              name.isTyping || role.isTyping ? 'sync-indicator' : ''
            }`}
          >
            <svg
              className="h-4 w-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-900">Live preview</div>
            <div className="text-[10px] text-slate-500">
              {name.isTyping || role.isTyping ? 'Syncing...' : 'Updates instantly'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge />

          <h1 className="animate-fade-in-up-delay-1 mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Build a CV that
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              gets you hired
            </span>
          </h1>

          <p className="animate-fade-in-up-delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Create a professional resume in minutes with our guided editor and
            real-time preview. No sign-up required.
          </p>

          <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/editor"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              <span>Start Building Your CV</span>
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              <span>See How It Works</span>
            </a>
          </div>
        </div>

        <ProductMockup />
      </div>
    </section>
  )
}
