'use client'

import React, { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Star, ShieldCheck, ChevronRight } from 'lucide-react'
import { ToolDefinition } from '@/data/tools'
import { CATEGORIES } from '@/data/categories'
import { getFavorites, subscribeFavorites, toggleFavorite } from '@/lib/storage/userPreferences'

interface ToolHeaderProps {
  tool: ToolDefinition
}

export function ToolHeader({ tool }: ToolHeaderProps) {
  const favorites = useSyncExternalStore(subscribeFavorites, getFavorites, () => [])
  const favorite = favorites.includes(tool.slug)
  const category = CATEGORIES.find((c) => c.slug === tool.category)

  const handleToggleFav = () => {
    toggleFavorite(tool.slug)
  }

  return (
    <div className="mb-6">
      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/tools" className="hover:text-blue-600 dark:hover:text-blue-400">
          Tools
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          href={`/tools/${tool.category}`}
          className="capitalize hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        >
          {category?.shortName || tool.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-slate-200 font-medium truncate">{tool.name}</span>
      </nav>

      {/* Header main row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                tool.category === 'text'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : tool.category === 'developer'
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                  : tool.category === 'counter'
                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
              }`}
            >
              {category?.name || tool.category}
            </span>

            <div className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/50">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>In-Browser Privacy</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {tool.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            {tool.description}
          </p>
        </div>

        {/* Favorite toggle button */}
        <button
          onClick={handleToggleFav}
          className={`self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            favorite
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
          }`}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star className={`w-4 h-4 ${favorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
          <span>{favorite ? 'Favorited' : 'Favorite'}</span>
        </button>
      </div>
    </div>
  )
}
