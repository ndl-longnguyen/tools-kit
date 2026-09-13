'use client'

const FAVORITES_KEY = 'textkit_favorites'
const RECENTS_KEY = 'textkit_recently_used'
const MAX_RECENTS = 10

let cachedFavorites: string[] = []
let cachedFavoritesRaw: string | null = null

let cachedRecents: string[] = []
let cachedRecentsRaw: string | null = null

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (raw === cachedFavoritesRaw) return cachedFavorites
    cachedFavoritesRaw = raw
    cachedFavorites = raw ? JSON.parse(raw) : []
    return cachedFavorites
  } catch {
    return []
  }
}

export function subscribeFavorites(callback: () => void) {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('textkit_favorites_changed', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('textkit_favorites_changed', callback)
    window.removeEventListener('storage', callback)
  }
}

export function toggleFavorite(slug: string): boolean {
  if (typeof window === 'undefined') return false
  try {
    const favorites = [...getFavorites()]
    const index = favorites.indexOf(slug)
    let isFav = false

    if (index > -1) {
      favorites.splice(index, 1)
      isFav = false
    } else {
      favorites.push(slug)
      isFav = true
    }

    const raw = JSON.stringify(favorites)
    localStorage.setItem(FAVORITES_KEY, raw)
    cachedFavoritesRaw = raw
    cachedFavorites = favorites
    window.dispatchEvent(new Event('textkit_favorites_changed'))
    return isFav
  } catch {
    return false
  }
}

export function isFavorite(slug: string): boolean {
  const favorites = getFavorites()
  return favorites.includes(slug)
}

export function getRecentlyUsed(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(RECENTS_KEY)
    if (raw === cachedRecentsRaw) return cachedRecents
    cachedRecentsRaw = raw
    cachedRecents = raw ? JSON.parse(raw) : []
    return cachedRecents
  } catch {
    return []
  }
}

export function subscribeRecents(callback: () => void) {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('textkit_recents_changed', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('textkit_recents_changed', callback)
    window.removeEventListener('storage', callback)
  }
}

export function addRecentlyUsed(slug: string): void {
  if (typeof window === 'undefined') return
  try {
    const recents = getRecentlyUsed().filter((s) => s !== slug)
    recents.unshift(slug)
    if (recents.length > MAX_RECENTS) {
      recents.length = MAX_RECENTS
    }
    const raw = JSON.stringify(recents)
    localStorage.setItem(RECENTS_KEY, raw)
    cachedRecentsRaw = raw
    cachedRecents = recents
    window.dispatchEvent(new Event('textkit_recents_changed'))
  } catch {
    // ignore
  }
}
