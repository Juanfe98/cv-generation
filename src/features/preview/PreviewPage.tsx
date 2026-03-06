import { useCv } from '../../app/providers'
import { TemplateV1 } from './templates'

export function PreviewPage() {
  const { cv } = useCv()

  return (
    <div className="min-h-screen bg-slate-100 py-8 print:bg-white print:py-0">
      <TemplateV1 cv={cv} />
    </div>
  )
}
