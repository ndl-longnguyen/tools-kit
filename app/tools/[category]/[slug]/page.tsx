import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { TOOLS, getToolBySlug } from '@/data/tools'
import { ToolHeader } from '@/components/tool/ToolHeader'
import { ToolClientView } from '@/components/tool/ToolClientView'
import { ToolSEOContent } from '@/components/tool/ToolSEOContent'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { AdBanner } from '@/components/ads/AdBanner'
import {
  SITE_URL,
  generateWebApplicationJsonLd,
  generateFaqJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo/jsonld'

interface PageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, category } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return {
      title: 'Tool Not Found | ToolsKit',
      description: 'The requested tool does not exist.',
    }
  }

  const title = `${tool.name} Online - Free Online Tool | ToolsKit`
  const description = `${tool.description} Fast, free, and 100% privacy-friendly browser utility.`
  const canonicalUrl = `${SITE_URL}/tools/${category}/${slug}`

  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'ToolsKit',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${tool.name} — ToolsKit`,
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

export default async function ToolPage({ params }: PageProps) {
  const { slug, category } = await params
  const tool = getToolBySlug(slug)

  if (!tool || tool.category !== category) {
    notFound()
  }

  const webAppSchema = generateWebApplicationJsonLd(tool)
  const faqSchema = generateFaqJsonLd(tool.faqs)
  const breadcrumbsSchema = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    { name: tool.category, url: `/tools/${tool.category}` },
    { name: tool.name, url: `/tools/${tool.category}/${tool.slug}` },
  ])

  return (
    <>
      {/* Structured Data Scripts (SEO JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Tool Header & Breadcrumbs */}
        <ToolHeader tool={tool} />

        {/* Top Ad Unit (Google AdSense Ready) */}
        <AdBanner slot="top" />

        {/* Interactive Tool Editor */}
        <main>
          <ToolClientView tool={tool} />
        </main>

        {/* Mid-Content Ad Unit */}
        <AdBanner slot="in-content" />

        {/* Rich SEO Content: How to Use, Examples, FAQ, and Privacy */}
        <ToolSEOContent tool={tool} />

        {/* Internal Linking: Related Tools */}
        <RelatedTools
          currentSlug={tool.slug}
          relatedSlugs={tool.relatedSlugs}
          category={tool.category}
        />

        {/* Bottom Content Ad Unit */}
        <AdBanner slot="bottom" />
      </article>
    </>
  )
}
