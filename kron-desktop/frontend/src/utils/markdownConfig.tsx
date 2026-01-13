import { Components } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CodeProps, ComponentPropsWithNode } from '../types/chat.types'

export const markdownComponents: Components = {
    ul: ({children, ...props}: ComponentPropsWithNode) => (
        <ul className="list-disc list-inside space-y-1 mb-4 pl-4" {...props}>
            {children}
        </ul>
    ),
    ol: ({children, ...props}: ComponentPropsWithNode) => (
        <ol className="list-decimal list-inside space-y-1 mb-4 pl-4" {...props}>
            {children}
        </ol>
    ),
    p: ({children, ...props}: ComponentPropsWithNode) => (
        <p className="last:mb-0 leading-7" {...props}>{children}</p>
      ),
    strong:  ({children, ...props}: ComponentPropsWithNode) => (
        <span {...props}>{children}</span>
      ),
    code: ({inline, className, children, ...props}: CodeProps) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''
      
      return !inline && language ? (
        <div className="rounded-lg overflow-hidden mb-4 shadow-lg">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 uppercase tracking-wide font-semibold">
            {language}
          </div>
          <SyntaxHighlighter
            language={language}
            style={dracula}
            customStyle={{
              margin: 0,
              padding: '1rem',
              backgroundColor: '#282a36',
              borderRadius: '0 0 0.5rem 0.5rem',
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code 
          className="bg-gray-800 text-pink-400 rounded px-1.5 py-0.5 text-sm font-mono" 
          {...props}
        >
          {children}
        </code>
      )
    },
    pre: ({children, ...props}: ComponentPropsWithNode) => (
      <pre className="bg-transparent p-0 m-0" {...props}>{children}</pre>
    ),
    h1: ({children, ...props}: ComponentPropsWithNode) => (
      <h1 className="text-lg font-medium leading-tight mb-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({children, ...props}: ComponentPropsWithNode) => (
      <h2 className="text-base font-medium my-2 leading-tight" {...props}>
        {children}
      </h2>
    ),
    h3: ({children, ...props}: ComponentPropsWithNode) => (
      <h3 className="text-base font-medium my-2 leading-tight" {...props}>
        {children}
      </h3>
    ),
    blockquote: ({children, ...props}: ComponentPropsWithNode) => (
      <blockquote 
        className="border-l-4 border-blue-500 bg-gray-800/50 rounded-r-lg p-4 mb-4 text-gray-300 shadow-lg"
        {...props}
      >
        <div className="italic">{children}</div>
      </blockquote>
    ),
    table: ({children, ...props}: ComponentPropsWithNode) => (
      <div className="overflow-x-auto mb-4 rounded-lg border border-gray-700 shadow-lg">
        <table className="min-w-full divide-y divide-gray-700 overflow-hidden" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({children, ...props}: ComponentPropsWithNode) => (
      <th 
        className="bg-gray-800 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-700" 
        {...props}
      >
        {children}
      </th>
    ),
    td: ({children, ...props}: ComponentPropsWithNode) => (
      <td 
        className="px-6 py-4 text-sm text-gray-300 border-b border-gray-700 bg-gray-800/30" 
        {...props}
      >
        {children}
      </td>
    ),
    a: ({children, href, ...props}: ComponentPropsWithNode & { href?: string }) => (
      <a 
        className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200" 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    hr: ({...props}: ComponentPropsWithNode) => (
      <hr className="my-6 border-gray-700" {...props} />
    ),
    img: ({alt, ...props}: ComponentPropsWithNode & { alt?: string }) => (
      <div className="mb-4">
        <img 
          className="max-w-full h-auto rounded-lg shadow-lg" 
          alt={alt || ''} 
          {...props} 
        />
        {alt && <p className="mt-2 text-sm text-gray-400 text-center">{alt}</p>}
      </div>
    ),
  }
