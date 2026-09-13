'use client'

import React, { useState } from 'react'
import { Copy, Check, Download, Trash2, Sparkles, ArrowDownUp } from 'lucide-react'

interface ToolActionsProps {
  onProcess?: () => void
  processLabel?: string
  outputValue: string
  onClear: () => void
  onLoadExample?: () => void
  onSwap?: () => void
  downloadFilename?: string
  isOutputEmpty?: boolean
}

export function ToolActions({
  onProcess,
  processLabel,
  outputValue,
  onClear,
  onLoadExample,
  onSwap,
  downloadFilename = 'textkit-output.txt',
  isOutputEmpty = false,
}: ToolActionsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!outputValue) return
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(outputValue)
      } else {
        // Fallback for older/restricted browsers
        const textarea = document.createElement('textarea')
        textarea.value = outputValue
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback attempt
      alert('Unable to copy automatically. Please select text manually.')
    }
  }

  const handleDownload = () => {
    if (!outputValue) return
    const blob = new Blob([outputValue], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = downloadFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 py-3 border-y border-slate-200 dark:border-slate-800 my-2">
      {/* Left controls: Process & Example */}
      <div className="flex flex-wrap items-center gap-2">
        {onProcess && processLabel && (
          <button
            onClick={onProcess}
            type="button"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-blue-500/25 active:scale-98 cursor-pointer"
          >
            {processLabel}
          </button>
        )}

        {onLoadExample && (
          <button
            onClick={onLoadExample}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Load Example</span>
          </button>
        )}

        {onSwap && (
          <button
            onClick={onSwap}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            title="Swap input and output"
          >
            <ArrowDownUp className="w-3.5 h-3.5 text-blue-500" />
            <span>Swap</span>
          </button>
        )}

        <button
          onClick={onClear}
          type="button"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-300 dark:hover:border-rose-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-medium transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Right controls: Copy & Download */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          disabled={isOutputEmpty}
          type="button"
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white'
              : isOutputEmpty
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-transparent'
              : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white shadow-xs'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Result'}</span>
        </button>

        <button
          onClick={handleDownload}
          disabled={isOutputEmpty}
          type="button"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
            isOutputEmpty
              ? 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed'
              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
          title="Download output file"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Download</span>
        </button>
      </div>
    </div>
  )
}
