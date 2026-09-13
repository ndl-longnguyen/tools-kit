export interface ToolExample {
  input: string
  output?: string
  description?: string
}

export interface ToolFaq {
  question: string
  answer: string
}

export interface ToolDefinition {
  slug: string
  name: string
  category: 'text' | 'counter' | 'developer' | 'generators'
  description: string
  shortDescription: string
  keywords: string[]
  popular?: boolean
  icon: string
  howToSteps: string[]
  examples: ToolExample
  faqs: ToolFaq[]
  relatedSlugs: string[]
}

export const TOOLS: ToolDefinition[] = [
  // --- TEXT CLEANING ---
  {
    slug: 'remove-line-breaks',
    name: 'Remove Line Breaks',
    category: 'text',
    description: 'Remove line breaks and newlines from your text instantly. Combine multiple lines into a single paragraph or join them with custom separators.',
    shortDescription: 'Remove line breaks and join lines into clean text.',
    keywords: ['remove line breaks', 'remove new lines', 'join lines', 'text cleaner', 'line break remover'],
    popular: true,
    icon: 'WrapText',
    howToSteps: [
      'Paste or type your text with unwanted line breaks into the input box.',
      'Select whether to replace line breaks with spaces or join lines directly.',
      'Click "Remove Line Breaks" to clean the text, then copy or download the result.',
    ],
    examples: {
      input: 'TextKit is a free\nonline utility platform\nfor text and code.',
      output: 'TextKit is a free online utility platform for text and code.',
      description: 'Cleans multiline breaks into one cohesive sentence.',
    },
    faqs: [
      {
        question: 'Does this tool preserve paragraphs?',
        answer: 'You can choose to preserve double line breaks (paragraphs) while removing single line breaks inside paragraphs.',
      },
      {
        question: 'Is my text uploaded to a server?',
        answer: 'No. All processing occurs locally within your browser using JavaScript. No text is ever transmitted or stored.',
      },
      {
        question: 'Can I choose what separator replaces line breaks?',
        answer: 'Yes, you can replace line breaks with a single space, a comma, a custom character, or remove them entirely.',
      },
    ],
    relatedSlugs: ['remove-empty-lines', 'remove-extra-spaces', 'trim-lines', 'word-counter'],
  },
  {
    slug: 'remove-empty-lines',
    name: 'Remove Empty Lines',
    category: 'text',
    description: 'Strip all blank and empty lines from your text. Eliminates unwanted spacing between lines while preserving all valid content.',
    shortDescription: 'Delete blank and whitespace-only lines instantly.',
    keywords: ['remove empty lines', 'delete blank lines', 'strip empty rows', 'clean blank lines'],
    popular: true,
    icon: 'AlignJustify',
    howToSteps: [
      'Paste your text containing empty lines into the input area.',
      'The tool immediately filters out empty lines and lines containing only whitespace.',
      'Copy the compacted result to your clipboard with one click.',
    ],
    examples: {
      input: 'Line 1\n\n\nLine 2\n\nLine 3',
      output: 'Line 1\nLine 2\nLine 3',
      description: 'Removes all extraneous blank lines.',
    },
    faqs: [
      {
        question: 'Does it remove lines that only contain spaces or tabs?',
        answer: 'Yes! Lines containing only spaces, tabs, or invisible whitespace characters are also detected and removed.',
      },
    ],
    relatedSlugs: ['remove-line-breaks', 'remove-duplicate-lines', 'trim-lines'],
  },
  {
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    category: 'text',
    description: 'Deduplicate lines of text, lists, emails, or data points. Keep only unique lines with case-sensitive or case-insensitive options.',
    shortDescription: 'Remove duplicate lines and find unique lines.',
    keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines', 'remove duplicates online'],
    popular: true,
    icon: 'CopyCheck',
    howToSteps: [
      'Paste your list or multiline text into the editor.',
      'Choose case-sensitivity settings if required.',
      'Instantly view your deduplicated list and see how many duplicates were removed.',
    ],
    examples: {
      input: 'Apple\nBanana\nApple\nOrange\nBanana',
      output: 'Apple\nBanana\nOrange',
      description: 'Strips duplicate entries and preserves order.',
    },
    faqs: [
      {
        question: 'Does this preserve the original order of lines?',
        answer: 'Yes, the first occurrence of each unique line is kept in its original sequence.',
      },
    ],
    relatedSlugs: ['sort-lines', 'remove-empty-lines', 'trim-lines'],
  },
  {
    slug: 'remove-extra-spaces',
    name: 'Remove Extra Spaces',
    category: 'text',
    description: 'Clean up consecutive spaces, tabs, and redundant whitespace. Replaces multiple consecutive spaces with a single space and trims edges.',
    shortDescription: 'Replace multiple spaces with a single space.',
    keywords: ['remove extra spaces', 'clean whitespace', 'multiple spaces to single space', 'normalize spaces'],
    popular: true,
    icon: 'Space',
    howToSteps: [
      'Input text containing double or multiple spaces.',
      'Click the process button to collapse extra spaces into a single space.',
      'Copy the polished text to your clipboard.',
    ],
    examples: {
      input: 'This   sentence    has    too   many   spaces.',
      output: 'This sentence has too many spaces.',
      description: 'Collapses multiple consecutive spaces into one.',
    },
    faqs: [
      {
        question: 'Does it remove line breaks too?',
        answer: 'By default, it normalizes horizontal whitespace on each line while preserving line breaks.',
      },
    ],
    relatedSlugs: ['trim-lines', 'remove-line-breaks', 'normalize-whitespace'],
  },
  {
    slug: 'remove-numbers',
    name: 'Remove Numbers',
    category: 'text',
    description: 'Quickly strip all numeric digits (0-9) from your text while retaining letters, spaces, and punctuation.',
    shortDescription: 'Delete all digits and numbers from text.',
    keywords: ['remove numbers', 'strip digits', 'delete numbers from text', 'remove numbers online'],
    icon: 'Binary',
    howToSteps: [
      'Paste your text with numbers into the input field.',
      'Watch digits 0 through 9 get removed automatically.',
      'Copy your clean alphabetical text.',
    ],
    examples: {
      input: 'Order #12345 was placed on 2026-09-12 by Customer 987.',
      output: 'Order # was placed on -- by Customer .',
      description: 'Strips all numerical digits.',
    },
    faqs: [
      {
        question: 'Can I remove punctuation along with numbers?',
        answer: 'You can chain this with the Remove Punctuation tool to get pure letters only.',
      },
    ],
    relatedSlugs: ['remove-punctuation', 'remove-special-characters', 'word-counter'],
  },
  {
    slug: 'remove-punctuation',
    name: 'Remove Punctuation',
    category: 'text',
    description: 'Eliminate all punctuation marks like commas, periods, exclamation marks, question marks, and quotation marks.',
    shortDescription: 'Strip all punctuation marks from text.',
    keywords: ['remove punctuation', 'delete punctuation', 'strip commas and periods', 'text punctuation cleaner'],
    icon: 'Sparkle',
    howToSteps: [
      'Enter text containing punctuation marks.',
      'All standard punctuation marks are stripped away cleanly.',
      'Copy or download the sanitized output.',
    ],
    examples: {
      input: 'Hello, World! How are you doing today? "Great!"',
      output: 'Hello World How are you doing today Great',
      description: 'Removes commas, periods, quotes, and exclamation marks.',
    },
    faqs: [
      {
        question: 'Are unicode punctuation symbols supported?',
        answer: 'Yes, both ASCII and common typographic quotes, dashes, and ellipsis marks are removed.',
      },
    ],
    relatedSlugs: ['remove-numbers', 'remove-special-characters', 'remove-extra-spaces'],
  },
  {
    slug: 'remove-special-characters',
    name: 'Remove Special Characters',
    category: 'text',
    description: 'Keep only alphanumeric characters and spaces by stripping symbols, emojis, and special punctuation.',
    shortDescription: 'Clean text by removing symbols and special characters.',
    keywords: ['remove special characters', 'alphanumeric text only', 'strip symbols', 'clean text symbols'],
    icon: 'ShieldAlert',
    howToSteps: [
      'Paste any string containing emojis, symbols, or special characters.',
      'Select whether to retain basic spaces and line breaks.',
      'Get clean alphanumeric text ready for databases or code.',
    ],
    examples: {
      input: 'TextKit @2026 is #1 ★ best-in-class {utility}!',
      output: 'TextKit 2026 is 1  bestinclass utility',
      description: 'Keeps letters, numbers, and basic spacing.',
    },
    faqs: [
      {
        question: 'Does this preserve international letters with accents?',
        answer: 'Yes, standard Unicode letters (like é, à, ü, Vietnamese characters) are preserved.',
      },
    ],
    relatedSlugs: ['remove-punctuation', 'remove-numbers', 'remove-extra-spaces'],
  },
  {
    slug: 'trim-lines',
    name: 'Trim Lines',
    category: 'text',
    description: 'Remove leading and trailing spaces or tabs from every line in your text without affecting the text in between.',
    shortDescription: 'Trim leading and trailing whitespace from each line.',
    keywords: ['trim lines', 'remove leading spaces', 'remove trailing spaces', 'clean line edges'],
    popular: true,
    icon: 'Scissors',
    howToSteps: [
      'Paste text with messy indentations or trailing spaces.',
      'Each line is trimmed cleanly at both ends.',
      'Copy the neatly trimmed lines.',
    ],
    examples: {
      input: '   First line with space   \n\tSecond line with tab\t\n   Third line   ',
      output: 'First line with space\nSecond line with tab\nThird line',
      description: 'Strips spaces and tabs from the start and end of each line.',
    },
    faqs: [
      {
        question: 'Can I trim only the left or only the right side?',
        answer: 'Yes, you can choose Trim Both, Trim Start (leading), or Trim End (trailing).',
      },
    ],
    relatedSlugs: ['remove-extra-spaces', 'remove-empty-lines', 'sort-lines'],
  },
  {
    slug: 'normalize-whitespace',
    name: 'Normalize Whitespace',
    category: 'text',
    description: 'Convert non-breaking spaces, tab characters, and irregular Unicode spacing into uniform single ASCII spaces.',
    shortDescription: 'Convert tabs and irregular spacing into standard spaces.',
    keywords: ['normalize whitespace', 'replace tabs with spaces', 'clean unicode spaces', 'standardize spaces'],
    icon: 'Layers',
    howToSteps: [
      'Paste text that may have been copied from PDFs, Word docs, or web pages.',
      'The tool converts tabs and non-breaking spaces into regular spaces.',
      'Copy clean text free from hidden formatting quirks.',
    ],
    examples: {
      input: 'Item\t\tPrice\tQty\nBook\t$10\t2',
      output: 'Item Price Qty\nBook $10 2',
      description: 'Replaces tabs and irregular whitespace with standard single spaces.',
    },
    faqs: [
      {
        question: 'What are non-breaking spaces (&nbsp;)?',
        answer: 'Non-breaking spaces often cause layout and search issues. This tool replaces them with standard space characters.',
      },
    ],
    relatedSlugs: ['remove-extra-spaces', 'trim-lines', 'normalize-line-breaks'],
  },
  {
    slug: 'normalize-line-breaks',
    name: 'Normalize Line Breaks',
    category: 'text',
    description: 'Standardize line endings across Windows (CRLF), Unix/Linux/macOS (LF), and legacy Mac (CR) formats.',
    shortDescription: 'Convert between Windows (CRLF) and Unix (LF) line endings.',
    keywords: ['normalize line breaks', 'crlf to lf', 'lf to crlf', 'line ending converter'],
    icon: 'CornerDownLeft',
    howToSteps: [
      'Paste code or text with mixed line endings.',
      'Select your desired target format: Unix (LF) or Windows (CRLF).',
      'Download or copy your normalized text file.',
    ],
    examples: {
      input: 'Line 1\r\nLine 2\rLine 3\nLine 4',
      output: 'Line 1\nLine 2\nLine 3\nLine 4',
      description: 'Standardizes all mixed line endings to uniform Unix (LF) breaks.',
    },
    faqs: [
      {
        question: 'Why do line endings matter?',
        answer: 'Different operating systems and Git repos prefer specific line break formats to prevent phantom git diffs.',
      },
    ],
    relatedSlugs: ['remove-line-breaks', 'remove-empty-lines', 'trim-lines'],
  },

  // --- CASE CONVERSION ---
  {
    slug: 'uppercase',
    name: 'Uppercase Converter',
    category: 'text',
    description: 'Transform any text or document into ALL UPPERCASE capital letters with full Unicode support.',
    shortDescription: 'Convert text to ALL CAPITAL letters.',
    keywords: ['uppercase converter', 'text to uppercase', 'all caps converter', 'capitalize all letters'],
    popular: true,
    icon: 'CaseUpper',
    howToSteps: [
      'Paste or type text into the input field.',
      'The text is instantly converted to uppercase.',
      'Click Copy to save the capitalized text.',
    ],
    examples: {
      input: 'hello world from textkit',
      output: 'HELLO WORLD FROM TEXTKIT',
      description: 'Converts all letters to capital format.',
    },
    faqs: [
      {
        question: 'Does this work with accented and international letters?',
        answer: 'Yes, full Unicode mapping ensures letters like é become É and tiếng Việt becomes TIẾNG VIỆT.',
      },
    ],
    relatedSlugs: ['lowercase', 'title-case', 'sentence-case', 'capitalize-words'],
  },
  {
    slug: 'lowercase',
    name: 'Lowercase Converter',
    category: 'text',
    description: 'Convert any text, caps lock strings, or uppercase headlines into uniform all small lowercase letters.',
    shortDescription: 'Convert text to all lowercase letters.',
    keywords: ['lowercase converter', 'text to lowercase', 'small letters converter', 'uncapitalize text'],
    popular: true,
    icon: 'CaseLower',
    howToSteps: [
      'Paste your capitalized text.',
      'View the lowercase text in the output box immediately.',
      'Copy the result with one click.',
    ],
    examples: {
      input: 'THIS IS AN ALL-CAPS SENTENCE.',
      output: 'this is an all-caps sentence.',
      description: 'Converts all letters to lowercase.',
    },
    faqs: [
      {
        question: 'Does it affect numbers and punctuation?',
        answer: 'No, numbers and punctuation symbols remain completely untouched.',
      },
    ],
    relatedSlugs: ['uppercase', 'title-case', 'sentence-case'],
  },
  {
    slug: 'title-case',
    name: 'Title Case Converter',
    category: 'text',
    description: 'Format headlines, article titles, and book titles into proper Title Case following standard editorial style rules.',
    shortDescription: 'Capitalize words for article headlines and titles.',
    keywords: ['title case converter', 'capitalize title', 'headline capitalization', 'title case online'],
    popular: true,
    icon: 'Heading',
    howToSteps: [
      'Paste your headline or sentence.',
      'Words are capitalized properly while minor words (a, an, the, in, of) remain lowercase when appropriate.',
      'Copy the headline ready for publishing.',
    ],
    examples: {
      input: 'the quick brown fox jumps over the lazy dog',
      output: 'The Quick Brown Fox Jumps Over the Lazy Dog',
      description: 'Capitalizes major words while keeping minor prepositions lowercase.',
    },
    faqs: [
      {
        question: 'What style guide does this follow?',
        answer: 'It follows standard Title Case conventions: major words capitalized, short conjunctions and prepositions lowercase unless at the start or end.',
      },
    ],
    relatedSlugs: ['capitalize-words', 'sentence-case', 'uppercase'],
  },
  {
    slug: 'sentence-case',
    name: 'Sentence Case Converter',
    category: 'text',
    description: 'Capitalize the first letter of each sentence while setting all other letters to lowercase.',
    shortDescription: 'Capitalize the first letter of each sentence.',
    keywords: ['sentence case converter', 'capitalize sentences', 'first letter capital', 'sentence capitalization'],
    icon: 'Type',
    howToSteps: [
      'Paste text with improper capitalization.',
      'The tool capitalizes the beginning of each sentence following periods, question marks, and exclamation marks.',
      'Copy your clean, readable paragraphs.',
    ],
    examples: {
      input: 'this is first sentence. and THIS is the second one! is it third?',
      output: 'This is first sentence. And this is the second one! Is it third?',
      description: 'Capitalizes sentence starts after terminal punctuation.',
    },
    faqs: [
      {
        question: 'Does it recognize multiple sentence endings?',
        answer: 'Yes, it accurately splits and formats after periods (.), exclamation marks (!), and question marks (?).',
      },
    ],
    relatedSlugs: ['title-case', 'lowercase', 'capitalize-words'],
  },
  {
    slug: 'capitalize-words',
    name: 'Capitalize Words',
    category: 'text',
    description: 'Capitalize the first character of every single word in your text (Start Case).',
    shortDescription: 'Capitalize the first letter of every word.',
    keywords: ['capitalize words', 'start case', 'capitalize each word', 'word capitalizer'],
    icon: 'CaseSensitive',
    howToSteps: [
      'Enter or paste text.',
      'Every word will have its initial letter capitalized.',
      'Copy the formatted string.',
    ],
    examples: {
      input: 'free online utility tools for developers and writers',
      output: 'Free Online Utility Tools For Developers And Writers',
      description: 'Every word begins with an uppercase letter.',
    },
    faqs: [
      {
        question: 'How does Capitalize Words differ from Title Case?',
        answer: 'Capitalize Words capitalizes every single word without exception, whereas Title Case keeps small words like "in", "of", "and" lowercase.',
      },
    ],
    relatedSlugs: ['title-case', 'uppercase', 'sentence-case'],
  },

  // --- LINE & TEXT OPERATIONS ---
  {
    slug: 'sort-lines',
    name: 'Sort Lines',
    category: 'text',
    description: 'Sort lines alphabetically (A to Z or Z to A), by line length, reverse current order, or shuffle randomly.',
    shortDescription: 'Sort lines alphabetically, by length, or shuffle randomly.',
    keywords: ['sort lines', 'alphabetize list', 'sort a to z', 'shuffle lines', 'sort lines by length'],
    popular: true,
    icon: 'ArrowDownAZ',
    howToSteps: [
      'Paste your multiline list or text.',
      'Select your sorting method: A-Z, Z-A, Shortest to Longest, Longest to Shortest, Reverse, or Shuffle.',
      'Copy the sorted list.',
    ],
    examples: {
      input: 'Zebra\nApple\nMango\nBanana',
      output: 'Apple\nBanana\nMango\nZebra',
      description: 'Alphabetizes list in ascending A-Z order.',
    },
    faqs: [
      {
        question: 'Can I sort numbers numerically instead of alphabetically?',
        answer: 'Yes, natural sorting detects numbers so 2 comes before 10.',
      },
    ],
    relatedSlugs: ['remove-duplicate-lines', 'shuffle-lines', 'reverse-text'],
  },
  {
    slug: 'reverse-text',
    name: 'Reverse Text',
    category: 'text',
    description: 'Flip your text backwards. Reverse entire text, reverse each word, or flip line order backwards.',
    shortDescription: 'Flip text backwards or reverse word by word.',
    keywords: ['reverse text', 'backwards text generator', 'flip text', 'reverse words'],
    icon: 'RotateCcw',
    howToSteps: [
      'Enter any text string.',
      'Select reversal mode: Reverse Entire String, Reverse Words, or Reverse Line Order.',
      'Copy the reversed text.',
    ],
    examples: {
      input: 'TextKit Utilities',
      output: 'seitilitU tiKxteT',
      description: 'Flips all characters in reverse order.',
    },
    faqs: [
      {
        question: 'Does it support emojis and multibyte characters?',
        answer: 'Yes, Unicode grapheme clusters are handled gracefully so emojis and accent marks do not get broken.',
      },
    ],
    relatedSlugs: ['sort-lines', 'uppercase', 'remove-extra-spaces'],
  },
  {
    slug: 'add-prefix-suffix',
    name: 'Add Prefix & Suffix',
    category: 'text',
    description: 'Append custom prefixes to the start and suffixes to the end of every line in your text.',
    shortDescription: 'Add text to the beginning or end of every line.',
    keywords: ['add prefix', 'add suffix', 'append to lines', 'prepend to lines', 'add prefix suffix online'],
    icon: 'BetweenHorizontalStart',
    howToSteps: [
      'Paste your lines of text.',
      'Specify the prefix (start of line) and suffix (end of line).',
      'The result updates live for quick copying.',
    ],
    examples: {
      input: 'apple\nbanana\norange',
      output: '<li>apple</li>\n<li>banana</li>\n<li>orange</li>',
      description: 'Wraps each line with HTML list item tags.',
    },
    faqs: [
      {
        question: 'Can I leave prefix or suffix empty?',
        answer: 'Yes! You can add only a prefix, only a suffix, or both.',
      },
    ],
    relatedSlugs: ['add-line-numbers', 'trim-lines', 'sort-lines'],
  },
  {
    slug: 'add-line-numbers',
    name: 'Add Line Numbers',
    category: 'text',
    description: 'Number each line of your text or code with customizable start numbers, padding, and separators.',
    shortDescription: 'Add or remove sequential line numbers to text.',
    keywords: ['add line numbers', 'number lines', 'line numbering tool', 'remove line numbers'],
    icon: 'ListOrdered',
    howToSteps: [
      'Paste your code or text.',
      'Choose whether to Add Line Numbers or Remove existing numbers.',
      'Configure separator format (e.g. "1. ", "1) ", or "001: ").',
    ],
    examples: {
      input: 'First step\nSecond step\nThird step',
      output: '1. First step\n2. Second step\n3. Third step',
      description: 'Prepends sequential numbering to each line.',
    },
    faqs: [
      {
        question: 'Can I remove line numbers copied from code samples?',
        answer: 'Yes, the Remove Numbers mode strips leading line numbers from code snippets automatically.',
      },
    ],
    relatedSlugs: ['add-prefix-suffix', 'line-counter', 'sort-lines'],
  },

  // --- COUNTER TOOLS ---
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'counter',
    description: 'Free online live word counter, character counter, sentence counter, and reading time estimator.',
    shortDescription: 'Count words, characters, sentences, and paragraphs in real time.',
    keywords: ['word counter', 'character count', 'count words online', 'character counter online', 'free word count'],
    popular: true,
    icon: 'FileText',
    howToSteps: [
      'Paste or type your draft into the editor box.',
      'Watch words, characters, sentences, paragraphs, and reading time update live.',
      'Check detailed statistics and character breakdown.',
    ],
    examples: {
      input: 'TextKit provides fast, privacy-first browser utilities for developers and creators worldwide.',
      output: '11 words · 86 characters · 1 sentence · 1 paragraph · 5 sec reading time',
      description: 'Calculates all text metrics in real time.',
    },
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer: 'Reading time is calculated using the industry standard average reading speed of 200 words per minute (WPM).',
      },
      {
        question: 'Is my text private?',
        answer: '100% private. Your text is processed inside your browser memory and never uploaded to any server.',
      },
    ],
    relatedSlugs: ['character-counter', 'text-statistics', 'reading-time', 'sentence-counter'],
  },
  {
    slug: 'character-counter',
    name: 'Character Counter',
    category: 'counter',
    description: 'Count total characters, characters without spaces, vowels, consonants, and track social media limits.',
    shortDescription: 'Count characters with and without spaces.',
    keywords: ['character counter', 'character count without spaces', 'letter count', 'twitter character counter'],
    popular: true,
    icon: 'Hash',
    howToSteps: [
      'Type or paste your text into the text area.',
      'View exact character counts with and without spaces.',
      'Check against limit bars for Twitter/X (280 chars), SMS (160 chars), and SEO Meta Descriptions (160 chars).',
    ],
    examples: {
      input: 'Boost your SEO with fast, clean content.',
      output: '41 characters (including spaces) · 35 characters (excluding spaces)',
      description: 'Counts letters, spaces, and compares against limits.',
    },
    faqs: [
      {
        question: 'What is the standard SEO meta description character limit?',
        answer: 'Search engines typically display between 150-160 characters on desktop and mobile snippets.',
      },
    ],
    relatedSlugs: ['word-counter', 'line-counter', 'text-statistics'],
  },
  {
    slug: 'sentence-counter',
    name: 'Sentence Counter',
    category: 'counter',
    description: 'Count the total number of sentences and calculate average words per sentence for readability assessment.',
    shortDescription: 'Count sentences and calculate average sentence length.',
    keywords: ['sentence counter', 'count sentences', 'average sentence length', 'sentence length checker'],
    icon: 'ListChecks',
    howToSteps: [
      'Enter your paragraphs or essays.',
      'View total sentences and average word length per sentence.',
      'Identify whether your sentences are concise or overly lengthy.',
    ],
    examples: {
      input: 'Welcome to TextKit. It is fast! Do you enjoy using it?',
      output: '3 sentences · 3.67 words per sentence average',
      description: 'Detects sentence boundaries from punctuation.',
    },
    faqs: [
      {
        question: 'How are sentences detected?',
        answer: 'Sentences are detected using terminal punctuation marks (periods, question marks, and exclamation points) followed by spaces or newlines.',
      },
    ],
    relatedSlugs: ['word-counter', 'paragraph-counter', 'reading-time'],
  },
  {
    slug: 'line-counter',
    name: 'Line Counter',
    category: 'counter',
    description: 'Count total lines, non-empty lines, and blank lines in your code, logs, or lists.',
    shortDescription: 'Count total lines, empty lines, and non-blank lines.',
    keywords: ['line counter', 'count lines', 'count lines of code', 'newline counter'],
    icon: 'AlignLeft',
    howToSteps: [
      'Paste your multiline content into the input box.',
      'See total line count, active lines with text, and blank line counts immediately.',
    ],
    examples: {
      input: 'Line one\n\nLine three\nLine four',
      output: '4 total lines · 3 non-empty lines · 1 blank line',
      description: 'Breaks down line metrics instantly.',
    },
    faqs: [
      {
        question: 'Can this be used to count lines of code (LOC)?',
        answer: 'Yes! It is great for counting lines in source code, CSV rows, or log files.',
      },
    ],
    relatedSlugs: ['remove-empty-lines', 'word-counter', 'add-line-numbers'],
  },
  {
    slug: 'paragraph-counter',
    name: 'Paragraph Counter',
    category: 'counter',
    description: 'Count distinct paragraphs and measure average paragraph length in words and sentences.',
    shortDescription: 'Count paragraphs and evaluate text structure.',
    keywords: ['paragraph counter', 'count paragraphs', 'paragraph analyzer', 'essay paragraph count'],
    icon: 'Pilcrow',
    howToSteps: [
      'Paste text containing multiple paragraphs separated by blank lines or line breaks.',
      'View total paragraphs and average words per paragraph.',
    ],
    examples: {
      input: 'First paragraph with some text.\n\nSecond paragraph providing further details.',
      output: '2 paragraphs · 5.5 words per paragraph',
      description: 'Analyzes paragraph structure.',
    },
    faqs: [
      {
        question: 'What defines a paragraph?',
        answer: 'A paragraph is defined as a block of text separated by one or more blank lines or carriage returns.',
      },
    ],
    relatedSlugs: ['sentence-counter', 'word-counter', 'reading-time'],
  },
  {
    slug: 'reading-time',
    name: 'Reading Time Calculator',
    category: 'counter',
    description: 'Calculate estimated reading time and speaking time for blog posts, speeches, presentations, and scripts.',
    shortDescription: 'Estimate reading and speaking duration for any text.',
    keywords: ['reading time calculator', 'speaking time calculator', 'estimate reading time', 'speech timer'],
    popular: true,
    icon: 'Clock',
    howToSteps: [
      'Paste your draft or speech transcript.',
      'Review estimated silent reading time (200 WPM) and speech speaking time (130 WPM).',
      'Adjust WPM sliders if you want a custom pacing calculation.',
    ],
    examples: {
      input: 'A 400-word article draft.',
      output: 'Silent Reading: ~2 min · Speaking: ~3 min',
      description: 'Calculates presentation and reading duration.',
    },
    faqs: [
      {
        question: 'What is the average reading speed?',
        answer: 'Most adults read silently at around 200 to 250 words per minute (WPM). Speeches are typically spoken at 130 to 150 WPM.',
      },
    ],
    relatedSlugs: ['word-counter', 'text-statistics', 'character-counter'],
  },
  {
    slug: 'text-statistics',
    name: 'Text Statistics & Keyword Density',
    category: 'counter',
    description: 'Comprehensive text analysis: word frequency, keyword density, syllables, reading ease score (Flesch-Kincaid), and vocabulary diversity.',
    shortDescription: 'In-depth text metrics, keyword density, and readability score.',
    keywords: ['text statistics', 'keyword density checker', 'readability score', 'flesch kincaid online', 'word frequency'],
    popular: true,
    icon: 'BarChart',
    howToSteps: [
      'Paste your article, essay, or copy into the editor.',
      'Explore the top keywords by frequency, unique word percentage, and readability level.',
      'Use insights to optimize your text for readability and SEO.',
    ],
    examples: {
      input: 'TextKit is fast. TextKit is free. Fast tools save time.',
      output: 'Top keywords: "TextKit" (2x), "fast" (2x) · 60% unique words · High Readability',
      description: 'Generates detailed keyword frequencies and readability metrics.',
    },
    faqs: [
      {
        question: 'What is keyword density?',
        answer: 'Keyword density is the percentage of times a keyword appears compared to the total number of words in the text.',
      },
    ],
    relatedSlugs: ['word-counter', 'reading-time', 'character-counter'],
  },

  // --- DEVELOPER TOOLS ---
  {
    slug: 'json-formatter',
    name: 'JSON Formatter & Beautifier',
    category: 'developer',
    description: 'Beautify, format, and indent JSON strings with 2 spaces, 4 spaces, or tabs. Displays exact line and column errors on syntax failure.',
    shortDescription: 'Prettify and format messy JSON with syntax highlighting.',
    keywords: ['json formatter', 'json beautifier', 'format json online', 'prettify json', 'json pretty print'],
    popular: true,
    icon: 'FileCode',
    howToSteps: [
      'Paste raw, unformatted, or minified JSON into the editor.',
      'Select indentation preference (2 spaces, 4 spaces, or tabs).',
      'Click "Format JSON" to beautify, or click "Minify" to compact.',
    ],
    examples: {
      input: '{"name":"TextKit","tags":["tools","text"],"active":true}',
      output: '{\n  "name": "TextKit",\n  "tags": [\n    "tools",\n    "text"\n  ],\n  "active": true\n}',
      description: 'Formats compact JSON with clean indentation.',
    },
    faqs: [
      {
        question: 'What happens if the JSON is invalid?',
        answer: 'The tool shows the exact line and column where the error occurred, with helpful hints to fix missing quotes or commas.',
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes! Formatting is executed 100% locally via browser JavaScript. Your sensitive API payloads are never sent to a server.',
      },
    ],
    relatedSlugs: ['json-validator', 'json-minifier', 'base64-encoder', 'url-encoder'],
  },
  {
    slug: 'json-validator',
    name: 'JSON Validator',
    category: 'developer',
    description: 'Validate JSON syntax and detect syntax errors with line numbers, column positions, and descriptive explanations.',
    shortDescription: 'Validate JSON and find syntax errors with line/column coordinates.',
    keywords: ['json validator', 'validate json online', 'json syntax checker', 'check valid json'],
    popular: true,
    icon: 'CheckCircle2',
    howToSteps: [
      'Paste JSON into the input box.',
      'The validator immediately checks syntax and parses the structure.',
      'Get a clear "Valid JSON" confirmation or exact error location to fix.',
    ],
    examples: {
      input: '{\n  "name": "TextKit",\n  "version": 1,\n}',
      output: 'Invalid JSON: Trailing comma at line 3, column 15',
      description: 'Pins down exact syntax bugs such as trailing commas.',
    },
    faqs: [
      {
        question: 'Does it support trailing commas?',
        answer: 'Standard JSON specification (RFC 8259) forbids trailing commas. The validator will flag them and offer an auto-clean option.',
      },
    ],
    relatedSlugs: ['json-formatter', 'json-minifier', 'base64-decoder'],
  },
  {
    slug: 'json-minifier',
    name: 'JSON Minifier',
    category: 'developer',
    description: 'Compress and minify JSON by stripping all indentation, newlines, and whitespace to reduce file size and bandwidth.',
    shortDescription: 'Compress JSON by removing whitespace and line breaks.',
    keywords: ['json minifier', 'minify json', 'compress json', 'json compact'],
    icon: 'Minimize2',
    howToSteps: [
      'Paste formatted or multiline JSON into the input.',
      'Click Minify to collapse the payload into a single dense line.',
      'Copy the minified JSON string.',
    ],
    examples: {
      input: '{\n  "status": "ok",\n  "code": 200\n}',
      output: '{"status":"ok","code":200}',
      description: 'Strips spaces and newlines.',
    },
    faqs: [
      {
        question: 'Does minifying JSON change its data or values?',
        answer: 'No, minifying only removes superfluous formatting whitespace outside of string values.',
      },
    ],
    relatedSlugs: ['json-formatter', 'json-validator', 'url-encoder'],
  },
  {
    slug: 'base64-encoder',
    name: 'Base64 Encoder',
    category: 'developer',
    description: 'Encode plain text and Unicode strings into Base64 format. Full UTF-8 support for accented characters and international alphabets.',
    shortDescription: 'Encode plain text and UTF-8 strings into Base64.',
    keywords: ['base64 encoder', 'base64 encode online', 'text to base64', 'utf8 base64'],
    popular: true,
    icon: 'Key',
    howToSteps: [
      'Type or paste text into the input area.',
      'The text is encoded into Base64 representation instantly.',
      'Copy the Base64 output string.',
    ],
    examples: {
      input: 'TextKit - Tools for developers',
      output: 'VGV4dEtpdCAtIFRvb2xzIGZvciBkZXZlbG9wZXJz',
      description: 'Encodes text string into Base64.',
    },
    faqs: [
      {
        question: 'Does it support non-ASCII and Vietnamese characters?',
        answer: 'Yes! Unlike standard btoa which crashes on UTF-8, our encoder handles all Unicode characters seamlessly.',
      },
    ],
    relatedSlugs: ['base64-decoder', 'url-encoder', 'json-formatter'],
  },
  {
    slug: 'base64-decoder',
    name: 'Base64 Decoder',
    category: 'developer',
    description: 'Decode Base64 encoded strings back into readable UTF-8 plain text with error checking for malformed input.',
    shortDescription: 'Decode Base64 strings back to readable plain text.',
    keywords: ['base64 decoder', 'base64 decode online', 'base64 to text', 'decode base64 string'],
    popular: true,
    icon: 'Unlock',
    howToSteps: [
      'Paste your Base64 encoded string into the input area.',
      'The decoder translates it back into UTF-8 human-readable text.',
      'Copy the decoded text.',
    ],
    examples: {
      input: 'VGV4dEtpdCAtIFRvb2xzIGZvciBkZXZlbG9wZXJz',
      output: 'TextKit - Tools for developers',
      description: 'Restores the original string from Base64.',
    },
    faqs: [
      {
        question: 'What if my Base64 string is padded or URL-safe?',
        answer: 'The decoder automatically handles standard (+/) and URL-safe (-_) Base64 variants and missing padding.',
      },
    ],
    relatedSlugs: ['base64-encoder', 'url-decoder', 'json-formatter'],
  },
  {
    slug: 'url-encoder',
    name: 'URL Encoder',
    category: 'developer',
    description: 'Encode characters in URLs or query string parameters into percent-encoded (%XX) format according to RFC 3986.',
    shortDescription: 'Percent-encode URLs and query string parameters.',
    keywords: ['url encoder', 'encode url online', 'percent encoding', 'url encode query string', 'encodeURIComponent'],
    popular: true,
    icon: 'Link2',
    howToSteps: [
      'Enter raw text or a URL parameter string.',
      'Choose between encodeURIComponent (strict param encoding) or encodeURI (full URL encoding).',
      'Copy the percent-encoded URL string.',
    ],
    examples: {
      input: 'https://textkit.dev/search?q=free tools & utilities',
      output: 'https%3A%2F%2Ftextkit.dev%2Fsearch%3Fq%3Dfree%20tools%20%26%20utilities',
      description: 'Encodes special symbols and spaces into percent codes.',
    },
    faqs: [
      {
        question: 'When should I use encodeURIComponent vs encodeURI?',
        answer: 'Use encodeURIComponent when encoding parameter values inside a query string. Use encodeURI when encoding a complete valid URL.',
      },
    ],
    relatedSlugs: ['url-decoder', 'base64-encoder', 'json-formatter'],
  },
  {
    slug: 'url-decoder',
    name: 'URL Decoder',
    category: 'developer',
    description: 'Decode percent-encoded (%XX) characters in URLs and query strings back into original readable characters.',
    shortDescription: 'Decode percent-encoded URLs back to readable text.',
    keywords: ['url decoder', 'decode url online', 'percent decoding', 'decodeURIComponent', 'unescape url'],
    icon: 'Unlink',
    howToSteps: [
      'Paste your percent-encoded URL string.',
      'The decoder replaces %XX sequences and + with their original characters.',
      'Copy the clean, decoded URL or parameter string.',
    ],
    examples: {
      input: 'https%3A%2F%2Ftextkit.dev%2Fsearch%3Fq%3Dfree%20tools',
      output: 'https://textkit.dev/search?q=free tools',
      description: 'Restores encoded symbols and spaces back to normal text.',
    },
    faqs: [
      {
        question: 'Does it support + as a space character?',
        answer: 'Yes, query string decoders routinely convert plus signs (+) to spaces when specified.',
      },
    ],
    relatedSlugs: ['url-encoder', 'base64-decoder', 'json-formatter'],
  },

  // --- GENERATORS ---
  {
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    category: 'generators',
    description: 'Generate secure Version 4 (v4) UUIDs (Universally Unique Identifiers) single or in batch with custom formatting.',
    shortDescription: 'Generate secure random UUID / GUID v4 identifiers.',
    keywords: ['uuid generator', 'guid generator', 'random uuid', 'uuid v4 online', 'generate uuid batch'],
    popular: true,
    icon: 'Fingerprint',
    howToSteps: [
      'Choose the number of UUIDs to generate (1 to 100).',
      'Select uppercase or lowercase, and whether to include hyphens.',
      'Click "Generate UUIDs", then copy all or download as a text file.',
    ],
    examples: {
      input: 'Generate 1 UUID v4',
      output: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      description: 'RFC 4122 compliant version 4 random UUID.',
    },
    faqs: [
      {
        question: 'Are these UUIDs cryptographically secure?',
        answer: 'Yes! We use the browser crypto.randomUUID() and crypto.getRandomValues() APIs for true cryptographic randomness.',
      },
      {
        question: 'What is the difference between UUID and GUID?',
        answer: 'GUID is Microsoft’s term for UUID. They are mathematically and structurally equivalent for version 4.',
      },
    ],
    relatedSlugs: ['random-string', 'random-number', 'random-choice'],
  },
  {
    slug: 'random-string',
    name: 'Random String Generator',
    category: 'generators',
    description: 'Generate cryptographically random strings, tokens, passwords, and alphanumeric keys with custom character sets and length.',
    shortDescription: 'Generate secure random strings, passwords, and tokens.',
    keywords: ['random string generator', 'password generator', 'random token generator', 'generate random characters'],
    popular: true,
    icon: 'Dices',
    howToSteps: [
      'Select the desired string length (e.g. 16, 32, 64 characters).',
      'Toggle character sets: Uppercase (A-Z), Lowercase (a-z), Numbers (0-9), Symbols (!@#$).',
      'Choose batch quantity and generate instant secure strings.',
    ],
    examples: {
      input: 'Length: 16 | Sets: Lower, Upper, Numbers',
      output: 'k9Xw2M7pQ4vB8yR1',
      description: 'Generates secure high-entropy random strings.',
    },
    faqs: [
      {
        question: 'Can I use this for secure API keys and passwords?',
        answer: 'Yes, strings are generated using window.crypto.getRandomValues for cryptographically secure pseudo-random number generation.',
      },
    ],
    relatedSlugs: ['uuid-generator', 'random-number', 'random-choice'],
  },
  {
    slug: 'random-number',
    name: 'Random Number Generator',
    category: 'generators',
    description: 'Generate truly random numbers within any range [min, max] with options for quantity, duplicates, and sorting.',
    shortDescription: 'Generate random numbers within any custom range.',
    keywords: ['random number generator', 'rng online', 'pick a random number', 'random integers', 'lottery number generator'],
    popular: true,
    icon: 'Shuffle',
    howToSteps: [
      'Set minimum and maximum integer values (e.g. 1 to 100).',
      'Specify how many numbers you need (quantity).',
      'Toggle allow duplicates and sort order if desired, then click "Generate".',
    ],
    examples: {
      input: 'Range: 1 to 50 | Quantity: 5 | Unique: Yes',
      output: '7, 14, 23, 38, 49',
      description: 'Generates unique random numbers in selected range.',
    },
    faqs: [
      {
        question: 'Can I generate negative numbers or decimals?',
        answer: 'You can set negative minimums (e.g. -50 to 50) and generate both integers and floating-point numbers.',
      },
    ],
    relatedSlugs: ['random-choice', 'random-string', 'uuid-generator'],
  },
  {
    slug: 'random-choice',
    name: 'Random Choice Picker',
    category: 'generators',
    description: 'Pick random items, names, or winners from a list with options for single winner, multi-picks, and no-repeats.',
    shortDescription: 'Random name picker and choice selector from any list.',
    keywords: ['random choice picker', 'random name picker', 'wheel of names', 'pick random winner', 'decision maker'],
    popular: true,
    icon: 'Award',
    howToSteps: [
      'Enter or paste a list of options (one per line).',
      'Select how many choices to pick (e.g. 1 winner or top 3 winners).',
      'Click "Pick Random Choice" for an instant, fair selection.',
    ],
    examples: {
      input: 'Alice\nBob\nCharlie\nDiana\nEvan',
      output: 'Selected Winner: Charlie',
      description: 'Picks an unbiased random winner from your list.',
    },
    faqs: [
      {
        question: 'Is the selection process fair and unbiased?',
        answer: 'Yes! It utilizes cryptographic randomness via crypto.getRandomValues to guarantee fair and unbiased selection.',
      },
    ],
    relatedSlugs: ['random-number', 'random-string', 'sort-lines'],
  },
]

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug)
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === category)
}

export function getPopularTools(): ToolDefinition[] {
  return TOOLS.filter((t) => t.popular)
}

export function searchTools(query: string): ToolDefinition[] {
  const q = query.trim().toLowerCase()
  if (!q) return TOOLS

  return TOOLS.filter((tool) => {
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q)) ||
      tool.category.toLowerCase().includes(q)
    )
  })
}
