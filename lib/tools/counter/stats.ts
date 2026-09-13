export interface TextStats {
  words: number
  characters: number
  charactersNoSpaces: number
  lines: number
  nonEmptyLines: number
  sentences: number
  paragraphs: number
  readingTimeMinutes: number
  readingTimeSeconds: number
  speakingTimeMinutes: number
  speakingTimeSeconds: number
  readingEaseScore: number
  readingLevel: string
  topWords: { word: string; count: number; percentage: number }[]
  uniqueWordCount: number
}

export function calculateTextStats(text: string): TextStats {
  if (!text || text.trim().length === 0) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      lines: 0,
      nonEmptyLines: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      readingTimeSeconds: 0,
      speakingTimeMinutes: 0,
      speakingTimeSeconds: 0,
      readingEaseScore: 100,
      readingLevel: 'Very Easy',
      topWords: [],
      uniqueWordCount: 0,
    }
  }

  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length

  // Words matching Unicode letters/numbers with contractions
  const wordsMatch = text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []
  const words = wordsMatch.length

  // Lines
  const allLines = text.split(/\r?\n/)
  const lines = allLines.length
  const nonEmptyLines = allLines.filter((l) => l.trim().length > 0).length

  // Paragraphs (blocks separated by blank lines)
  const paragraphs = text
    .split(/\r?\n\s*\r?\n/)
    .filter((p) => p.trim().length > 0).length || (words > 0 ? 1 : 0)

  // Sentences (split on ., !, ?)
  const sentencesMatch = text.match(/[^.!?]+[.!?]+(\s|$)/g) || []
  const sentences = sentencesMatch.length > 0 ? sentencesMatch.length : (words > 0 ? 1 : 0)

  // Reading time (average 200 WPM)
  const readingTotalSeconds = Math.ceil((words / 200) * 60)
  const readingTimeMinutes = Math.floor(readingTotalSeconds / 60)
  const readingTimeSeconds = readingTotalSeconds % 60

  // Speaking time (average 130 WPM)
  const speakingTotalSeconds = Math.ceil((words / 130) * 60)
  const speakingTimeMinutes = Math.floor(speakingTotalSeconds / 60)
  const speakingTimeSeconds = speakingTotalSeconds % 60

  // Word frequency & density
  const wordFrequencyMap = new Map<string, number>()
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me'])

  for (const w of wordsMatch) {
    const lower = w.toLowerCase()
    if (lower.length > 1 && !stopWords.has(lower)) {
      wordFrequencyMap.set(lower, (wordFrequencyMap.get(lower) || 0) + 1)
    }
  }

  const sortedWords = Array.from(wordFrequencyMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      percentage: Number(((count / (words || 1)) * 100).toFixed(1)),
    }))

  const uniqueWordCount = new Set(wordsMatch.map((w) => w.toLowerCase())).size

  // Approximate Flesch Reading Ease
  // Score = 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
  let totalSyllables = 0
  for (const w of wordsMatch) {
    totalSyllables += countSyllables(w)
  }

  let readingEaseScore = 100
  if (words > 0 && sentences > 0) {
    const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words)
    readingEaseScore = Math.max(0, Math.min(100, Math.round(score)))
  }

  let readingLevel = 'Standard'
  if (readingEaseScore >= 90) readingLevel = 'Very Easy (5th grade)'
  else if (readingEaseScore >= 80) readingLevel = 'Easy (6th grade)'
  else if (readingEaseScore >= 70) readingLevel = 'Fairly Easy (7th grade)'
  else if (readingEaseScore >= 60) readingLevel = 'Standard (8th–9th grade)'
  else if (readingEaseScore >= 50) readingLevel = 'Fairly Difficult (10th–12th grade)'
  else if (readingEaseScore >= 30) readingLevel = 'Difficult (College)'
  else readingLevel = 'Very Confusing (Professional/Academic)'

  return {
    words,
    characters,
    charactersNoSpaces,
    lines,
    nonEmptyLines,
    sentences,
    paragraphs,
    readingTimeMinutes,
    readingTimeSeconds,
    speakingTimeMinutes,
    speakingTimeSeconds,
    readingEaseScore,
    readingLevel,
    topWords: sortedWords,
    uniqueWordCount,
  }
}

function countSyllables(word: string): number {
  word = word.toLowerCase().trim()
  if (word.length <= 3) return 1
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '')
  word = word.replace(/^y/, '')
  const syllables = word.match(/[aeiouy]{1,2}/g)
  return syllables ? Math.max(1, syllables.length) : 1
}
