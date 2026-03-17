'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github.css'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg max-w-none p-8 prose-headings:font-bold prose-headings:text-brand-turquoise prose-h1:text-3xl prose-h1:border-b prose-h1:pb-4 prose-h1:mb-6 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-brand-turquoise prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-blockquote:border-l-brand-coral prose-blockquote:bg-brand-cream/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-brand-coral prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-hr:border-brand-turquoise/20 prose-hr:my-8 prose-table:overflow-hidden prose-table:rounded-lg prose-th:bg-brand-turquoise prose-th:text-white prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2 prose-img:rounded-xl prose-img:shadow-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-brand-turquoise border-b border-gray-200 pb-4 mb-6">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-brand-turquoise mt-8 mb-4 flex items-center gap-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-brand-turquoise mt-6 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-bold text-brand-turquoise mt-4 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-4 space-y-1 text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-4 space-y-1 text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-coral bg-brand-cream/50 py-2 px-4 my-4 rounded-r-lg italic">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match
            if (isInline) {
              return (
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-brand-coral text-sm" {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-brand-turquoise hover:underline font-medium">
              {children}
            </a>
          ),
          hr: () => (
            <hr className="border-t border-brand-turquoise/20 my-8" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => {
            const index = props['data-index']
            return (
              <th className={`bg-brand-turquoise text-white px-4 py-2 text-left font-bold whitespace-nowrap ${index === 0 ? 'min-w-[200px]' : ''}`}>
                {children}
              </th>
            )
          },
          td: ({ children, ...props }) => {
            const index = props['data-index']
            return (
              <td className={`border border-gray-200 px-4 py-2 align-top ${index === 0 ? 'min-w-[200px] font-semibold' : ''}`}>
                {children}
              </td>
            )
          },
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="rounded-xl shadow-lg my-4 max-w-full" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
