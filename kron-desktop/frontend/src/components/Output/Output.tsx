import { ReactNode } from 'react'

interface OutputProps {
  children?: ReactNode;
  className?: string;
}

export const Output = ({ children, className = '' }: OutputProps) => {
  return (
    <div className={`bg-[#1a1a1a] rounded-lg p-6 shadow-lg h-full ${className}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-semibold">Output</h2>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
