import React from 'react'
import Link from 'next/link'
import { FileQuestion, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
        Page Not Found
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">
        The tool or page you are looking for might have been moved or does not exist.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/tools"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Browse All Tools</span>
        </Link>
      </div>
    </div>
  )
}
