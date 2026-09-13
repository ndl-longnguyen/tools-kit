import React from 'react'
import Link from 'next/link'
import { Wrench, ShieldCheck, Globe, ExternalLink, Mail } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { SIBLING_SITES, MAIN_SITE_URL, SITE_CONFIG } from '@/lib/config/site'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-sm">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Tools<span className="text-blue-600 dark:text-blue-400">Kit</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Free online tools for text, code, and data. Fast, privacy-first, client-side browser utilities.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Processing</span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Part of the <span className="font-semibold text-slate-700 dark:text-slate-300">NDL Network</span>.
            </p>
          </div>

          {/* Col 2: Categories & Popular Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Categories &amp; Tools
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/tools/${cat.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <Link href="/tools/developer/json-formatter" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tools/counter/word-counter" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="/tools/generators/uuid-generator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  UUID Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: NDL Network Ecosystem */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>NDL Network Ecosystem</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href={SIBLING_SITES.laisuat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors group"
                >
                  <span>🏦 Lãi Suất Ngân Hàng Việt Nam</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={SIBLING_SITES.tygia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-amber-500 transition-colors group"
                >
                  <span>📊 Tỷ Giá &amp; Giá Vàng Hub</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={SIBLING_SITES.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors group"
                >
                  <span>🔗 ShortLink – Rút Gọn Link &amp; QR</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={SIBLING_SITES.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-sky-500 transition-colors group"
                >
                  <span>🖼️ Image Tools – Nén Ảnh Riêng Tư</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={SIBLING_SITES.games}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-violet-500 transition-colors group"
                >
                  <span>🧠 Daily Games – Brain Puzzles</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={SIBLING_SITES.click}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-rose-500 transition-colors group"
                >
                  <span>🪙 Click 2 Top – Đua Top Bấm Xu</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={SIBLING_SITES.arcade}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-purple-500 transition-colors group"
                >
                  <span>🎮 NDL Arcade – Trò Chơi Trực Tuyến</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Creator Profile & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Creator Profile &amp; Legal
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href={MAIN_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  <span>NDL Studio Portfolio</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.links.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors group"
                >
                  <span>✍️ Engineering Blog</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 1 0 0-3.26 1.63 1.63 0 0 0 0 3.26m1.39 9.74v-8.37H5.07v8.37z" />
                  </svg>
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Contact Creator</span>
                </a>
              </li>
              <li className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About ToolsKit
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar: Copyright & Attribution */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} ToolsKit. All rights reserved.</p>
          <p className="whitespace-nowrap">
            Part of the NDL network. Designed &amp; built by{' '}
            <a
              href={MAIN_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors"
            >
              Nguyen Dai Long (NDL)
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
