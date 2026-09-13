export type SortMode = 'a-z' | 'z-a' | 'length-asc' | 'length-desc' | 'reverse' | 'shuffle'

export function sortLines(text: string, mode: SortMode = 'a-z'): string {
  if (!text) return ''
  const lines = text.split(/\r?\n/)

  switch (mode) {
    case 'a-z':
      return [...lines].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })).join('\n')
    case 'z-a':
      return [...lines].sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' })).join('\n')
    case 'length-asc':
      return [...lines].sort((a, b) => a.length - b.length).join('\n')
    case 'length-desc':
      return [...lines].sort((a, b) => b.length - a.length).join('\n')
    case 'reverse':
      return [...lines].reverse().join('\n')
    case 'shuffle': {
      const arr = [...lines]
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr.join('\n')
    }
    default:
      return text
  }
}

export type ReverseMode = 'chars' | 'words' | 'lines'

export function reverseText(text: string, mode: ReverseMode = 'chars'): string {
  if (!text) return ''

  if (mode === 'chars') {
    // Array.from splits correctly on Unicode graphemes
    return Array.from(text).reverse().join('')
  }

  if (mode === 'words') {
    return text
      .split(/\r?\n/)
      .map((line) => line.split(/\s+/).reverse().join(' '))
      .join('\n')
  }

  if (mode === 'lines') {
    return text.split(/\r?\n/).reverse().join('\n')
  }

  return text
}

export function addPrefixSuffix(text: string, prefix = '', suffix = ''): string {
  if (!text) return ''
  return text
    .split(/\r?\n/)
    .map((line) => `${prefix}${line}${suffix}`)
    .join('\n')
}

export interface LineNumberOptions {
  startNumber?: number
  separator?: string
  padZeros?: boolean
  padLength?: number
}

export function addLineNumbers(text: string, options: LineNumberOptions = {}): string {
  if (!text) return ''
  const { startNumber = 1, separator = '. ', padZeros = false, padLength = 2 } = options
  const lines = text.split(/\r?\n/)

  return lines
    .map((line, idx) => {
      let numStr = String(startNumber + idx)
      if (padZeros) {
        numStr = numStr.padStart(padLength, '0')
      }
      return `${numStr}${separator}${line}`
    })
    .join('\n')
}

export function removeLineNumbers(text: string): string {
  if (!text) return ''
  // Matches leading digits and common separators like ". ", ") ", ": ", or whitespace
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\d+[\.\)\:\-\s]\s*/, ''))
    .join('\n')
}
