import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { TOOLS, ToolDefinition } from '@/data/tools'

interface RelatedToolsProps {
  currentSlug: string
  relatedSlugs?: string[]
  category?: string
}

export function RelatedTools({ currentSlug, relatedSlugs = [], category }: RelatedToolsProps) {
  // Find related tools by defined slugs or fallback to same category
  let tools: ToolDefinition[] = []

  if (relatedSlugs.length > 0) {
    tools = relatedSlugs
      .map((slug) => TOOLS.find((t) => t.slug === slug))
      .filter((t): t is ToolDefinition => Boolean(t && t.slug !== currentSlug))
  }

  if (tools.length < 4 && category) {
    const categoryTools = TOOLS.filter((t) => t.category === category && t.slug !== currentSlug)
    for (const ct of categoryTools) {
      if (!tools.find((t) => t.slug === ct.slug)) {
        tools.push(ct)
      }
      if (tools.length >= 4) break
    }
  }

  if (tools.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Related Tools</span>
        </h2>
        <Link
          href="/tools"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <span>View all tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {tools.slice(0, 4).map((item) => (
          <Link
            key={item.slug}
            href={`/tools/${item.category}/${item.slug}`}
            className="group p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {item.category}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {item.shortDescription}
              </p>
            </div>
            <div className="mt-3 flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
              <span>Try tool</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
