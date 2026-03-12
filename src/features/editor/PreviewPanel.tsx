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
    <div
      ref={containerRef}
      className="h-full overflow-auto bg-slate-100 p-4"
      data-testid="preview-panel"
    >
      <div
        className="origin-top-left"
        style={{
          transform: `scale(${scale})`,
          width: A4_WIDTH,
        }}
      >
        {createElement(TemplateComponent, { cv })}
      </div>
    </div>
  )
}
