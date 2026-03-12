import { describe, it, expect } from 'vitest'
import {
  WIZARD_STEPS,
  TOTAL_STEPS,
  getStepConfig,
  isValidStep,
} from './wizardConfig'

describe('wizardConfig', () => {
  describe('WIZARD_STEPS', () => {
    it('has 5 steps', () => {
      expect(WIZARD_STEPS).toHaveLength(5)
    })

    it('has sequential ids from 1 to 5', () => {
      WIZARD_STEPS.forEach((step, index) => {
        expect(step.id).toBe(index + 1)
      })
    })

    it('has required fields for each step', () => {
      WIZARD_STEPS.forEach(step => {
        expect(step).toHaveProperty('id')
        expect(step).toHaveProperty('slug')
        expect(step).toHaveProperty('title')
        expect(step).toHaveProperty('shortTitle')
      })
    })
  })

  describe('TOTAL_STEPS', () => {
    it('equals the length of WIZARD_STEPS', () => {
      expect(TOTAL_STEPS).toBe(WIZARD_STEPS.length)
    })
  })

  describe('getStepConfig', () => {
    it('returns correct step config for valid step numbers', () => {
      expect(getStepConfig(1).slug).toBe('getting-started')
      expect(getStepConfig(2).slug).toBe('experience')
      expect(getStepConfig(3).slug).toBe('education')
      expect(getStepConfig(4).slug).toBe('skills-projects')
      expect(getStepConfig(5).slug).toBe('finishing-up')
    })

    it('returns first step for invalid step number', () => {
      expect(getStepConfig(0)).toEqual(WIZARD_STEPS[0])
      expect(getStepConfig(6)).toEqual(WIZARD_STEPS[0])
      expect(getStepConfig(-1)).toEqual(WIZARD_STEPS[0])
    })
  })

  describe('isValidStep', () => {
    it('returns true for valid steps 1-5', () => {
      expect(isValidStep(1)).toBe(true)
      expect(isValidStep(2)).toBe(true)
      expect(isValidStep(3)).toBe(true)
      expect(isValidStep(4)).toBe(true)
      expect(isValidStep(5)).toBe(true)
    })

    it('returns false for invalid steps', () => {
      expect(isValidStep(0)).toBe(false)
      expect(isValidStep(6)).toBe(false)
      expect(isValidStep(-1)).toBe(false)
    })
  })
})
