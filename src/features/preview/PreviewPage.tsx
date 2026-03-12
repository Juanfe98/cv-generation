import { createElement, useState } from 'react'
import { useCv } from '../../app/providers'
import { exportPdf, buildExportFileName } from '../../core'
import { getTemplateComponent } from './templates'

export function PreviewPage() {
  const { cv } = useCv()
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null)

  const handleDownload = async () => {
    setIsExporting(true)
    setError(null)
    setFallbackMessage(null)

    try {
      const result = await exportPdf(cv, cv.settings.templateId)
      const filename = buildExportFileName(cv, 'pdf')

      if (result.usedFallback && result.fallbackMessage) {
        setFallbackMessage(result.fallbackMessage)
      }

      const url = URL.createObjectURL(result.blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export PDF')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 print:bg-white print:py-0">
      <div className="mx-auto mb-4 flex max-w-[800px] justify-end px-8 print:hidden">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>
      {error && (
        <div className="mx-auto mb-4 max-w-[800px] px-8 print:hidden">
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
        </div>
      )}
      {fallbackMessage && (
        <div className="mx-auto mb-4 max-w-[800px] px-8 print:hidden">
          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">{fallbackMessage}</div>
        </div>
      )}
      {createElement(getTemplateComponent(cv.settings.templateId), { cv })}
    </div>
  )
}
