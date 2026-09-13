'use client'

import React from 'react'

interface ToolStatsProps {
  text: string
}

export function ToolStats({ text }: ToolStatsProps) {
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const wordsMatch = text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)
  const words = wordsMatch ? wordsMatch.length : 0
  const lines = text ? text.split(/\r?\n/).length : 0

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 py-2 px-1">
      <div className="flex items-center gap-1">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{words.toLocaleString()}</span>
        <span>words</span>
      </div>
      <span className="text-slate-300 dark:text-slate-700">·</span>
      <div className="flex items-center gap-1">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{characters.toLocaleString()}</span>
        <span>characters</span>
      </div>
      <span className="text-slate-300 dark:text-slate-700">·</span>
      <div className="flex items-center gap-1">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{charactersNoSpaces.toLocaleString()}</span>
        <span>without spaces</span>
      </div>
      <span className="text-slate-300 dark:text-slate-700">·</span>
      <div className="flex items-center gap-1">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{lines.toLocaleString()}</span>
        <span>lines</span>
      </div>
    </div>
  )
}
