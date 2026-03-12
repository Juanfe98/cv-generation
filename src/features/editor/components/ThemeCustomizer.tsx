import { useCv } from '../../../app/providers'
import { ACCENT_COLOR_OPTIONS, SPACING_PRESET_OPTIONS } from '../../../core/theme'
import type { AccentColor, SpacingPreset } from '../../../core/cv/types'

export function ThemeCustomizer() {
  const { cv, updateCv } = useCv()
  const { accentColor, spacingPreset } = cv.settings

  const handleAccentColorChange = (color: AccentColor) => {
    updateCv((draft) => {
      draft.settings.accentColor = color
    })
  }

  const handleSpacingChange = (spacing: SpacingPreset) => {
    updateCv((draft) => {
      draft.settings.spacingPreset = spacing
    })
  }

  return (
    <div className="space-y-6">
      {/* Accent Color Picker */}
      <div>
        <label className="mb-3 block text-sm font-medium text-slate-700">Accent Color</label>
        <div className="flex gap-3">
          {ACCENT_COLOR_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleAccentColorChange(option.value)}
              className={`group relative h-10 w-10 rounded-full transition-transform hover:scale-110 ${option.colorClass} ${
                accentColor === option.value ? 'ring-2 ring-offset-2 ring-slate-900' : ''
              }`}
              title={option.label}
              aria-label={`Select ${option.label} accent color`}
              aria-pressed={accentColor === option.value}
            >
              {accentColor === option.value && (
                <svg
                  className="absolute inset-0 m-auto h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Spacing Preset Selector */}
      <div>
        <label className="mb-3 block text-sm font-medium text-slate-700">Spacing</label>
        <div className="flex gap-2">
          {SPACING_PRESET_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSpacingChange(option.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                spacingPreset === option.value
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              aria-pressed={spacingPreset === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
