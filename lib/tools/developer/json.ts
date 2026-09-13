export interface JsonValidationResult {
  valid: boolean
  message: string
  error?: {
    message: string
    line?: number
    column?: number
    snippet?: string
  }
}

export function formatJson(text: string, indent: 2 | 4 | 'tab' = 2): { result: string; error?: string } {
  if (!text || text.trim() === '') {
    return { result: '' }
  }

  try {
    const parsed = JSON.parse(text)
    const space = indent === 'tab' ? '\t' : indent
    return { result: JSON.stringify(parsed, null, space) }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid JSON'
    return { result: text, error: msg }
  }
}

export function minifyJson(text: string): { result: string; error?: string } {
  if (!text || text.trim() === '') {
    return { result: '' }
  }

  try {
    const parsed = JSON.parse(text)
    return { result: JSON.stringify(parsed) }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid JSON'
    return { result: text, error: msg }
  }
}

export function validateJson(text: string): JsonValidationResult {
  if (!text || text.trim() === '') {
    return {
      valid: false,
      message: 'Input is empty. Please enter JSON data to validate.',
    }
  }

  try {
    JSON.parse(text)
    return {
      valid: true,
      message: 'Valid JSON format! The syntax is completely compliant with RFC 8259.',
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown JSON parse error'

    // Extract line and column from typical V8 / browser error message
    // e.g. "Unexpected token '}' at position 42" or "at line 3 column 5"
    let line: number | undefined
    let column: number | undefined

    const lineColMatch = msg.match(/line\s+(\d+)\s+column\s+(\d+)/i)
    if (lineColMatch) {
      line = parseInt(lineColMatch[1], 10)
      column = parseInt(lineColMatch[2], 10)
    } else {
      const posMatch = msg.match(/position\s+(\d+)/i)
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10)
        const linesBefore = text.slice(0, pos).split('\n')
        line = linesBefore.length
        column = linesBefore[linesBefore.length - 1].length + 1
      }
    }

    let snippet: string | undefined
    if (line !== undefined) {
      const allLines = text.split('\n')
      const errorLine = allLines[line - 1] || ''
      snippet = `Line ${line}: ${errorLine}`
    }

    return {
      valid: false,
      message: `Invalid JSON: ${msg}`,
      error: {
        message: msg,
        line,
        column,
        snippet,
      },
    }
  }
}
