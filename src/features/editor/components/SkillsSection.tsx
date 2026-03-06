import { useState } from 'react'
import { useCv } from '../../../app/providers'

export function SkillsSection() {
  const { cv, updateCv } = useCv()
  const [draftSkills, setDraftSkills] = useState<string[]>(cv.skills)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const isDirty = JSON.stringify(draftSkills) !== JSON.stringify(cv.skills)

  const handleAddSkill = () => {
    const trimmed = inputValue.trim()

    if (!trimmed) {
      setError('Skill cannot be empty')
      return
    }

    const isDuplicate = draftSkills.some(
      skill => skill.toLowerCase() === trimmed.toLowerCase()
    )
    if (isDuplicate) {
      setError('Skill already exists')
      return
    }

    setDraftSkills([...draftSkills, trimmed])
    setInputValue('')
    setError(null)
  }

  const handleRemoveSkill = (index: number) => {
    setDraftSkills(draftSkills.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleSave = () => {
    updateCv(draft => {
      draft.skills = draftSkills
    })
  }

  const handleCancel = () => {
    setDraftSkills(cv.skills)
    setInputValue('')
    setError(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value)
              setError(null)
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., React, TypeScript, Node.js"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            aria-label="Add skill"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        <button
          type="button"
          onClick={handleAddSkill}
          className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          Add
        </button>
      </div>

      {draftSkills.length === 0 ? (
        <p className="text-sm text-slate-500">No skills added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {draftSkills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="ml-1 rounded-full p-0.5 hover:bg-blue-200"
                aria-label={`Remove ${skill}`}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {isDirty && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
