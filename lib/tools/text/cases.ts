export function toUpperCase(text: string): string {
  if (!text) return ''
  return text.toUpperCase()
}

export function toLowerCase(text: string): string {
  if (!text) return ''
  return text.toLowerCase()
}

const MINOR_WORDS = new Set([
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'en', 'for', 'if', 'in', 'of',
  'on', 'or', 'the', 'to', 'v', 'v.', 'via', 'vs', 'vs.'
])

export function toTitleCase(text: string): string {
  if (!text) return ''
  return text.replace(/\w\S*/g, (word, index) => {
    const lower = word.toLowerCase()
    // Always capitalize first word or if not in minor words
    if (index === 0 || !MINOR_WORDS.has(lower)) {
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return lower
  })
}

export function toSentenceCase(text: string): string {
  if (!text) return ''
  const lower = text.toLowerCase()
  // Capitalize first letter of string and after ., !, or ?
  return lower.replace(/(^\s*|[.!?]\s+)(\p{L})/gu, (_match, prefix, char) => {
    return prefix + char.toUpperCase()
  })
}

export function capitalizeWords(text: string): string {
  if (!text) return ''
  return text.replace(/\b(\p{L})/gu, (char) => char.toUpperCase())
}
