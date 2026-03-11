import { useCv } from '../../../app/providers'
import { getAllTemplateIds, getTemplateInfo } from '../../preview/templates'
import type { TemplateId } from '../../../core/cv/types'

export function TemplateSelector() {
  const { cv, updateCv } = useCv()
  const selectedId = cv.settings.templateId
  const templateIds = getAllTemplateIds()

  const handleSelect = (id: TemplateId) => {
    updateCv((draft) => {
      draft.settings.templateId = id
    })
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {templateIds.map((id) => {
        const info = getTemplateInfo(id)
        const isSelected = id === selectedId

        return (
          <button
            key={id}
            type="button"
            onClick={() => handleSelect(id)}
            className={`relative rounded-lg border-2 p-4 text-left transition-colors ${
              isSelected
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            {isSelected && (
              <span className="absolute right-2 top-2 rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
                Selected
              </span>
            )}
            <h3 className="font-semibold text-slate-900">{info.displayName}</h3>
            <p className="mt-1 text-sm text-slate-500">{info.description}</p>
          </button>
        )
      })}
    </div>
  )
}
