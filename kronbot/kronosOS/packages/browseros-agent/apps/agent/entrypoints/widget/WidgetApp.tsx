import { useState, useEffect } from 'react'
import { Chat } from '../injected-ui/index/Chat'
import { cn } from '@/lib/utils'
import { X, Maximize2, Minus } from 'lucide-react'

export const WidgetApp = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isBooting, setIsBooting] = useState(false)

  // Listen for external toggle commands
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'TOGGLE_EXPAND') {
        toggleExpand()
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isExpanded]) // Depend on isExpanded to toggle correctly

  const toggleExpand = () => {
    if (!isExpanded) {
      // Expanding: Play boot animation
      setIsBooting(true)
      setIsExpanded(true)
      // Notify content script immediately to resize iframe
      window.parent.postMessage({ 
        type: 'KRONOS_WIDGET_RESIZE', 
        expanded: true 
      }, '*')
      
      // Stop boot animation after delay
      setTimeout(() => setIsBooting(false), 800)
    } else {
      // Collapsing
      setIsExpanded(false)
      window.parent.postMessage({ 
        type: 'KRONOS_WIDGET_RESIZE', 
        expanded: false 
      }, '*')
    }
  }

  return (
    <div className={cn(
      "flex flex-col h-full w-full transition-all duration-500 overflow-hidden",
      isExpanded ? "rounded-xl" : "items-start justify-end p-2"
    )}>
      {isExpanded ? (
        // Expanded State: "Computer Window" Interface
        <div className={cn(
          "flex flex-col h-full w-full bg-background/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden relative",
          isBooting ? "animate-in zoom-in-95 duration-500" : ""
        )}>
          
          {/* CRT Turn-on Overlay Effect */}
          {isBooting && (
            <div className="absolute inset-0 z-50 bg-white mix-blend-overlay animate-[ping_0.3s_ease-out]" />
          )}

          {/* Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-muted/80 to-muted/40 border-b border-border/40 drag-handle cursor-default select-none">
            <div className="flex items-center gap-2">
               <div className="flex gap-1.5">
                 <button onClick={toggleExpand} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-sm" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
                 <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
               </div>
               <span className="ml-2 font-mono text-xs font-medium opacity-70">Kronos OS v1.0</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span>ONLINE</span>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden relative bg-black/5">
             <Chat />
          </div>
        </div>
      ) : (
        // Collapsed State: Launcher Icon (Floats with a subtle hover effect)
        <button
          onClick={toggleExpand}
          className="group relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--kronos-primary)] to-[var(--kronos-secondary)] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-[var(--kronos-accent)] blur-lg opacity-40 group-hover:opacity-70 transition-opacity" />
          
          <img 
            src="/icon/128.png" 
            className="w-10 h-10 drop-shadow-md z-10"
            alt="Open Kronos" 
          />
          
          {/* Notification Dot */}
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-background animate-pulse z-20" />
        </button>
      )}
    </div>
  )
}