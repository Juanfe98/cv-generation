import { describe, it, expect } from 'vitest'
import { reorderArray } from './reorder'

describe('reorderArray', () => {
  it('moves item from one position to another', () => {
    const arr = ['a', 'b', 'c', 'd']
    const result = reorderArray(arr, 0, 2)
    expect(result).toEqual(['b', 'c', 'a', 'd'])
  })

  it('moves item up (from higher index to lower)', () => {
    const arr = ['a', 'b', 'c', 'd']
    const result = reorderArray(arr, 3, 1)
    expect(result).toEqual(['a', 'd', 'b', 'c'])
  })

  it('returns same array if fromIndex equals toIndex', () => {
    const arr = ['a', 'b', 'c']
    const result = reorderArray(arr, 1, 1)
    expect(result).toBe(arr)
  })

  it('returns same array if fromIndex is out of bounds', () => {
    const arr = ['a', 'b', 'c']
    expect(reorderArray(arr, -1, 1)).toBe(arr)
    expect(reorderArray(arr, 5, 1)).toBe(arr)
  })

  it('returns same array if toIndex is out of bounds', () => {
    const arr = ['a', 'b', 'c']
    expect(reorderArray(arr, 1, -1)).toBe(arr)
    expect(reorderArray(arr, 1, 5)).toBe(arr)
  })

  it('does not mutate original array', () => {
    const arr = ['a', 'b', 'c']
    const result = reorderArray(arr, 0, 2)
    expect(arr).toEqual(['a', 'b', 'c'])
    expect(result).not.toBe(arr)
  })

  it('works with objects', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const result = reorderArray(arr, 2, 0)
    expect(result.map(x => x.id)).toEqual([3, 1, 2])
  })
})
