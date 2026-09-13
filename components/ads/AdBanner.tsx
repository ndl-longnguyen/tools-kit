'use client'

import React, { useEffect } from 'react'
import { SITE_CONFIG } from '@/lib/config/site'

interface AdBannerProps {
  slot: 'top' | 'in-content' | 'bottom'
  adSlotId?: string
  className?: string
}

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export function AdBanner({ slot, adSlotId, className = '' }: AdBannerProps) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || SITE_CONFIG.adsense.client

  useEffect(() => {
    if (adsenseClientId && adSlotId && typeof window !== 'undefined') {
      try {
        const adsbygoogle = window.adsbygoogle || []
        adsbygoogle.push({})
      } catch (e) {
        console.error('AdSense error:', e)
      }
    }
  }, [adsenseClientId, adSlotId])

  // Size styling according to placement slot
  const slotStyles = {
    top: 'min-h-[90px] max-h-[100px] w-full my-4',
    'in-content': 'min-h-[120px] w-full my-6',
    bottom: 'min-h-[90px] max-h-[120px] w-full my-8',
  }

  // If real AdSense is configured with an active adSlotId, render standard adsbygoogle tag
  if (adsenseClientId && adSlotId) {
    return (
      <aside
        aria-label="Advertisement"
        className={`w-full overflow-hidden flex flex-col items-center justify-center ${slotStyles[slot]} ${className}`}
      >
        <span className="text-[10px] tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-1 font-medium select-none">
          Advertisement
        </span>
        <ins
          className="adsbygoogle block w-full text-center"
          style={{ display: 'block' }}
          data-ad-client={adsenseClientId}
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    )
  }

  // Preview placeholder slot (AdSense Ready)
  return (
    <aside
      aria-label="Advertisement Placement Area"
      className={`w-full rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center justify-center py-4 px-3 text-center transition-all hover:border-slate-300 dark:hover:border-slate-700 ${slotStyles[slot]} ${className}`}
    >
      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-0.5 select-none">
        Advertisement Space ({slot})
      </span>
      <p className="text-xs text-slate-400 dark:text-slate-600 select-none">
        Google AdSense Ready ({adsenseClientId})
      </p>
    </aside>
  )
}
