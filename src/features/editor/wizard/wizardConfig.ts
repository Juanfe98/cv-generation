import i18n from '../../../core/i18n/config'

export interface StepConfig {
  id: number
  slug: string
  title: string
  shortTitle: string
}

interface StepDefinition {
  id: number
  slug: string
  titleKey: string
  shortTitleKey: string
}

const STEP_DEFINITIONS: readonly StepDefinition[] = [
  { id: 1, slug: 'personal-info', titleKey: 'steps.gettingStarted.title', shortTitleKey: 'steps.gettingStarted.shortTitle' },
  { id: 2, slug: 'experience', titleKey: 'steps.workExperience.title', shortTitleKey: 'steps.workExperience.shortTitle' },
  { id: 3, slug: 'education', titleKey: 'steps.education.title', shortTitleKey: 'steps.education.shortTitle' },
  { id: 4, slug: 'skills-projects', titleKey: 'steps.skillsProjects.title', shortTitleKey: 'steps.skillsProjects.shortTitle' },
  { id: 5, slug: 'review', titleKey: 'steps.review.title', shortTitleKey: 'steps.review.shortTitle' },
] as const

export const TOTAL_STEPS = STEP_DEFINITIONS.length

function translateStep(step: StepDefinition): StepConfig {
  return {
    id: step.id,
    slug: step.slug,
    title: i18n.t(step.titleKey, { ns: 'wizard' }),
    shortTitle: i18n.t(step.shortTitleKey, { ns: 'wizard' }),
  }
}

// Returns translated steps - call this at render time to get current language
export function getWizardSteps(): readonly StepConfig[] {
  return STEP_DEFINITIONS.map(translateStep)
}

// For backwards compatibility - returns translated steps
export const WIZARD_STEPS: readonly StepConfig[] = getWizardSteps()

export function getStepConfig(stepNumber: number): StepConfig {
  const step = STEP_DEFINITIONS.find(s => s.id === stepNumber)
  if (!step) {
    return translateStep(STEP_DEFINITIONS[0])
  }
  return translateStep(step)
}

export function isValidStep(step: number): boolean {
  return step >= 1 && step <= TOTAL_STEPS
}
