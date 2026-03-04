/**
 * Moves an item in an array from one index to another
 * Returns a new array without mutating the original
 */
export function reorderArray<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  if (
    fromIndex < 0 ||
    fromIndex >= array.length ||
    toIndex < 0 ||
    toIndex >= array.length ||
    fromIndex === toIndex
  ) {
    return array
  }

  const result = [...array]
  const [removed] = result.splice(fromIndex, 1)
  result.splice(toIndex, 0, removed)
  return result
}
