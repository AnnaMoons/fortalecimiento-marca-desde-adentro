'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Document {
  slug: string
  title: string
  date?: string
}

interface SubCategory {
  name: string
  docs: Document[]
}

interface Category {
  name: string
  icon: string
  color: string
  description: string
  subcategories?: SubCategory[]
  docs?: Document[]
}

const docIcons: Record<string, string> = {
  'Valentina': '👩‍💻',
  'Carolina': '💼',
  'Andrea': '🧠',
  'Maria-Jose': '👩‍👧‍👦',
  'Felipe': '👨‍💻',
  'Camila': '🎁',
  'Patricia': '🧑‍⚕️',
  'Explora tu Marca': '🔭',
  'Diversifica tus Ideas': '💡',
  'Diversifica tus Objetivos': '📊',
  'Diversifica tus Ingresos': '💰',
  'Crea tu Plan': '📅',
  'Dog Matrix': '🐕',
  'Feel Map': '💭',
  'Brand Desire Canvas': '🎯',
  'Attitudinal Journey': '🗺️',
  'Brand Ego': '🪞',
  'MaxPyramid': '📐',
  'Brand Territory': '🏔️',
  'ABC Roll Axis': '⚖️',
  'Revolution Matrix': '🔄',
  'The 5 Friends': '🤝',
  'Tools Driver': '🛠️',
  'ADN Tool': '🧬',
  'Los 5 Qués': '❓',
  'Core Value': '💎',
  'Brand Positioning': '🎯',
  'Propósito': '🎯',
  'Brand Values': '💙',
  'Tools Drive': '🚀',
  'Identidad': '🪪',
  'Brand Symbol': '🏷️',
  'Charisma': '✨',
  'Tone of Voice': '🗣️',
  'Naming': '📝',
  'Full Brand Board': '📋',
  'Sense Square': '⬜',
  'Why We': '❓',
  'Brand Narratives': '📖',
  'Brand Rituals': '🔄',
  'Golden Moments': '⭐',
  'Burn Pyramid': '🔥',
  'Brand Power': '⚡',
  'Devotion Journey': '❤️',
  'Ejercicios': '💪',
  'Personalidad': '👤',
  'Consolidado': '📊',
  'Carta de': '✉️',
  'Reconocimiento': '🔍',
  'Brújula': '🧭',
  'Lista Negra': '🚫',
  'Mapa de Fugas': '💨',
  'Canvas': '🎨',
  'Dolor': '😔',
  'Brand Building': '🏗️',
  'Rey': '👑',
  'Explora': '🔭',
  'Diversifica': '📈',
  'Crea tu Plan': '📅',
}

function getDocIcon(slug: string, title: string): string {
  const lowerSlug = slug.toLowerCase()
  const lowerTitle = title.toLowerCase()
  
  for (const [key, icon] of Object.entries(docIcons)) {
    if (lowerSlug.includes(key.toLowerCase()) || lowerTitle.includes(key.toLowerCase())) {
      return icon
    }
  }
  
  return '📄'
}

export default function CollapsibleCategories({ categories }: { categories: Category[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'Mastery Tools': true,
    'Strategy Blocks': false,
    'Vision': false,
    'Personalidad de Marca': false,
    'User Personas': false,
  })

  const [subExpanded, setSubExpanded] = useState<Record<string, boolean>>({})

  const toggle = (name: string) => {
    setExpanded(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const toggleSub = (name: string) => {
    setSubExpanded(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const sortedCategories = [...categories].sort((a, b) => {
    const order = ['Mastery Tools', 'Strategy Blocks', 'Vision', 'Personalidad de Marca', 'User Personas']
    return order.indexOf(a.name) - order.indexOf(b.name)
  })

  return (
    <div className="space-y-4">
      {sortedCategories.map((category) => (
        <div key={category.name} className="bg-white rounded-2xl shadow-md overflow-hidden">
          <button
            onClick={() => toggle(category.name)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${category.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                {category.icon}
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
                <p className="text-sm text-gray-500">
                  {category.subcategories 
                    ? `${category.subcategories.reduce((acc, sub) => acc + sub.docs.length, 0)} documentos`
                    : `${category.docs?.length || 0} documentos`
                  }
                </p>
              </div>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expanded[category.name] ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expanded[category.name] && (
            <div className="border-t border-gray-100 p-4">
              {category.subcategories ? (
                <div className="space-y-3">
                  {category.subcategories.map((sub) => (
                    <div key={sub.name} className="bg-gray-50 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSub(sub.name)}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-semibold text-gray-700">{sub.name}</span>
                        <svg 
                          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${subExpanded[sub.name] ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {subExpanded[sub.name] && (
                        <div className="p-3 pt-0 grid gap-2">
                          {sub.docs.map((doc) => (
                            <Link
                              key={doc.slug}
                              href={`/docs/${doc.slug}`}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors group"
                            >
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 text-lg group-hover:bg-brand-turquoise/10 transition-colors">
                                {getDocIcon(doc.slug, doc.title)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-700 group-hover:text-brand-turquoise transition-colors truncate text-sm">
                                  {doc.title}
                                </h3>
                              </div>
                              <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-turquoise transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {category.docs?.map((doc) => (
                      <Link
                        key={doc.slug}
                        href={`/docs/${doc.slug}`}
                        className="flex items-center gap-3 p-4 rounded-xl hover:bg-brand-cream transition-colors group"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-lg group-hover:bg-brand-turquoise/10 transition-colors">
                          {getDocIcon(doc.slug, doc.title)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-700 group-hover:text-brand-turquoise transition-colors truncate text-sm">
                            {doc.title}
                          </h3>
                          {doc.date && (
                            <p className="text-xs text-gray-400">{doc.date}</p>
                          )}
                        </div>
                        <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-turquoise transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
