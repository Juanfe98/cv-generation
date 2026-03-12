import { useState, type ReactNode } from 'react'
import { MobileViewToggle } from './MobileViewToggle'
import { PreviewPanel } from './PreviewPanel'

interface SplitLayoutProps {
  children: ReactNode
}

export function SplitLayout({ children }: SplitLayoutProps) {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor')

  return (
    <div className="flex flex-col md:h-[calc(100vh-64px)]">
      <MobileViewToggle value={mobileView} onChange={setMobileView} />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
        {/* Editor panel - left on desktop */}
        <div
          className={`flex h-full flex-1 flex-col overflow-hidden md:w-1/2 md:border-r md:border-slate-200 ${
            mobileView !== 'editor' ? 'hidden md:flex' : ''
          }`}
          data-testid="editor-container"
        >
          {children}
        </div>

        {/* Preview panel - right on desktop */}
        <div
          className={`md:w-1/2 ${
            mobileView !== 'preview' ? 'hidden md:block' : ''
          }`}
          data-testid="preview-container"
        >
          <PreviewPanel />
        </div>
      </div>
    </div>
  )
}
