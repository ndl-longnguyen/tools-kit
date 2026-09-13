'use client'

import React, { useState } from 'react'
import { Mail, Send, CheckCircle2, ExternalLink } from 'lucide-react'
import { SITE_CONFIG, MAIN_SITE_URL } from '@/lib/config/site'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-800 dark:text-slate-200">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Mail className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Contact & Feedback
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
          Have a suggestion for a new tool? Found a bug? Or have questions regarding partnerships or Google AdSense? We would love to hear from you.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Thank you for reaching out!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Your message has been received. {SITE_CONFIG.author} and the support team will review your feedback promptly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false)
              setName('')
              setEmail('')
              setSubject('')
              setMessage('')
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyen Van A"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Feature request / Bug report / General inquiry"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Your Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what tool you need or details about your experience..."
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      )}

      {/* Direct support email & Creator Profile note */}
      <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <div>
          <span>Direct creator inquiries: </span>
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-600 dark:text-blue-400 underline font-medium">
            {SITE_CONFIG.email}
          </a>
        </div>
        <div>
          <span>Developer portfolio: </span>
          <a href={MAIN_SITE_URL} target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 font-semibold hover:underline inline-flex items-center gap-1">
            <span>{SITE_CONFIG.publisher}</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  )
}
