import { ReactNode } from 'react'

interface TerminalProps {
  children?: ReactNode;
  className?: string;
}

export const Terminal = ({ children, className = '' }: TerminalProps) => {
  return (
    <div className={`bg-[#1a1a1a] rounded-lg p-4 shadow-lg ${className}`}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-sm font-semibold">Terminal</h2>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="bg-[#121212] rounded p-3 max-h-32 overflow-auto">
          <div className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
