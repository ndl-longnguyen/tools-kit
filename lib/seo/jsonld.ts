import { ToolDefinition } from '@/data/tools'
import { SITE_URL, MAIN_SITE_URL, SITE_CONFIG } from '@/lib/config/site'

export { SITE_URL }

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    alternateName: ['ToolsKit', 'ToolsKit by NDL', 'tools.ndlong.site', 'NDL ToolsKit'],
    url: SITE_URL,
    description: SITE_CONFIG.description,
    image: `${SITE_URL}/og-image.png`,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.publisher,
      url: MAIN_SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateWebApplicationJsonLd(tool: ToolDefinition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${tool.name} - ${SITE_CONFIG.name}`,
    url: `${SITE_URL}/tools/${tool.category}/${tool.slug}`,
    description: tool.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    image: `${SITE_URL}/og-image.png`,
    screenshot: `${SITE_URL}/og-image.png`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: tool.howToSteps.join('; '),
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.publisher,
      url: MAIN_SITE_URL,
    },
  }
}

export function generateFaqJsonLd(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}
