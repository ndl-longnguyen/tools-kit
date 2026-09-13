export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.ndlong.site'
export const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://ndlong.site'

export const SIBLING_SITES = {
  main: MAIN_SITE_URL,
  laisuat: process.env.NEXT_PUBLIC_LAISUAT_URL || 'https://laisuat.ndlong.site',
  tygia: process.env.NEXT_PUBLIC_TYGIA_URL || 'https://tygia.ndlong.site',
  link: process.env.NEXT_PUBLIC_LINK_URL || 'https://link.ndlong.site',
  image: process.env.NEXT_PUBLIC_IMAGE_URL || 'https://image.ndlong.site',
  click: process.env.NEXT_PUBLIC_CLICK_URL || 'https://click.ndlong.site',
  games: process.env.NEXT_PUBLIC_GAMES_URL || 'https://games.ndlong.site',
  arcade: process.env.NEXT_PUBLIC_ARCADE_URL || 'https://arcade.ndlong.site',
  tools: SITE_URL,
}

export const SITE_CONFIG = {
  name: 'ToolsKit',
  shortName: 'ToolsKit',
  brandSuffix: 'by NDL',
  tagline: 'Free Online Tools for Text, Code & Data',
  description:
    'Free online utility platform for text cleaning, case conversion, developer encoding, word counts, and generators. 100% browser-based privacy. Part of the NDL network.',
  author: 'Nguyen Dai Long (NDL)',
  email: 'ndl.long.nguyendai@gmail.com',
  publisher: 'NDL Studio',
  links: {
    mainSite: MAIN_SITE_URL,
    blog: `${MAIN_SITE_URL}/blog`,
    privacy: '/privacy',
    terms: '/terms',
    about: '/about',
    contact: '/contact',
    linkedin: 'https://www.linkedin.com/in/ndl-longnguyen/',
    github: 'https://github.com/ndl-longnguyen/toolskit',
  },
  adsense: {
    client: 'ca-pub-9166964727480227',
  },
  googleVerification: '2n_hKWDM5r9dlRixMDRAsSCW6hbadPKFb5ccKFfG3i0',
}
