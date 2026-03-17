import { getAllMarkdownDocuments } from '@/lib/markdown'
import CollapsibleCategories from '@/components/CollapsibleCategories'

function extractNumber(slug: string): number {
  const match = slug.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 999
}

function sortByNumber(docs: typeof allDocuments) {
  return [...docs].sort((a, b) => extractNumber(a.slug) - extractNumber(b.slug))
}

export default function HomePage() {
  const allDocuments = getAllMarkdownDocuments()

  const userPersonasDocs = allDocuments.filter(d => d.slug.includes('USER-PERSONA'))

  const categories = [
    {
      name: 'Mastery Tools',
      icon: '🧠',
      color: 'bg-brand-pink',
      description: 'Herramientas de maestría de marca',
      docs: sortByNumber(allDocuments.filter(d => d.slug.startsWith('MT')))
    },
    {
      name: 'Strategy Blocks',
      icon: '🎯',
      color: 'bg-brand-coral',
      description: 'Bloques estratégicos para implementación',
      docs: sortByNumber(allDocuments.filter(d => d.slug.startsWith('SB')))
    },
    {
      name: 'Vision',
      icon: '🚀',
      color: 'bg-brand-yellow',
      description: 'Visión y planificación a largo plazo',
      docs: sortByNumber(allDocuments.filter(d => d.slug.startsWith('VN')))
    },
    {
      name: 'Personalidad de Marca',
      icon: '✨',
      color: 'bg-purple-500',
      description: 'Definición de personalidad y arquetipos',
      docs: allDocuments.filter(d => d.slug.includes('PERSONALIDAD'))
    },
    {
      name: 'User Personas',
      icon: '👥',
      color: 'bg-emerald-500',
      description: 'Perfiles de usuarias objetivo',
      subcategories: [
        {
          name: '👨‍👩‍👧‍👦 Padres y Madres',
          docs: userPersonasDocs.filter(d => 
            d.slug.includes('Valentina') || 
            d.slug.includes('Carolina') || 
            d.slug.includes('Andrea') || 
            d.slug.includes('Maria-Jose') || 
            d.slug.includes('Felipe')
          )
        },
        {
          name: '🎁 Amigos y Familia',
          docs: userPersonasDocs.filter(d => d.slug.includes('Camila'))
        },
        {
          name: '🧑‍⚕️ Psicólogos y Educadores',
          docs: userPersonasDocs.filter(d => d.slug.includes('Patricia'))
        }
      ]
    }
  ]

  const visibleCategories = categories.filter(c => 
    c.docs?.length ? c.docs.length > 0 : 
    c.subcategories?.length ? c.subcategories.reduce((acc, s) => acc + s.docs.length, 0) > 0 : false
  )
  
  const totalDocs = visibleCategories.reduce((acc, c) => 
    acc + (c.docs?.length || c.subcategories?.reduce((a, s) => a + s.docs.length, 0) || 0), 0
  )

  return (
    <main className="min-h-screen bg-brand-cream py-12">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-turquoise mb-4">
            Documentación Desde Adentro
          </h1>
          <p className="text-lg text-gray-600">
            Análisis de marca y herramientas estratégicas
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {totalDocs} documentos disponibles
          </p>
        </header>

        <CollapsibleCategories categories={visibleCategories} />
      </div>
    </main>
  )
}
