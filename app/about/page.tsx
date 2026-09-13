import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Wrench, Shield, Zap, HeartHandshake, Globe, ExternalLink } from 'lucide-react'
import { SITE_CONFIG, MAIN_SITE_URL, SIBLING_SITES } from '@/lib/config/site'

export const metadata: Metadata = {
  title: `About Us | ${SITE_CONFIG.name} — NDL Network`,
  description:
    'Learn about ToolsKit, the free, privacy-first online utility platform built for writers, developers, and data specialists worldwide. Part of the NDL Network Ecosystem.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-800 dark:text-slate-200">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-sm">
          <Wrench className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            About ToolsKit
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Free Online Tools for Text, Code & Data • Part of the NDL Network Ecosystem
          </p>
        </div>
      </div>

      <div className="space-y-8 text-base leading-relaxed">
        <section>
          <p className="text-lg text-slate-700 dark:text-slate-300 font-normal">
            <strong>ToolsKit</strong> was engineered by <strong>{SITE_CONFIG.author}</strong> with a straightforward mission: to provide the cleanest, fastest, and most privacy-conscious utility toolbox on the internet.
          </p>
          <p className="mt-3">
            Every day, millions of writers, students, engineers, and digital specialists need simple, reliable tasks: cleaning up line breaks from PDFs, formatting messy JSON payloads, calculating word counts, converting casing, or generating random tokens. Unfortunately, the web is filled with dated utility sites that are slow, cluttered with intrusive popups, and frequently upload confidential user text to remote servers.
          </p>
        </section>

        {/* Core Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">100% Privacy First</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Standard tools process data directly in your browser. Your sensitive code and documents never leave your machine.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">Zero Latency Speed</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Transform millions of characters in milliseconds without server roundtrips, queuing delays, or network lag.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">Forever Free & Open</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              No accounts, no paywalls, no daily limits. Open, accessible productivity for everyone across all devices.
            </p>
          </div>
        </section>

        {/* NDL Ecosystem Section */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 dark:from-slate-900/90 dark:via-blue-950/20 dark:to-slate-900/90 border border-blue-200/70 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Part of the NDL Network Ecosystem</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            ToolsKit is proud to be part of the <strong>NDL Network</strong>, a digital ecosystem created by software engineer <strong>Nguyen Dai Long (NDL)</strong> focused on high-performance web applications, financial hubs, and digital utilities.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-medium">
            <a
              href={SIBLING_SITES.laisuat}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>🏦 Lãi Suất VN</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
            <a
              href={SIBLING_SITES.tygia}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>📊 Tỷ Giá Hub</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
            <a
              href={SIBLING_SITES.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>🔗 ShortLink</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
            <a
              href={SIBLING_SITES.image}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>🖼️ Image Tools</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </div>
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
            Explore the creator portfolio at{' '}
            <a href={MAIN_SITE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 underline">
              ndlong.site
            </a>.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Why Browser-Based Processing Matters
          </h2>
          <p>
            When you paste a proprietary JSON API response, an unpublished article draft, or an encryption key into an online formatter, you should never have to wonder whether that data is being recorded in server logs or used for training AI models.
          </p>
          <p>
            By executing all transformations via native client-side web technologies (JavaScript, HTML5 APIs, and Web Cryptography), ToolsKit ensures that your computer does all the computation. If you disconnect your internet connection after loading the page, our tools continue functioning identically.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ready to explore our utilities?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Discover 37+ tools designed to accelerate your daily workflow.
            </p>
          </div>
          <Link
            href="/tools"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition-colors shrink-0"
          >
            Explore All Tools
          </Link>
        </section>
      </div>
    </div>
  )
}
