import { describe, it, expect } from 'vitest'
import {
  removeLineBreaks,
  removeEmptyLines,
  removeDuplicateLines,
  removeExtraSpaces,
  removeNumbers,
  removePunctuation,
  trimLines,
  normalizeWhitespace,
} from '../text/cleaners'
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  capitalizeWords,
} from '../text/cases'
import { sortLines, reverseText, addPrefixSuffix, addLineNumbers } from '../text/operations'
import { calculateTextStats } from '../counter/stats'
import { formatJson, validateJson, minifyJson } from '../developer/json'
import { encodeBase64, decodeBase64, encodeUrl, decodeUrl } from '../developer/encoding'
import { generateUUIDs, generateRandomNumbers } from '../generators/generators'

describe('Text Cleaning Tools', () => {
  it('removes line breaks', () => {
    expect(removeLineBreaks('hello\nworld')).toBe('hello world')
    expect(removeLineBreaks('line1\r\nline2', { replaceWith: 'none' })).toBe('line1line2')
  })

  it('removes empty lines', () => {
    expect(removeEmptyLines('a\n\n  \nb')).toBe('a\nb')
  })

  it('removes duplicate lines', () => {
    const res = removeDuplicateLines('a\nb\na\nc')
    expect(res.result).toBe('a\nb\nc')
    expect(res.removedCount).toBe(1)
  })

  it('removes extra spaces', () => {
    expect(removeExtraSpaces('hello   world  !')).toBe('hello world !')
  })

  it('removes numbers', () => {
    expect(removeNumbers('User 123 scored 99 points')).toBe('User  scored  points')
  })

  it('removes punctuation', () => {
    expect(removePunctuation('Hello, world! How are you?')).toBe('Hello world How are you')
  })

  it('trims lines', () => {
    expect(trimLines('  a  \n  b  ')).toBe('a\nb')
  })

  it('normalizes whitespace', () => {
    expect(normalizeWhitespace('a\u00A0b\tc')).toBe('a b c')
  })
})

describe('Case Conversion Tools', () => {
  it('converts to uppercase', () => {
    expect(toUpperCase('textkit')).toBe('TEXTKIT')
  })

  it('converts to lowercase', () => {
    expect(toLowerCase('TEXTKIT')).toBe('textkit')
  })

  it('converts to title case', () => {
    expect(toTitleCase('the quick brown fox')).toBe('The Quick Brown Fox')
  })

  it('converts to sentence case', () => {
    expect(toSentenceCase('hello world. this is great!')).toBe('Hello world. This is great!')
  })

  it('capitalizes words', () => {
    expect(capitalizeWords('hello world from textkit')).toBe('Hello World From Textkit')
  })
})

describe('Line & Text Operations', () => {
  it('sorts lines alphabetically', () => {
    expect(sortLines('c\na\nb', 'a-z')).toBe('a\nb\nc')
    expect(sortLines('c\na\nb', 'z-a')).toBe('c\nb\na')
  })

  it('reverses text', () => {
    expect(reverseText('hello', 'chars')).toBe('olleh')
    expect(reverseText('hello world', 'words')).toBe('world hello')
  })

  it('adds prefix and suffix', () => {
    expect(addPrefixSuffix('item1\nitem2', '<tag>', '</tag>')).toBe('<tag>item1</tag>\n<tag>item2</tag>')
  })

  it('adds line numbers', () => {
    expect(addLineNumbers('a\nb', { startNumber: 1, separator: '. ' })).toBe('1. a\n2. b')
  })
})

describe('Counter & Stats', () => {
  it('calculates accurate word and char statistics', () => {
    const stats = calculateTextStats('The quick brown fox jumps over the lazy dog.')
    expect(stats.words).toBe(9)
    expect(stats.characters).toBe(44)
    expect(stats.sentences).toBe(1)
    expect(stats.readingTimeSeconds).toBeGreaterThan(0)
  })
})

describe('Developer Tools (JSON, Base64, URL)', () => {
  it('formats and minifies JSON', () => {
    const raw = '{"a":1,"b":[2,3]}'
    const formatted = formatJson(raw, 2)
    expect(formatted.result).toContain('\n  "a": 1')
    expect(formatted.error).toBeUndefined()

    const minified = minifyJson(formatted.result)
    expect(minified.result).toBe(raw)
  })

  it('validates JSON', () => {
    expect(validateJson('{"ok":true}').valid).toBe(true)
    expect(validateJson('{invalid}').valid).toBe(false)
  })

  it('encodes and decodes Base64 with UTF-8', () => {
    const original = 'Xin chào TextKit! 🚀'
    const encoded = encodeBase64(original)
    expect(encoded.result).toBeTruthy()
    const decoded = decodeBase64(encoded.result)
    expect(decoded.result).toBe(original)
  })

  it('encodes and decodes URLs', () => {
    const param = 'hello world & test=1'
    const enc = encodeUrl(param, 'component')
    expect(enc.result).toBe('hello%20world%20%26%20test%3D1')
    const dec = decodeUrl(enc.result)
    expect(dec.result).toBe(param)
  })
})

describe('Generators', () => {
  it('generates valid UUIDs', () => {
    const uuids = generateUUIDs({ count: 3 })
    expect(uuids.length).toBe(3)
    expect(uuids[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  })

  it('generates random numbers in range', () => {
    const res = generateRandomNumbers({ min: 10, max: 20, count: 5 })
    expect(res.numbers.length).toBe(5)
    res.numbers.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(10)
      expect(n).toBeLessThanOrEqual(20)
    })
  })
})
