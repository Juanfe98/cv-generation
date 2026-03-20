import { useState, type ReactNode } from 'react'
import { MobileViewToggle } from './MobileViewToggle'
import { PreviewPanel } from './PreviewPanel'

interface SplitLayoutProps {
  children: ReactNode
}

export function SplitLayout({ children }: SplitLayoutProps) {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor')

  return (
    <div className="flex h-full flex-col p-0 md:h-[calc(100vh-56px)] md:p-4 lg:p-5">
      {/* Workspace container with premium framing */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:rounded-xl md:border md:border-slate-200/60 md:bg-white md:shadow-xl md:shadow-slate-900/[0.08] md:ring-1 md:ring-slate-900/[0.05]">
        <MobileViewToggle value={mobileView} onChange={setMobileView} />

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
          {/* Editor panel - left on desktop */}
          <div
            className={`relative flex h-full flex-1 flex-col overflow-hidden bg-white md:w-1/2 ${
              mobileView !== 'editor' ? 'hidden md:flex' : ''
            }`}
            data-testid="editor-container"
          >
            {children}
          </div>

          {/* Panel divider - refined visual relationship */}
          <div className="hidden md:block">
            <div className="relative h-full w-px bg-slate-200">
              {/* Soft glow on divider for depth */}
              <div className="absolute inset-y-0 -left-3 w-3 bg-gradient-to-r from-transparent to-slate-900/[0.02]" />
              <div className="absolute inset-y-0 -right-3 w-3 bg-gradient-to-l from-transparent to-slate-900/[0.02]" />
            </div>
          </div>

          {/* Preview panel - right on desktop */}
          <div
            className={`relative md:w-1/2 ${
              mobileView !== 'preview' ? 'hidden md:block' : ''
            }`}
            data-testid="preview-container"
          >
            <PreviewPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
