import type { ComponentType } from 'react'
import type { CvModel, TemplateId, TemplateCategory, LayoutType } from '../../../core/cv/types'
import { TemplateV1 } from './TemplateV1'
import { ModernTemplate } from './ModernTemplate'
import { ExecutiveTemplate } from './ExecutiveTemplate'
import { CreativeTemplate } from './CreativeTemplate'

export interface TemplateProps {
  cv: CvModel
}

export interface TemplateInfo {
  id: TemplateId
  displayName: string
  description: string
  category: TemplateCategory
  layoutType: LayoutType
}

export const TEMPLATE_INFO: Record<TemplateId, TemplateInfo> = {
  classic: {
    id: 'classic',
    displayName: 'Classic',
    description: 'Clean, professional layout with traditional structure',
    category: 'ats-friendly',
    layoutType: 'one-column',
  },
  modern: {
    id: 'modern',
    displayName: 'Modern',
    description: 'Contemporary design with a fresh, minimal aesthetic',
    category: 'modern',
    layoutType: 'two-column',
  },
  executive: {
    id: 'executive',
    displayName: 'Executive',
    description: 'Sophisticated layout for senior professionals',
    category: 'modern',
    layoutType: 'sidebar',
  },
  creative: {
    id: 'creative',
    displayName: 'Creative',
    description: 'Bold design for creative and design roles',
    category: 'creative',
    layoutType: 'one-column',
  },
}

export const TEMPLATE_REGISTRY: Record<TemplateId, ComponentType<TemplateProps>> = {
  classic: TemplateV1,
  modern: ModernTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
}

export function getTemplateComponent(id: TemplateId): ComponentType<TemplateProps> {
  return TEMPLATE_REGISTRY[id]
}

export function getTemplateInfo(id: TemplateId): TemplateInfo {
  return TEMPLATE_INFO[id]
}

export function getAllTemplateIds(): TemplateId[] {
  return Object.keys(TEMPLATE_INFO) as TemplateId[]
}
