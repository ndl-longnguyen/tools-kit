import React from 'react'
import type { Metadata } from 'next'
import { ShieldCheck, Lock, Cookie } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config/site'

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.name}`,
  description:
    `${SITE_CONFIG.name} Privacy Policy. Learn how our privacy-first, client-side browser utilities protect your sensitive data, and read our Google AdSense and cookie disclosures.`,
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-800 dark:text-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Effective Date: September 2026 · Part of the NDL Network Ecosystem
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed">
        <section className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
          <h2 className="text-lg font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Our Core Privacy Principle: Client-Side Processing</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            At <strong>{SITE_CONFIG.name}</strong>, privacy is not an afterthought — it is the core foundation of our architecture. 
            Standard text, developer formatting, and generator tools operate <strong>exclusively within your web browser</strong> using client-side JavaScript.
            Your text, documents, code snippets, and generated strings are <strong>never sent to our servers</strong>, stored in a database, or logged.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            1. Information We Do NOT Collect
          </h2>
          <p>
            Because our utilities execute locally on your device:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>We do not record, store, or transmit the contents of text or files you process.</li>
            <li>We do not require user accounts, passwords, or personal credentials for utility tools.</li>
            <li>We do not sell, rent, or trade your processed data under any circumstances.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            2. Local Storage
          </h2>
          <p>
            {SITE_CONFIG.name} uses your browser&apos;s standard <code>localStorage</code> API solely to store convenience preferences:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Your list of favorited tools (marked with the star icon).</li>
            <li>Your list of recently opened tools (maximum of 10 items).</li>
            <li>Your preferred UI color scheme (Light, Dark, or System mode).</li>
          </ul>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            This data remains on your physical device and can be cleared at any time by clearing your browser cache.
          </p>
        </section>

        <section className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <Cookie className="w-5 h-5 text-amber-500" />
            <span>3. Third-Party Advertising &amp; Google AdSense Disclosure</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            We partner with third-party advertising companies, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website. These companies may use cookies and web beacons to serve ads based on your prior visits to {SITE_CONFIG.name} or other websites on the Internet:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Google&apos;s DART Cookie:</strong> Google, as a third-party vendor, uses cookies to serve ads on {SITE_CONFIG.name}. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and/or other sites on the Internet.
            </li>
            <li>
              <strong>Opting Out of Personalized Ads:</strong> Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline font-medium"
              >
                Google Ads Settings
              </a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline font-medium"
              >
                aboutads.info
              </a>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            4. Web Analytics &amp; Server Logs
          </h2>
          <p>
            Like standard web platforms, our hosting infrastructure may collect non-identifiable technical logs (such as IP addresses, browser user-agents, referral URLs, and visit timestamps) purely for operational security, DDOS protection, and performance monitoring.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            5. GDPR and CCPA Privacy Rights
          </h2>
          <p>
            Depending on your location, you may have statutory privacy rights under regulations such as the EU General Data Protection Regulation (GDPR) or California Consumer Privacy Act (CCPA):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><strong>Right to Know / Access:</strong> You have the right to request what data is collected. ({SITE_CONFIG.name} does not collect personal identifiers or user text).</li>
            <li><strong>Right to Deletion:</strong> You can purge all locally stored preferences at any time via your browser settings.</li>
            <li><strong>Non-Discrimination:</strong> {SITE_CONFIG.name} treats all users equally and provides free access to all utility tools regardless of privacy choices.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            6. Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy periodically to reflect architectural changes or regulatory requirements. Any modifications will be posted directly on this page with an updated revision date.
          </p>
        </section>

        <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            7. Contact Us
          </h2>
          <p>
            If you have questions or inquiries concerning this Privacy Policy, please reach out via email to{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-600 dark:text-blue-400 underline font-semibold">
              {SITE_CONFIG.email}
            </a>{' '}
            or through our{' '}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 underline font-semibold">
              Contact Page
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}
