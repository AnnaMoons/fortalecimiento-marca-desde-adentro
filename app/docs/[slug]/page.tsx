import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMarkdownBySlug, getAllMarkdownSlugs } from '@/lib/markdown'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllMarkdownSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const doc = getMarkdownBySlug(slug)
  
  if (!doc) {
    return { title: 'Documento no encontrado' }
  }

  return {
    title: `${doc.title} | Documentación`,
  }
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const doc = getMarkdownBySlug(slug)

  if (!doc) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-brand-cream py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-turquoise hover:text-brand-turquoise-light transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al índice
          </Link>
        </nav>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <MarkdownRenderer content={doc.content} />
        </article>
      </div>
    </main>
  )
}
