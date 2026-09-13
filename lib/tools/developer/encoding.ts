export function encodeBase64(text: string, urlSafe = false): { result: string; error?: string } {
  if (!text) return { result: '' }

  try {
    // UTF-8 safe encoding using TextEncoder
    const bytes = new TextEncoder().encode(text)
    let binary = ''
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    let base64 = btoa(binary)

    if (urlSafe) {
      base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    }

    return { result: base64 }
  } catch (err: unknown) {
    return { result: '', error: err instanceof Error ? err.message : 'Encoding failed' }
  }
}

export function decodeBase64(base64: string): { result: string; error?: string } {
  if (!base64 || base64.trim() === '') return { result: '' }

  try {
    let sanitized = base64.trim()
    // Convert URL-safe base64 to standard
    sanitized = sanitized.replace(/-/g, '+').replace(/_/g, '/')
    // Pad with = if needed
    while (sanitized.length % 4 !== 0) {
      sanitized += '='
    }

    const binary = atob(sanitized)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    return { result: decoded }
  } catch {
    // Fallback if TextDecoder fatal or atob failed
    try {
      const fallbackBinary = atob(base64.trim())
      return { result: fallbackBinary }
    } catch {
      return { result: '', error: 'Invalid Base64 string. Please check the input format.' }
    }
  }
}

export function encodeUrl(text: string, mode: 'component' | 'full' = 'component'): { result: string } {
  if (!text) return { result: '' }
  try {
    const encoded = mode === 'full' ? encodeURI(text) : encodeURIComponent(text)
    return { result: encoded }
  } catch {
    return { result: text }
  }
}

export function decodeUrl(text: string, plusToSpace = true): { result: string; error?: string } {
  if (!text) return { result: '' }
  try {
    let sanitized = text
    if (plusToSpace) {
      sanitized = sanitized.replace(/\+/g, ' ')
    }
    return { result: decodeURIComponent(sanitized) }
  } catch (err: unknown) {
    return {
      result: text,
      error: err instanceof Error ? `URL Decode error: ${err.message}` : 'Malformed URL encoding',
    }
  }
}
