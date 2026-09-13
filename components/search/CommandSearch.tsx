'use client'

import React, { useState, useEffect, useRef, useSyncExternalStore, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, X, Star, ArrowRight, CornerDownLeft } from 'lucide-react'
import { TOOLS, ToolDefinition, searchTools } from '@/data/tools'
import {
  getRecentlyUsed,
  subscribeRecents,
  getFavorites,
  subscribeFavorites,
  getServerSnapshot,
} from '@/lib/storage/userPreferences'

interface CommandSearchProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandSearch({ isOpen, onClose }: CommandSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const recentSlugs = useSyncExternalStore(subscribeRecents, getRecentlyUsed, getServerSnapshot)
  const favSlugs = useSyncExternalStore(subscribeFavorites, getFavorites, getServerSnapshot)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Results calculation
  const results: ToolDefinition[] = useMemo(() => {
    if (!query.trim()) {
      if (recentSlugs.length > 0) {
        return recentSlugs
          .map((slug) => TOOLS.find((t) => t.slug === slug))
          .filter(Boolean) as ToolDefinition[]
      }
      return TOOLS.slice(0, 8)
    }
    return searchTools(query).slice(0, 10)
  }, [query, recentSlugs])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : results.length - 1))
      } else if (e.key === 'Enter') {
        if (results[selectedIndex]) {
          e.preventDefault()
          const target = results[selectedIndex]
          onClose()
          router.push(`/tools/${target.category}/${target.slug}`)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, router, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search all 37+ tools (e.g. JSON, Word Count, Base64)..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 ml-2">
            ESC
          </span>
        </div>

        {/* Results listing */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100/50 dark:divide-slate-800/50">
          <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>
              {query ? `Results (${results.length})` : recentSlugs.length > 0 ? 'Recently Used' : 'Popular Tools'}
            </span>
            {results.length > 0 && (
              <span className="text-[11px] font-normal normal-case flex items-center gap-1 text-slate-400">
                <CornerDownLeft className="w-3 h-3" /> to select
              </span>
            )}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-medium">No tools found for &quot;{query}&quot;</p>
              <p className="text-xs mt-1 text-slate-500">Try searching for &quot;text&quot;, &quot;json&quot;, &quot;counter&quot;, or &quot;uuid&quot;.</p>
            </div>
          ) : (
            results.map((tool, idx) => {
              const isSelected = idx === selectedIndex
              const isFav = favSlugs.includes(tool.slug)

              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.category}/${tool.slug}`}
                  onClick={onClose}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wide flex-shrink-0 ${
                        tool.category === 'text'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : tool.category === 'developer'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                          : tool.category === 'counter'
                          ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}
                    >
                      {tool.category}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm truncate">{tool.name}</span>
                        {isFav && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform ${
                      isSelected ? 'text-blue-600 dark:text-blue-400 translate-x-0.5' : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </Link>
              )
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Use ↑ ↓ to navigate</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  )
}
