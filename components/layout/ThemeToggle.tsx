'use client'

import React, { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)

  if (!mounted) {
    return <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      title={`Current theme: ${theme}. Click to switch.`}
      aria-label="Toggle color theme"
    >
      {theme === 'light' && <Sun className="w-5 h-5 text-amber-500" />}
      {theme === 'dark' && <Moon className="w-5 h-5 text-blue-400" />}
      {theme === 'system' && <Monitor className="w-5 h-5 text-slate-500" />}
    </button>
  )
}
