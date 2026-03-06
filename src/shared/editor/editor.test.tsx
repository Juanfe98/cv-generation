import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditorCard, ReorderButtons, AddItemButton, EditorSectionShell, EditButton, DeleteButton } from './index'

describe('EditorCard', () => {
  it('renders children', () => {
    render(<EditorCard>Card content</EditorCard>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders header with left and right slots', () => {
    render(
      <EditorCard>
        <EditorCard.Header
          left={<span>Left content</span>}
          right={<span>Right content</span>}
        />
      </EditorCard>
    )
    expect(screen.getByText('Left content')).toBeInTheDocument()
    expect(screen.getByText('Right content')).toBeInTheDocument()
  })
})

describe('ReorderButtons', () => {
  it('calls onMoveUp when up button clicked', async () => {
    const user = userEvent.setup()
    const onMoveUp = vi.fn()
    const onMoveDown = vi.fn()
    render(<ReorderButtons onMoveUp={onMoveUp} onMoveDown={onMoveDown} />)

    await user.click(screen.getByLabelText('Move up'))
    expect(onMoveUp).toHaveBeenCalledTimes(1)
    expect(onMoveDown).not.toHaveBeenCalled()
  })

  it('calls onMoveDown when down button clicked', async () => {
    const user = userEvent.setup()
    const onMoveUp = vi.fn()
    const onMoveDown = vi.fn()
    render(<ReorderButtons onMoveUp={onMoveUp} onMoveDown={onMoveDown} />)

    await user.click(screen.getByLabelText('Move down'))
    expect(onMoveDown).toHaveBeenCalledTimes(1)
    expect(onMoveUp).not.toHaveBeenCalled()
  })

  it('disables up button when disabledUp is true', () => {
    render(
      <ReorderButtons
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        disabledUp={true}
      />
    )
    expect(screen.getByLabelText('Move up')).toBeDisabled()
    expect(screen.getByLabelText('Move down')).not.toBeDisabled()
  })

  it('disables down button when disabledDown is true', () => {
    render(
      <ReorderButtons
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        disabledDown={true}
      />
    )
    expect(screen.getByLabelText('Move down')).toBeDisabled()
    expect(screen.getByLabelText('Move up')).not.toBeDisabled()
  })
})

describe('AddItemButton', () => {
  it('renders children and calls onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<AddItemButton onClick={onClick}>Add Item</AddItemButton>)

    expect(screen.getByText('Add Item')).toBeInTheDocument()
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('EditorSectionShell', () => {
  it('renders title and children', () => {
    render(
      <EditorSectionShell title="Test Section">
        <div>Section content</div>
      </EditorSectionShell>
    )
    expect(screen.getByText('Test Section')).toBeInTheDocument()
    expect(screen.getByText('Section content')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <EditorSectionShell title="Test" description="A helpful description">
        <div>Content</div>
      </EditorSectionShell>
    )
    expect(screen.getByText('A helpful description')).toBeInTheDocument()
  })

  it('renders actions when provided', () => {
    render(
      <EditorSectionShell title="Test" actions={<button>Save</button>}>
        <div>Content</div>
      </EditorSectionShell>
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })
})

describe('EditButton', () => {
  it('renders Edit text and calls onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<EditButton onClick={onClick} />)

    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('DeleteButton', () => {
  it('renders Delete text and calls onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<DeleteButton onClick={onClick} />)

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
