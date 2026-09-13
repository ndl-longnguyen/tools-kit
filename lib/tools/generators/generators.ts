export interface UuidOptions {
  count?: number
  uppercase?: boolean
  hyphens?: boolean
}

export function generateUUIDs(options: UuidOptions = {}): string[] {
  const { count = 1, uppercase = false, hyphens = true } = options
  const safeCount = Math.max(1, Math.min(100, count))
  const uuids: string[] = []

  for (let i = 0; i < safeCount; i++) {
    let id = ''
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      id = crypto.randomUUID()
    } else {
      // Fallback RFC 4122 v4 UUID
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }

    if (!hyphens) {
      id = id.replace(/-/g, '')
    }
    if (uppercase) {
      id = id.toUpperCase()
    }
    uuids.push(id)
  }

  return uuids
}

export interface RandomStringOptions {
  length?: number
  uppercase?: boolean
  lowercase?: boolean
  numbers?: boolean
  symbols?: boolean
  count?: number
}

export function generateRandomStrings(options: RandomStringOptions = {}): string[] {
  const {
    length = 16,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = false,
    count = 1,
  } = options

  let charset = ''
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
  if (numbers) charset += '0123456789'
  if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

  if (!charset) {
    charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
  }

  const safeCount = Math.max(1, Math.min(100, count))
  const safeLength = Math.max(1, Math.min(512, length))
  const results: string[] = []

  const charsetLength = charset.length
  for (let i = 0; i < safeCount; i++) {
    let str = ''
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const buffer = new Uint32Array(safeLength)
      crypto.getRandomValues(buffer)
      for (let j = 0; j < safeLength; j++) {
        str += charset[buffer[j] % charsetLength]
      }
    } else {
      for (let j = 0; j < safeLength; j++) {
        str += charset[Math.floor(Math.random() * charsetLength)]
      }
    }
    results.push(str)
  }

  return results
}

export interface RandomNumberOptions {
  min?: number
  max?: number
  count?: number
  unique?: boolean
  sort?: 'none' | 'asc' | 'desc'
}

export function generateRandomNumbers(options: RandomNumberOptions = {}): { numbers: number[]; error?: string } {
  const { min = 1, max = 100, count = 1, unique = false, sort = 'none' } = options

  if (min > max) {
    return { numbers: [], error: 'Minimum value cannot be greater than Maximum value.' }
  }

  const range = max - min + 1
  const safeCount = Math.max(1, Math.min(1000, count))

  if (unique && safeCount > range) {
    return {
      numbers: [],
      error: `Cannot generate ${safeCount} unique numbers from a range of ${range} possible numbers (${min} to ${max}).`,
    }
  }

  const numbers: number[] = []
  const used = new Set<number>()

  while (numbers.length < safeCount) {
    let randNum: number
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const buffer = new Uint32Array(1)
      crypto.getRandomValues(buffer)
      randNum = min + (buffer[0] % range)
    } else {
      randNum = Math.floor(Math.random() * range) + min
    }

    if (unique) {
      if (!used.has(randNum)) {
        used.add(randNum)
        numbers.push(randNum)
      }
    } else {
      numbers.push(randNum)
    }
  }

  if (sort === 'asc') {
    numbers.sort((a, b) => a - b)
  } else if (sort === 'desc') {
    numbers.sort((a, b) => b - a)
  }

  return { numbers }
}

export interface RandomChoiceOptions {
  count?: number
  allowDuplicates?: boolean
}

export function pickRandomChoice(
  inputText: string,
  options: RandomChoiceOptions = {}
): { choices: string[]; error?: string } {
  if (!inputText || inputText.trim() === '') {
    return { choices: [], error: 'Please provide at least one option to pick from.' }
  }

  const { count = 1, allowDuplicates = false } = options
  const lines = inputText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  if (lines.length === 0) {
    return { choices: [], error: 'Please enter valid, non-empty options.' }
  }

  const safeCount = Math.max(1, Math.min(lines.length, count))
  const pool = [...lines]
  const picked: string[] = []

  if (!allowDuplicates) {
    for (let i = 0; i < safeCount; i++) {
      const idx = Math.floor(Math.random() * pool.length)
      picked.push(pool[idx])
      pool.splice(idx, 1)
    }
  } else {
    for (let i = 0; i < safeCount; i++) {
      const idx = Math.floor(Math.random() * lines.length)
      picked.push(lines[idx])
    }
  }

  return { choices: picked }
}
