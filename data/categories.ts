export interface CategoryDefinition {
  slug: 'text' | 'counter' | 'developer' | 'generators'
  name: string
  shortName: string
  description: string
  icon: string
  badgeText: string
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'text',
    name: 'Text & String Tools',
    shortName: 'Text',
    description: 'Clean, format, convert case, sort, and transform text lines with lightning speed.',
    icon: 'Type',
    badgeText: '16 Tools',
  },
  {
    slug: 'counter',
    name: 'Counter & Text Statistics',
    shortName: 'Counter',
    description: 'Count words, characters, sentences, lines, and calculate reading time in real time.',
    icon: 'BarChart3',
    badgeText: '7 Tools',
  },
  {
    slug: 'developer',
    name: 'Developer Utilities',
    shortName: 'Developer',
    description: 'Format, validate and minify JSON, encode/decode Base64 and URLs directly in browser.',
    icon: 'Code2',
    badgeText: '7 Tools',
  },
  {
    slug: 'generators',
    name: 'Random & Data Generators',
    shortName: 'Generators',
    description: 'Generate UUIDs, strong random strings, numbers, and pick random choices.',
    icon: 'Sparkles',
    badgeText: '4 Tools',
  },
]

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug)
}
