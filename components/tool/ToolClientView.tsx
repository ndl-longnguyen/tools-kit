'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { ToolDefinition } from '@/data/tools'
import { ToolStats } from './ToolStats'
import { ToolActions } from './ToolActions'
import { addRecentlyUsed } from '@/lib/storage/userPreferences'
import {
  removeLineBreaks,
  removeEmptyLines,
  removeDuplicateLines,
  removeExtraSpaces,
  removeNumbers,
  removePunctuation,
  removeSpecialCharacters,
  trimLines,
  normalizeWhitespace,
  normalizeLineBreaks,
} from '@/lib/tools/text/cleaners'
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  capitalizeWords,
} from '@/lib/tools/text/cases'
import {
  sortLines,
  reverseText,
  addPrefixSuffix,
  addLineNumbers,
  SortMode,
  ReverseMode,
} from '@/lib/tools/text/operations'
import { calculateTextStats } from '@/lib/tools/counter/stats'
import { formatJson, minifyJson, validateJson, JsonValidationResult } from '@/lib/tools/developer/json'
import { encodeBase64, decodeBase64, encodeUrl, decodeUrl } from '@/lib/tools/developer/encoding'
import {
  generateUUIDs,
  generateRandomStrings,
  generateRandomNumbers,
  pickRandomChoice,
} from '@/lib/tools/generators/generators'
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'

interface ToolClientViewProps {
  tool: ToolDefinition
}

