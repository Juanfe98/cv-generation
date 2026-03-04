import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { Draft } from 'immer'
import { CvProvider } from './CvProvider'
import { useCv } from './useCv'
import { STORAGE_KEY } from '../../core'
import type { CvModel } from '../../core'

function TestConsumer() {
  const { cv, updateCv, resetCv } = useCv()
  const displayName = cv.profile.fullName || 'Unnamed'

  return (
    <div>
      <span data-testid="name">{displayName}</span>
      <button onClick={() => updateCv((draft: Draft<CvModel>) => { draft.profile.fullName = 'John Doe' })}>
        Set Name
      </button>
      <button onClick={resetCv}>Reset</button>
    </div>
  )
}

describe('CvProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('provides empty CV by default', () => {
    render(
      <CvProvider>
        <TestConsumer />
      </CvProvider>
    )

    expect(screen.getByTestId('name')).toHaveTextContent('Unnamed')
  })

  it('updateCv updates the CV state with Immer', async () => {
    const user = userEvent.setup()
    render(
      <CvProvider>
        <TestConsumer />
      </CvProvider>
    )

    await user.click(screen.getByRole('button', { name: /set name/i }))

    expect(screen.getByTestId('name')).toHaveTextContent('John Doe')
  })

  it('resetCv clears the CV and storage', async () => {
    const user = userEvent.setup()
    render(
      <CvProvider>
        <TestConsumer />
      </CvProvider>
    )

    // First set a name
    await user.click(screen.getByRole('button', { name: /set name/i }))
    expect(screen.getByTestId('name')).toHaveTextContent('John Doe')

    // Then reset
    await user.click(screen.getByRole('button', { name: /reset/i }))

    expect(screen.getByTestId('name')).toHaveTextContent('Unnamed')
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })
})

describe('useCv', () => {
  it('throws error when used outside CvProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestConsumer />)).toThrow(
      'useCv must be used within a CvProvider'
    )

    consoleError.mockRestore()
  })
})
