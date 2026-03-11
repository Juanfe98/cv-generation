import { createElement } from 'react'
import { useCv } from '../../app/providers'
import { getTemplateComponent } from './templates'

export function PreviewPage() {
  const { cv } = useCv()

  return (
    <div className="min-h-screen bg-slate-100 py-8 print:bg-white print:py-0">
      {createElement(getTemplateComponent(cv.settings.templateId), { cv })}
    </div>
  )
}
