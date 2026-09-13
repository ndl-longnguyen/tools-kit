import React from 'react'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/config/site'

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_CONFIG.name}`,
  description: `Terms of Service and conditions of use for ${SITE_CONFIG.name} tools and services. Part of the NDL Network Ecosystem.`,
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
        Terms of Service
      </h1>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">
        Last modified: September 2026 · Part of the NDL Network Ecosystem
      </p>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using {SITE_CONFIG.name} (the &quot;Service&quot;), operated under {SITE_CONFIG.publisher}, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, please do not use the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            2. Permitted Use &amp; Intellectual Property
          </h2>
          <p>
            {SITE_CONFIG.name} grants you a free, non-exclusive, revocable license to utilize our browser-based utility tools for both personal and commercial purposes. You retain full ownership and rights to all text, code, or data that you process using our tools. {SITE_CONFIG.name} claims no intellectual property rights over user-generated or user-processed content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            3. Prohibited Activities
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Attempt to disrupt or overburden the website infrastructure via automated denial-of-service attacks.</li>
            <li>Scrape or reproduce the website interface in a manner that creates misleading imitation services.</li>
            <li>Use the tools for illegal, abusive, or harmful endeavors.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            4. Disclaimer of Warranties
          </h2>
          <p>
            The services and utility tools on {SITE_CONFIG.name} are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied, including but not limited to fitness for a particular purpose or accuracy. While our tools undergo rigorous testing, you are encouraged to verify critical data transformations before final deployment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall {SITE_CONFIG.name}, {SITE_CONFIG.publisher}, its creator {SITE_CONFIG.author}, or contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the tools.
          </p>
        </section>

        <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            6. Contact Information
          </h2>
          <p>
            Questions regarding these Terms of Service may be addressed to{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-600 dark:text-blue-400 underline font-semibold">
              {SITE_CONFIG.email}
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}
