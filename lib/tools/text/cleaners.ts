export interface RemoveLineBreaksOptions {
  replaceWith?: 'space' | 'none' | 'comma' | 'custom'
  customSeparator?: string
  preserveParagraphs?: boolean
}

export function removeLineBreaks(text: string, options: RemoveLineBreaksOptions = {}): string {
  if (!text) return ''
  const { replaceWith = 'space', customSeparator = '', preserveParagraphs = false } = options

  let separator = ' '
  if (replaceWith === 'none') separator = ''
  else if (replaceWith === 'comma') separator = ', '
  else if (replaceWith === 'custom') separator = customSeparator

  if (preserveParagraphs) {
    // Split by 2 or more newlines
    const paragraphs = text.split(/\r?\n\s*\r?\n/)
    return paragraphs
      .map((p) => p.replace(/\r?\n+/g, separator).trim())
      .join('\n\n')
  }

  return text.replace(/\r?\n+/g, separator).trim()
}

export function removeEmptyLines(text: string): string {
  if (!text) return ''
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .join('\n')
}

export interface RemoveDuplicateLinesOptions {
  caseSensitive?: boolean
}

export function removeDuplicateLines(
  text: string,
  options: RemoveDuplicateLinesOptions = { caseSensitive: true }
): { result: string; removedCount: number } {
  if (!text) return { result: '', removedCount: 0 }
  const lines = text.split(/\r?\n/)
  const seen = new Set<string>()
  const uniqueLines: string[] = []

  let removedCount = 0
  for (const line of lines) {
    const key = options.caseSensitive ? line : line.toLowerCase()
    if (seen.has(key)) {
      removedCount++
    } else {
      seen.add(key)
      uniqueLines.push(line)
    }
  }

  return {
    result: uniqueLines.join('\n'),
    removedCount,
  }
}

export function removeExtraSpaces(text: string): string {
  if (!text) return ''
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/[^\S\r\n]+/g, ' ').trim())
    .join('\n')
}

export function removeNumbers(text: string): string {
  if (!text) return ''
  return text.replace(/[0-9]/g, '')
}

export function removePunctuation(text: string): string {
  if (!text) return ''
  // Covers ASCII punctuation and common Unicode punctuation marks
  return text.replace(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~–—‘’“”„…«»]/g, '')
}

export function removeSpecialCharacters(text: string, keepSpaces = true): string {
  if (!text) return ''
  if (keepSpaces) {
    // Keep alphanumeric and whitespace/newlines
    return text.replace(/[^\p{L}\p{N}\s]/gu, '')
  }
  return text.replace(/[^\p{L}\p{N}]/gu, '')
}

export function trimLines(text: string, mode: 'both' | 'start' | 'end' = 'both'): string {
  if (!text) return ''
  const lines = text.split(/\r?\n/)
  return lines
    .map((line) => {
      if (mode === 'start') return line.trimStart()
      if (mode === 'end') return line.trimEnd()
      return line.trim()
    })
    .join('\n')
}

export function normalizeWhitespace(text: string): string {
  if (!text) return ''
  // Convert tabs, non-breaking spaces (\u00A0), and other Unicode space chars to standard space
  return text
    .replace(/[\t\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
}

export function normalizeLineBreaks(text: string, target: 'lf' | 'crlf' = 'lf'): string {
  if (!text) return ''
  // First convert all to standard LF
  const unified = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  if (target === 'crlf') {
    return unified.replace(/\n/g, '\r\n')
  }
  return unified
}
