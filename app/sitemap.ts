import { MetadataRoute } from 'next'
import { TOOLS } from '@/data/tools'
import { CATEGORIES } from '@/data/categories'
import { SITE_URL } from '@/lib/seo/jsonld'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Category routes
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/tools/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // All 37 Tool routes
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.category}/${tool.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: tool.popular ? 0.9 : 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes]
}
