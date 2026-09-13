import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CATEGORIES, getCategoryBySlug } from '@/data/categories'
import { getToolsByCategory } from '@/data/tools'
import { AdBanner } from '@/components/ads/AdBanner'
import { SITE_URL, generateBreadcrumbJsonLd } from '@/lib/seo/jsonld'
import { ArrowRight, ChevronRight, Type, BarChart3, Code2, Sparkles, Star } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: catSlug } = await params
  const cat = getCategoryBySlug(catSlug)

  if (!cat) {
    return {
      title: 'Category Not Found | ToolsKit',
      description: 'The requested category does not exist.',
    }
  }

  const title = `${cat.name} - Free Online Utilities | ToolsKit`
  const description = `${cat.description} All tools run 100% in your browser without registration.`
  const canonicalUrl = `${SITE_URL}/tools/${cat.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'ToolsKit',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${cat.name} — ToolsKit`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: catSlug } = await params
  const category = getCategoryBySlug(catSlug)

  if (!category) {
    notFound()
  }

  const tools = getToolsByCategory(catSlug)
  const breadcrumbsSchema = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    { name: category.name, url: `/tools/${category.slug}` },
  ])

  const iconsMap: Record<string, React.ReactNode> = {
    text: <Type className="w-8 h-8 text-emerald-500" />,
    counter: <BarChart3 className="w-8 h-8 text-sky-500" />,
    developer: <Code2 className="w-8 h-8 text-purple-500" />,
    generators: <Sparkles className="w-8 h-8 text-amber-500" />,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/tools" className="hover:text-blue-600 dark:hover:text-blue-400">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-200 font-semibold">{category.name}</span>
        </nav>

        {/* Category Hero */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-900 dark:to-blue-950/20 border border-slate-200 dark:border-slate-800 mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
              {iconsMap[category.slug]}
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                {category.badgeText}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {category.name}
              </h1>
            </div>
          </div>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {category.description} Free, client-side, and no installation required.
          </p>
        </div>

        {/* Ad Placement */}
        <AdBanner slot="top" />

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/80 dark:hover:border-blue-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {tool.category}
                  </span>
                  {tool.popular && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      Popular
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Open Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Other Categories */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CATEGORIES.filter((c) => c.slug !== category.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/tools/${other.slug}`}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 transition-all flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{other.name}</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{other.badgeText}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>

        <AdBanner slot="bottom" />
      </div>
    </>
  )
}