export function ToolClientView({ tool }: ToolClientViewProps) {
  const [input, setInput] = useState('')
  const [manualOutput, setManualOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Options state
  const [lineBreakOption, setLineBreakOption] = useState<'space' | 'none' | 'comma'>('space')
  const [sortOption, setSortOption] = useState<SortMode>('a-z')
  const [reverseOption, setReverseOption] = useState<ReverseMode>('chars')
  const [prefixValue, setPrefixValue] = useState('')
  const [suffixValue, setSuffixValue] = useState('')
  const [jsonIndent, setJsonIndent] = useState<2 | 4 | 'tab'>(2)
  const [jsonValidation, setJsonValidation] = useState<JsonValidationResult | null>(null)

  // Generator states
  const [genCount, setGenCount] = useState(5)
  const [genLength, setGenLength] = useState(16)
  const [genMin, setGenMin] = useState(1)
  const [genMax, setGenMax] = useState(100)
  const [genUnique, setGenUnique] = useState(true)
  const [genUppercase, setGenUppercase] = useState(true)
  const [genLowercase, setGenLowercase] = useState(true)
  const [genNumbers, setGenNumbers] = useState(true)
  const [genSymbols, setGenSymbols] = useState(false)
  const [genHyphens, setGenHyphens] = useState(true)

  // Register in recently used on visit
  useEffect(() => {
    addRecentlyUsed(tool.slug)
  }, [tool.slug])

  // Derive stats directly with useMemo (zero cascading renders)
  const stats = useMemo(() => {
    return calculateTextStats(input)
  }, [input])

  // Generator initial or on-demand value calculation
  const runGenerator = useCallback(() => {
    setError(null)
    switch (tool.slug) {
      case 'uuid-generator': {
        const uuids = generateUUIDs({ count: genCount, uppercase: genUppercase, hyphens: genHyphens })
        setManualOutput(uuids.join('\n'))
        break
      }
      case 'random-string': {
        const strings = generateRandomStrings({
          length: genLength,
          uppercase: genUppercase,
          lowercase: genLowercase,
          numbers: genNumbers,
          symbols: genSymbols,
          count: genCount,
        })
        setManualOutput(strings.join('\n'))
        break
      }
      case 'random-number': {
        const res = generateRandomNumbers({
          min: genMin,
          max: genMax,
          count: genCount,
          unique: genUnique,
        })
        if (res.error) {
          setError(res.error)
          setManualOutput('')
        } else {
          setManualOutput(res.numbers.join(', '))
        }
        break
      }
      case 'random-choice': {
        const choiceRes = pickRandomChoice(input, { count: genCount, allowDuplicates: !genUnique })
        if (choiceRes.error) {
          setError(choiceRes.error)
          setManualOutput('')
        } else {
          setManualOutput(choiceRes.choices.join('\n'))
        }
        break
      }
      default:
        break
    }
  }, [tool.slug, genCount, genUppercase, genHyphens, genLength, genLowercase, genNumbers, genSymbols, genMin, genMax, genUnique, input])

  // Auto-calculated transformation for real-time text tools
  const autoTransformedText = useMemo(() => {
    if (!input) return ''

    switch (tool.slug) {
      case 'remove-line-breaks':
        return removeLineBreaks(input, { replaceWith: lineBreakOption })
      case 'remove-empty-lines':
        return removeEmptyLines(input)
      case 'remove-duplicate-lines':
        return removeDuplicateLines(input).result
      case 'remove-extra-spaces':
        return removeExtraSpaces(input)
      case 'remove-numbers':
        return removeNumbers(input)
      case 'remove-punctuation':
        return removePunctuation(input)
      case 'remove-special-characters':
        return removeSpecialCharacters(input)
      case 'trim-lines':
        return trimLines(input)
      case 'normalize-whitespace':
        return normalizeWhitespace(input)
      case 'normalize-line-breaks':
        return normalizeLineBreaks(input, 'lf')
      case 'uppercase':
        return toUpperCase(input)
      case 'lowercase':
        return toLowerCase(input)
      case 'title-case':
        return toTitleCase(input)
      case 'sentence-case':
        return toSentenceCase(input)
      case 'capitalize-words':
        return capitalizeWords(input)
      case 'sort-lines':
        return sortLines(input, sortOption)
      case 'reverse-text':
        return reverseText(input, reverseOption)
      case 'add-prefix-suffix':
        return addPrefixSuffix(input, prefixValue, suffixValue)
      case 'add-line-numbers':
        return addLineNumbers(input)
      case 'url-encoder':
        return encodeUrl(input, 'component').result
      default:
        return null
    }
  }, [tool.slug, input, lineBreakOption, sortOption, reverseOption, prefixValue, suffixValue])

  // Explicit action process (e.g. JSON format, Base64, etc.)
  const handleExplicitProcess = () => {
    setError(null)
    setSuccessMessage(null)

    switch (tool.slug) {
      case 'remove-duplicate-lines': {
        const res = removeDuplicateLines(input)
        setManualOutput(res.result)
        setSuccessMessage(`Removed ${res.removedCount} duplicate lines.`)
        break
      }
      case 'json-formatter': {
        const formatted = formatJson(input, jsonIndent)
        if (formatted.error) {
          setError(formatted.error)
          setManualOutput(input)
        } else {
          setManualOutput(formatted.result)
        }
        break
      }
      case 'json-validator': {
        const val = validateJson(input)
        setJsonValidation(val)
        if (!val.valid) setError(val.message)
        else setSuccessMessage(val.message)
        break
      }
      case 'json-minifier': {
        const min = minifyJson(input)
        if (min.error) setError(min.error)
        else setManualOutput(min.result)
        break
      }
      case 'base64-encoder': {
        const b64 = encodeBase64(input)
        if (b64.error) setError(b64.error)
        else setManualOutput(b64.result)
        break
      }
      case 'base64-decoder': {
        const dec = decodeBase64(input)
        if (dec.error) setError(dec.error)
        else setManualOutput(dec.result)
        break
      }
      case 'url-decoder': {
        const dec = decodeUrl(input)
        if (dec.error) setError(dec.error)
        else setManualOutput(dec.result)
        break
      }
      default:
        if (tool.category === 'generators') {
          runGenerator()
        }
        break
    }
  }

  // Active output
  const activeOutput = manualOutput !== null ? manualOutput : autoTransformedText ?? ''

  const handleInputChange = (val: string) => {
    setInput(val)
    setManualOutput(null)
    setError(null)
    setSuccessMessage(null)
    setJsonValidation(null)
  }

  const handleLoadExample = () => {
    if (tool.examples?.input) {
      handleInputChange(tool.examples.input)
    }
  }

  const handleClear = () => {
    setInput('')
    setManualOutput('')
    setError(null)
    setSuccessMessage(null)
    setJsonValidation(null)
  }

  const handleSwap = () => {
    const temp = input
    setInput(activeOutput)
    setManualOutput(temp)
  }

  const isGenerator = tool.category === 'generators'
  const isCounter = tool.category === 'counter'

  return (
    <div className="space-y-4">
      {/* Options Row (Tool-specific controls) */}
      <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
        {tool.slug === 'remove-line-breaks' && (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Replace with:</span>
            <select
              value={lineBreakOption}
              onChange={(e) => {
                setLineBreakOption(e.target.value as 'space' | 'none' | 'comma')
                setManualOutput(null)
              }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200"
            >
              <option value="space">Single Space</option>
              <option value="none">No Space (Join)</option>
              <option value="comma">Comma and Space</option>
            </select>
          </div>
        )}

        {tool.slug === 'sort-lines' && (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Sort Order:</span>
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value as SortMode)
                setManualOutput(null)
              }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200"
            >
              <option value="a-z">Alphabetical (A → Z)</option>
              <option value="z-a">Alphabetical (Z → A)</option>
              <option value="length-asc">Shortest to Longest</option>
              <option value="length-desc">Longest to Shortest</option>
              <option value="reverse">Reverse Line Order</option>
              <option value="shuffle">Shuffle Randomly</option>
            </select>
          </div>
        )}

        {tool.slug === 'reverse-text' && (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Reverse Mode:</span>
            <select
              value={reverseOption}
              onChange={(e) => {
                setReverseOption(e.target.value as ReverseMode)
                setManualOutput(null)
              }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200"
            >
              <option value="chars">Entire String (Characters)</option>
              <option value="words">Words within Lines</option>
              <option value="lines">Lines Order</option>
            </select>
          </div>
        )}

        {tool.slug === 'add-prefix-suffix' && (
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Prefix:</span>
              <input
                type="text"
                value={prefixValue}
                onChange={(e) => {
                  setPrefixValue(e.target.value)
                  setManualOutput(null)
                }}
                placeholder="e.g. <li>"
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs w-28"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Suffix:</span>
              <input
                type="text"
                value={suffixValue}
                onChange={(e) => {
                  setSuffixValue(e.target.value)
                  setManualOutput(null)
                }}
                placeholder="e.g. </li>"
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs w-28"
              />
            </div>
          </div>
        )}

        {tool.slug === 'json-formatter' && (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Indentation:</span>
            <select
              value={jsonIndent}
              onChange={(e) => {
                setJsonIndent(e.target.value === 'tab' ? 'tab' : (Number(e.target.value) as 2 | 4))
                setManualOutput(null)
              }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value="tab">Tabs</option>
            </select>
          </div>
        )}

        {/* Generator Controls */}
        {isGenerator && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Quantity:</span>
              <input
                type="number"
                min={1}
                max={100}
                value={genCount}
                onChange={(e) => setGenCount(Math.max(1, Math.min(100, Number(e.target.value))))}
                className="w-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-center"
              />
            </div>

            {tool.slug === 'random-string' && (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Length:</span>
                  <input
                    type="number"
                    min={4}
                    max={128}
                    value={genLength}
                    onChange={(e) => setGenLength(Math.max(4, Math.min(128, Number(e.target.value))))}
                    className="w-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-center"
                  />
                </div>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genUppercase}
                    onChange={(e) => setGenUppercase(e.target.checked)}
                    className="rounded"
                  />
                  <span>A-Z</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genLowercase}
                    onChange={(e) => setGenLowercase(e.target.checked)}
                    className="rounded"
                  />
                  <span>a-z</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genNumbers}
                    onChange={(e) => setGenNumbers(e.target.checked)}
                    className="rounded"
                  />
                  <span>0-9</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genSymbols}
                    onChange={(e) => setGenSymbols(e.target.checked)}
                    className="rounded"
                  />
                  <span>Symbols</span>
                </label>
              </>
            )}

            {tool.slug === 'random-number' && (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Min:</span>
                  <input
                    type="number"
                    value={genMin}
                    onChange={(e) => setGenMin(Number(e.target.value))}
                    className="w-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-center"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Max:</span>
                  <input
                    type="number"
                    value={genMax}
                    onChange={(e) => setGenMax(Number(e.target.value))}
                    className="w-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-center"
                  />
                </div>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genUnique}
                    onChange={(e) => setGenUnique(e.target.checked)}
                    className="rounded"
                  />
                  <span>Unique (no repeats)</span>
                </label>
              </>
            )}

            {tool.slug === 'uuid-generator' && (
              <>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genHyphens}
                    onChange={(e) => setGenHyphens(e.target.checked)}
                    className="rounded"
                  />
                  <span>Hyphens</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genUppercase}
                    onChange={(e) => setGenUppercase(e.target.checked)}
                    className="rounded"
                  />
                  <span>UPPERCASE</span>
                </label>
              </>
            )}

            <button
              onClick={runGenerator}
              type="button"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Error / Success Notifications */}
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{error}</p>
            {jsonValidation?.error?.snippet && (
              <pre className="mt-1 p-2 rounded bg-rose-100/50 dark:bg-rose-900/50 font-code text-[11px] overflow-x-auto">
                {jsonValidation.error.snippet}
              </pre>
            )}
          </div>
        </div>
      )}

      {successMessage && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <p className="font-semibold">{successMessage}</p>
        </div>
      )}

      {/* Editor Layout: Dual Pane (Input & Output) or Single Pane (for Counter/Generator) */}
      {isCounter ? (
        /* COUNTER TOOLS VIEW */
        <div className="space-y-6">
          <div className="relative">
            <label htmlFor="counter-input" className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Paste or Type your text below
            </label>
            <textarea
              id="counter-input"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Start typing or paste your content here to view live word count, character statistics, and reading speed..."
              rows={9}
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-y leading-relaxed"
            />
            <ToolStats text={input} />
          </div>

          <ToolActions
            onClear={handleClear}
            onLoadExample={handleLoadExample}
            outputValue={input}
            isOutputEmpty={!input}
          />

          {/* Detailed Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Words</span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                {stats.words.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Characters</span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                {stats.characters.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sentences</span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                {stats.sentences.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Reading Time</span>
              <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">
                {stats.readingTimeMinutes > 0 ? `${stats.readingTimeMinutes}m ` : ''}
                {stats.readingTimeSeconds}s
              </p>
            </div>
          </div>

          {/* Secondary stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-slate-400 block mb-1">Speaking Time (130 WPM)</span>
              <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                {stats.speakingTimeMinutes} min {stats.speakingTimeSeconds} sec
              </span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-slate-400 block mb-1">Paragraphs / Lines</span>
              <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                {stats.paragraphs} paragraphs · {stats.lines} lines
              </span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-slate-400 block mb-1">Readability Level</span>
              <span className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                {stats.readingLevel} (Score: {stats.readingEaseScore}/100)
              </span>
            </div>
          </div>

          {/* Top Words Frequency */}
          {stats.topWords.length > 0 && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Top Word Density & Frequency
              </h3>
              <div className="flex flex-wrap gap-2">
                {stats.topWords.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <span className="font-bold">{item.word}</span>
                    <span className="text-slate-400">×{item.count}</span>
                    <span className="text-blue-600 dark:text-blue-400 text-[10px]">({item.percentage}%)</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : isGenerator ? (
        /* GENERATORS VIEW */
        <div className="space-y-4">
          {tool.slug === 'random-choice' && (
            <div>
              <label htmlFor="choice-input" className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                Options to choose from (One option per line)
              </label>
              <textarea
                id="choice-input"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Option 1&#10;Option 2&#10;Option 3&#10;Option 4"
                rows={5}
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="gen-output" className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Generated Result
              </label>
              <span className="text-xs text-slate-400">
                {activeOutput ? `${activeOutput.split(/\r?\n/).length} items generated` : ''}
              </span>
            </div>
            <textarea
              id="gen-output"
              value={activeOutput}
              readOnly
              rows={8}
              placeholder="Click 'Generate Now' to create output..."
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 font-code text-sm text-slate-900 dark:text-slate-100 focus:outline-none resize-y"
            />
          </div>

          <ToolActions
            onProcess={runGenerator}
            processLabel="Generate"
            onClear={handleClear}
            onLoadExample={handleLoadExample}
            outputValue={activeOutput}
            isOutputEmpty={!activeOutput}
            downloadFilename={`${tool.slug}.txt`}
          />
        </div>
      ) : (
        /* STANDARD DUAL PANE (TEXT & DEVELOPER TOOLS) */
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input pane */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="tool-input" className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                  Input
                </label>
                {input && (
                  <button
                    onClick={() => handleInputChange('')}
                    className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                  >
                    Clear Input
                  </button>
                )}
              </div>
              <textarea
                id="tool-input"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Paste or type your input here..."
                rows={11}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 text-sm font-code focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-y flex-1"
              />
              <ToolStats text={input} />
            </div>

            {/* Output pane */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="tool-output" className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                  Output
                </label>
                <span className="text-[11px] text-slate-400">
                  {activeOutput.length > 0 ? `${activeOutput.length} characters` : 'Ready'}
                </span>
              </div>
              <textarea
                id="tool-output"
                value={activeOutput}
                readOnly
                placeholder="Transformed output will appear here..."
                rows={11}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 text-sm font-code focus:outline-none resize-y flex-1"
              />
              <ToolStats text={activeOutput} />
            </div>
          </div>

          <ToolActions
            onProcess={
              tool.category === 'developer' || tool.slug === 'remove-duplicate-lines'
                ? handleExplicitProcess
                : undefined
            }
            processLabel={
              tool.slug === 'json-validator'
                ? 'Validate JSON'
                : tool.slug === 'json-formatter'
                ? 'Format JSON'
                : tool.slug === 'json-minifier'
                ? 'Minify JSON'
                : tool.slug === 'base64-encoder'
                ? 'Encode Base64'
                : tool.slug === 'base64-decoder'
                ? 'Decode Base64'
                : tool.slug === 'url-decoder'
                ? 'Decode URL'
                : 'Process'
            }
            onClear={handleClear}
            onLoadExample={handleLoadExample}
            onSwap={handleSwap}
            outputValue={activeOutput}
            isOutputEmpty={!activeOutput}
            downloadFilename={`${tool.slug}-result.txt`}
          />
        </div>
      )}
    </div>
  )
}
