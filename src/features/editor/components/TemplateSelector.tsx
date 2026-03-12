import { useState } from 'react'
import { useCv } from '../../../app/providers'
import { getTemplateInfo } from '../../preview/templates'
import { TemplateGalleryModal } from './TemplateGalleryModal'
import type { TemplateId } from '../../../core/cv/types'

export function TemplateSelector() {
  const { cv, updateCv } = useCv()
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const selectedId = cv.settings.templateId
  const selectedTemplate = getTemplateInfo(selectedId)

  const handleSelect = (id: TemplateId) => {
    updateCv((draft) => {
      draft.settings.templateId = id
    })
  }

  return (
    <div className="space-y-4">
      {/* Current selection display */}
      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
        <div>
          <p className="text-sm text-slate-500">Current template</p>
          <p className="font-semibold text-slate-900">{selectedTemplate.displayName}</p>
        </div>
        <button
          type="button"
          onClick={() => setIsGalleryOpen(true)}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Browse Templates
        </button>
      </div>

      {/* Gallery modal */}
      <TemplateGalleryModal
        isOpen={isGalleryOpen}
        selectedTemplateId={selectedId}
        onSelect={handleSelect}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  )
}
