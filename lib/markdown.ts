import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content')

export interface MarkdownDocument {
  slug: string
  title: string
  date?: string
  content: string
}

export function getAllMarkdownSlugs(): string[] {
  try {
    const files = fs.readdirSync(contentDirectory)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''))
  } catch {
    return []
  }
}

export function getMarkdownBySlug(slug: string): MarkdownDocument | null {
  try {
    const filePath = path.join(contentDirectory, `${slug}.md`)
    const content = fs.readFileSync(filePath, 'utf8')
    
    const titleMatch = content.match(/^#\s+(.+)$/m)
    let title = titleMatch ? titleMatch[1] : slug
    title = title.replace(/\s*-\s*Desde Adentro$/i, '').trim()
    
    const dateMatch = content.match(/\*\*Fecha:\*\*\s*(.+)$/m)
    const date = dateMatch ? dateMatch[1].trim() : undefined
    
    return {
      slug,
      title,
      date,
      content,
    }
  } catch {
    return null
  }
}

export function getAllMarkdownDocuments(): MarkdownDocument[] {
  const slugs = getAllMarkdownSlugs()
  return slugs
    .map(slug => getMarkdownBySlug(slug))
    .filter((doc): doc is MarkdownDocument => doc !== null)
}
