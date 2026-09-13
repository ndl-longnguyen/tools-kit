'use client'

import React, { useState, useSyncExternalStore, useMemo } from 'react'
import Link from 'next/link'
import { TOOLS, ToolDefinition, getPopularTools } from '@/data/tools'
import { CATEGORIES } from '@/data/categories'
import { AdBanner } from '@/components/ads/AdBanner'
import { CommandSearch } from '@/components/search/CommandSearch'
import {
  getFavorites,
  subscribeFavorites,
  getRecentlyUsed,
  subscribeRecents,
} from '@/lib/storage/userPreferences'
import {
  Search,
  Star,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Type,
  BarChart3,
  Code2,
} from 'lucide-react'

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isMac = typeof navigator !== 'undefined' ? navigator.platform.toUpperCase().indexOf('MAC') >= 0 : true
  const favSlugs = useSyncExternalStore(subscribeFavorites, getFavorites, () => [])
  const recentSlugs = useSyncExternalStore(subscribeRecents, getRecentlyUsed, () => [])

  const favorites = useMemo(() => {
    return favSlugs
      .map((slug) => TOOLS.find((t) => t.slug === slug))
      .filter(Boolean) as ToolDefinition[]
  }, [favSlugs])

  const recents = useMemo(() => {
    return recentSlugs
      .map((slug) => TOOLS.find((t) => t.slug === slug))
      .filter(Boolean) as ToolDefinition[]
  }, [recentSlugs])

  const popularTools = getPopularTools()

  const categoryIcons: Record<string, React.ReactNode> = {
    text: <Type className="w-5 h-5 text-emerald-500" />,
    counter: <BarChart3 className="w-5 h-5 text-sky-500" />,
    developer: <Code2 className="w-5 h-5 text-purple-500" />,
    generators: <Sparkles className="w-5 h-5 text-amber-500" />,
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Client-Side · Private & Free</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Free Online Tools for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Text, Code & Data
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Fast, simple and privacy-friendly utilities that work directly in your browser. No signup required.
          </p>

          {/* Hero Search Box */}
          <div className="max-w-xl mx-auto mt-8">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:border-blue-400 dark:hover:border-blue-600 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-slate-400 dark:text-slate-400">
                <Search className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                <span className="text-sm font-normal">Search across {TOOLS.length} tools (e.g. JSON, Word Count, Base64)...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {isMac ? '⌘K' : 'Ctrl+K'}
              </kbd>
            </button>
          </div>

          {/* Quick pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-400">Popular:</span>
            <Link href="/tools/developer/json-formatter" className="hover:text-blue-600 dark:hover:text-blue-400 underline">JSON Formatter</Link>
            <span>·</span>
            <Link href="/tools/counter/word-counter" className="hover:text-blue-600 dark:hover:text-blue-400 underline">Word Counter</Link>
            <span>·</span>
            <Link href="/tools/text/remove-line-breaks" className="hover:text-blue-600 dark:hover:text-blue-400 underline">Remove Line Breaks</Link>
            <span>·</span>
            <Link href="/tools/developer/base64-encoder" className="hover:text-blue-600 dark:hover:text-blue-400 underline">Base64</Link>
            <span>·</span>
            <Link href="/tools/generators/uuid-generator" className="hover:text-blue-600 dark:hover:text-blue-400 underline">UUID v4</Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        <AdBanner slot="top" />

        {/* Favorites Section (if user has marked any) */}
        {favorites.length > 0 && (
          <section id="favorites" aria-labelledby="favorites-heading" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 id="favorites-heading" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <span>Your Favorites ({favorites.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {favorites.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Used Section (if user has opened any tools) */}
        {recents.length > 0 && (
          <section aria-labelledby="recents-heading" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 id="recents-heading" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Recently Used</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recents.slice(0, 4).map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Popular Tools Section */}
        <section aria-labelledby="popular-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="popular-heading" className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>Popular Tools</span>
            </h2>
            <Link href="/tools" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              <span>View all {TOOLS.length} tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        <AdBanner slot="in-content" />

        {/* Category Sections */}
        {CATEGORIES.map((cat) => {
          const catTools = TOOLS.filter((t) => t.category === cat.slug)
          return (
            <section key={cat.slug} className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {categoryIcons[cat.slug]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/tools/${cat.slug}`}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Explore {cat.shortName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catTools.slice(0, 6).map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          )
        })}

        <AdBanner slot="bottom" />
      </main>

      <CommandSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}

function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={`/tools/${tool.category}/${tool.slug}`}
      className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/80 dark:hover:border-blue-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {tool.category}
          </span>
          {tool.popular && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Popular
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
        <span>Open Tool</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
