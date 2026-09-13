'use client'

import React, { useState } from 'react'
import { ToolDefinition } from '@/data/tools'
import { ChevronDown, CheckCircle, ShieldCheck, HelpCircle, FileCode, Zap } from 'lucide-react'

interface ToolSEOContentProps {
  tool: ToolDefinition
}

export function ToolSEOContent({ tool }: ToolSEOContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 space-y-10 text-slate-800 dark:text-slate-200">
      {/* 1. How to Use Section */}
      <section aria-labelledby="how-to-use-heading">
        <h2
          id="how-to-use-heading"
          className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 mb-4"
        >
          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>How to Use {tool.name}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {tool.howToSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center mb-3">
                {idx + 1}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Example Section */}
      {tool.examples && (
        <section aria-labelledby="examples-heading">
          <h2
            id="examples-heading"
            className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 mb-3"
          >
            <FileCode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Example & Output</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
            {tool.examples.description || `Here is a typical transformation using ${tool.name}:`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-3.5">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1.5">
                Input Example
              </span>
              <pre className="text-xs font-code text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-all overflow-x-auto">
                {tool.examples.input}
              </pre>
            </div>

            {tool.examples.output && (
              <div className="rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 p-3.5">
                <span className="text-xs font-semibold uppercase text-blue-600 dark:text-blue-400 block mb-1.5">
                  Resulting Output
                </span>
                <pre className="text-xs font-code text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-all overflow-x-auto">
                  {tool.examples.output}
                </pre>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. Privacy & Feature Guarantees */}
      <section className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-blue-500/5 to-transparent border border-emerald-500/20">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Privacy-First & In-Browser Guarantee
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Your confidential text, passwords, and data are processed <strong>entirely inside your browser</strong> using client-side JavaScript. Nothing is sent to our servers or saved in a remote database.
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                No registration required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                No rate limits
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                100% Free Forever
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 mb-4"
          >
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-3">
            {tool.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
