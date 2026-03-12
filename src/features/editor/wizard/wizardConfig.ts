export interface StepConfig {
  id: number
  slug: string
  title: string
  shortTitle: string
}

export const WIZARD_STEPS: readonly StepConfig[] = [
  { id: 1, slug: 'personal-info', title: 'Personal Information', shortTitle: 'Personal Info' },
  { id: 2, slug: 'experience', title: 'Work Experience', shortTitle: 'Experience' },
  { id: 3, slug: 'education', title: 'Education', shortTitle: 'Education' },
  { id: 4, slug: 'skills-projects', title: 'Skills & Projects', shortTitle: 'Skills' },
  { id: 5, slug: 'review', title: 'Review', shortTitle: 'Review' },
] as const

export const TOTAL_STEPS = WIZARD_STEPS.length

export function getStepConfig(stepNumber: number): StepConfig {
  const step = WIZARD_STEPS.find(s => s.id === stepNumber)
  if (!step) {
    return WIZARD_STEPS[0]
  }
  return step
}

export function isValidStep(step: number): boolean {
  return step >= 1 && step <= TOTAL_STEPS
}
