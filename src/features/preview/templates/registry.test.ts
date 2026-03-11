import { describe, it, expect } from 'vitest'
import {
  getTemplateComponent,
  getTemplateInfo,
  getAllTemplateIds,
  TEMPLATE_INFO,
  TEMPLATE_REGISTRY,
} from './registry'
import { TemplateV1 } from './TemplateV1'

describe('template registry', () => {
  describe('getAllTemplateIds', () => {
    it('returns all four template IDs', () => {
      const ids = getAllTemplateIds()

      expect(ids).toHaveLength(4)
      expect(ids).toContain('classic')
      expect(ids).toContain('modern')
      expect(ids).toContain('executive')
      expect(ids).toContain('creative')
    })
  })

  describe('TEMPLATE_INFO', () => {
    it('has info for all template IDs', () => {
      const ids = getAllTemplateIds()

      ids.forEach((id) => {
        expect(TEMPLATE_INFO[id]).toBeDefined()
        expect(TEMPLATE_INFO[id].id).toBe(id)
        expect(TEMPLATE_INFO[id].displayName).toBeTruthy()
        expect(TEMPLATE_INFO[id].description).toBeTruthy()
      })
    })
  })

  describe('TEMPLATE_REGISTRY', () => {
    it('has component for all template IDs', () => {
      const ids = getAllTemplateIds()

      ids.forEach((id) => {
        expect(TEMPLATE_REGISTRY[id]).toBeDefined()
        expect(typeof TEMPLATE_REGISTRY[id]).toBe('function')
      })
    })

    it('maps classic to TemplateV1', () => {
      expect(TEMPLATE_REGISTRY.classic).toBe(TemplateV1)
    })
  })

  describe('getTemplateComponent', () => {
    it('returns TemplateV1 for classic', () => {
      const component = getTemplateComponent('classic')

      expect(component).toBe(TemplateV1)
    })

    it('returns a component for all template IDs', () => {
      const ids = getAllTemplateIds()

      ids.forEach((id) => {
        const component = getTemplateComponent(id)
        expect(typeof component).toBe('function')
      })
    })
  })

  describe('getTemplateInfo', () => {
    it('returns info for classic template', () => {
      const info = getTemplateInfo('classic')

      expect(info.id).toBe('classic')
      expect(info.displayName).toBe('Classic')
      expect(info.description).toContain('professional')
    })

    it('returns info for all template IDs', () => {
      const ids = getAllTemplateIds()

      ids.forEach((id) => {
        const info = getTemplateInfo(id)
        expect(info.id).toBe(id)
        expect(info.displayName).toBeTruthy()
        expect(info.description).toBeTruthy()
      })
    })
  })
})
