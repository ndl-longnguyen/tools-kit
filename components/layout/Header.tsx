'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Wrench,
  Search,
  Star,
  Menu,
  X,
  Sparkles,
  Code2,
  Type,
  BarChart3,
  Globe,
  ChevronDown,
  ExternalLink,
} from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { CommandSearch } from '../search/CommandSearch'
import { CATEGORIES } from '@/data/categories'
import { SIBLING_SITES, MAIN_SITE_URL } from '@/lib/config/site'

const ECOSYSTEM_LINKS = [
  { name: 'Lãi Suất Ngân Hàng', icon: '🏦', url: SIBLING_SITES.laisuat, desc: 'So sánh lãi suất tiết kiệm' },
  { name: 'Tỷ Giá & Giá Vàng Hub', icon: '📊', url: SIBLING_SITES.tygia, desc: 'Cập nhật tỷ giá ngoại tệ & vàng' },
  { name: 'ShortLink & QR', icon: '🔗', url: SIBLING_SITES.link, desc: 'Rút gọn link & tạo mã QR' },
  { name: 'Image Tools', icon: '🖼️', url: SIBLING_SITES.image, desc: 'Nén ảnh riêng tư trong trình duyệt' },
  { name: 'Daily Games', icon: '🧠', url: SIBLING_SITES.games, desc: 'Game trí tuệ hàng ngày (Emoji, Sudoku, Tetris)' },
  { name: 'Click 2 Top', icon: '🪙', url: SIBLING_SITES.click, desc: 'Đua top bấm xu arcade' },
  { name: 'NDL Arcade', icon: '🎮', url: SIBLING_SITES.arcade, desc: 'Kho trò chơi giải trí online' },
  { name: 'NDL Studio Portfolio', icon: '🌐', url: MAIN_SITE_URL, desc: 'Trang chủ tác giả Nguyễn Đại Long' },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEcosystemOpen, setIsEcosystemOpen] = useState(false)
  const ecosystemRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isMac = typeof navigator !== 'undefined' ? navigator.platform.toUpperCase().indexOf('MAC') >= 0 : true

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close ecosystem dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ecosystemRef.current && !ecosystemRef.current.contains(event.target as Node)) {
        setIsEcosystemOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const categoryIcons: Record<string, React.ReactNode> = {
    text: <Type className="w-4 h-4 text-emerald-500" />,
    counter: <BarChart3 className="w-4 h-4 text-sky-500" />,
    developer: <Code2 className="w-4 h-4 text-purple-500" />,
    generators: <Sparkles className="w-4 h-4 text-amber-500" />,
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              Tools<span className="text-blue-600 dark:text-blue-400">Kit</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link
              href="/tools"
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 ${
                pathname === '/tools' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30' : ''
              }`}
            >
              All Tools
            </Link>

            {/* Category Direct Links */}
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/tools/${cat.slug}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  pathname.startsWith(`/tools/${cat.slug}`)
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30'
                    : ''
                }`}
              >
                {categoryIcons[cat.slug]}
                <span>{cat.shortName}</span>
              </Link>
            ))}

            <Link
              href="/#favorites"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-400/30" />
              <span>Favorites</span>
            </Link>

            {/* NDL Ecosystem Dropdown */}
            <div className="relative" ref={ecosystemRef}>
              <button
                type="button"
                onClick={() => setIsEcosystemOpen(!isEcosystemOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer ${
                  isEcosystemOpen ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30' : ''
                }`}
                aria-expanded={isEcosystemOpen}
                aria-haspopup="true"
              >
                <Globe className="w-4 h-4 text-amber-500" />
                <span>NDL Network</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${isEcosystemOpen ? 'rotate-180' : ''}`} />
              </button>

              {isEcosystemOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    Hệ sinh thái NDL Ecosystem
                  </div>
                  <div className="max-h-80 overflow-y-auto space-y-0.5">
                    {ECOSYSTEM_LINKS.map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsEcosystemOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors group"
                      >
                        <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            <span className="truncate">{item.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 shrink-0 ml-1" />
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{item.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right actions: Search Button & Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 px-3 py-1.5 text-sm text-slate-400 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer shadow-xs"
              aria-label="Search tools"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline text-xs font-normal">Search tools...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-2xs">
                {isMac ? '⌘K' : 'Ctrl+K'}
              </kbd>
            </button>

            <ThemeToggle />

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Link
              href="/tools"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              All Tools (37+)
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/tools/${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {categoryIcons[cat.slug]}
                <span>{cat.name}</span>
              </Link>
            ))}

            {/* Mobile NDL Ecosystem Section */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="px-3 py-1 text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>NDL Network Ecosystem</span>
              </div>
              <div className="grid grid-cols-1 gap-1 mt-1">
                {ECOSYSTEM_LINKS.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                About ToolsKit
              </Link>
              <Link
                href="/privacy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
