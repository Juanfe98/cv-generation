import { createElement, useEffect, useRef, useState } from 'react'
import { useCv } from '../../app/providers'
import { getTemplateComponent } from '../preview/templates'

const A4_WIDTH = 794

export function PreviewPanel() {
  const { cv } = useCv()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const padding = 32 // 16px each side
        const availableWidth = containerWidth - padding
        setScale(Math.min(availableWidth / A4_WIDTH, 1))
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const TemplateComponent = getTemplateComponent(cv.settings.templateId)

  return (
    <div className="flex h-full flex-col">
      {/* Preview header bar */}
      <div className="flex-shrink-0 border-b border-slate-200/60 bg-gradient-to-b from-slate-50 to-slate-100/80 px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Icon in blue-50 container - brand motif */}
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50">
              <svg
                className="h-3.5 w-3.5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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
            </span>
            <span className="text-sm font-medium text-slate-700">Live Preview</span>
          </div>
          {/* Subtle status indicator */}
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Synced
          </span>
        </div>
      </div>

      {/* Preview canvas */}
      <div
        ref={containerRef}
        className="relative flex flex-1 items-start justify-center overflow-auto bg-gradient-to-br from-slate-100/80 via-slate-50 to-slate-100/80 p-4 md:p-5"
        data-testid="preview-panel"
      >
        {/* Subtle grid pattern for canvas feel */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h1v32H0V0zm31 0h1v32h-1V0zM0 0h32v1H0V0zm0 31h32v1H0v-1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Paper document with premium shadow */}
        <div
          className="relative origin-top"
          style={{
            transform: `scale(${scale})`,
            width: A4_WIDTH,
          }}
        >
          {/* Layered shadow for depth */}
          <div className="absolute -inset-1.5 rounded-sm bg-slate-900/[0.06] blur-md" />
          <div className="absolute -inset-0.5 rounded-sm bg-slate-900/[0.03]" />
          {/* The CV content */}
          <div className="relative rounded-sm bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
            {createElement(TemplateComponent, { cv })}
          </div>
        </div>
      </div>
    </div>
  )
}
