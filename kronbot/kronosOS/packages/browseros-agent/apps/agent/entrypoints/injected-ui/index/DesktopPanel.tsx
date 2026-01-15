import { useState, useCallback, useRef, useEffect } from 'react'
import {
  ChevronDown,
  ChevronUp,
  X,
  Monitor,
  Power,
  RefreshCw,
  Camera,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { callMcpTool } from '@/lib/mcp/client'

interface DesktopPanelProps {
  isOpen: boolean
  onClose: () => void
  defaultHeight?: number
  minHeight?: number
  maxHeight?: number
  // URL to the MCP server
  mcpUrl?: string
}

export const DesktopPanel: React.FC<DesktopPanelProps> = ({
  isOpen,
  onClose,
  defaultHeight = 400,
  minHeight = 150,
  maxHeight = 600,
  mcpUrl = 'http://localhost:9990/mcp',
}) => {
  const [height, setHeight] = useState(defaultHeight)
  const [isResizing, setIsResizing] = useState(false)
  
  // Power/Connection State
  const [powerState, setPowerState] = useState<'off' | 'booting' | 'on' | 'error'>('off')
  const [errorMsg, setErrorMsg] = useState<string>('')
  
  // Screenshot Data
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef<number>(0)
  const startHeightRef = useRef<number>(0)

  // -- Boot Sequence / Connect --
  const handlePowerOn = useCallback(async () => {
    if (powerState === 'on' || powerState === 'booting') return

    setPowerState('booting')
    setErrorMsg('')

    // Simulate boot delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      // Fetch initial screenshot to verify connection
      await fetchScreenshot()
      setPowerState('on')
    } catch (err) {
      console.error('Failed to connect/fetch screenshot:', err)
      setPowerState('error')
      setErrorMsg('Failed to connect to Desktop MCP')
    }
  }, [mcpUrl])

  const handlePowerOff = useCallback(() => {
    setPowerState('off')
    setScreenshot(null)
    setErrorMsg('')
  }, [])

  // -- Fetch Screenshot via MCP --
  const fetchScreenshot = useCallback(async () => {
    setIsLoading(true)
    try {
      // Call the 'computer_screenshot' tool
      // Expecting standard MCP tool response: content: [{ type: 'image', data: 'base64...' }]
      const result = await callMcpTool(mcpUrl, 'computer_screenshot', {}) as any
      
      // Parse result
      if (result && result.content && Array.isArray(result.content)) {
        const imageContent = result.content.find((c: any) => c.type === 'image')
        if (imageContent && imageContent.data) {
          // Construct data URL if it's raw base64
          // Standard MCP image content is base64 string
          const mimeType = imageContent.mimeType || 'image/png'
          setScreenshot(`data:${mimeType};base64,${imageContent.data}`)
        }
      }
    } catch (err) {
      console.error('Screenshot failed:', err)
      throw err 
    } finally {
      setIsLoading(false)
    }
  }, [mcpUrl])

  // -- Resize Logic --
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true)
    startYRef.current = e.clientY
    startHeightRef.current = height
    e.preventDefault()
  }, [height])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return
      const deltaY = e.clientY - startYRef.current
      const newHeight = startHeightRef.current + deltaY
      setHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)))
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, minHeight, maxHeight])

  const toggleHeight = useCallback(() => {
    setHeight((prev) => (prev < maxHeight ? maxHeight : minHeight))
  }, [minHeight, maxHeight])

  if (!isOpen) return null

  return (
    <div
      ref={containerRef}
      className="bg-background flex flex-col shadow-2xl z-50 h-full w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-border/40 border-b px-3 py-2 shrink-0 bg-muted/30">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-[var(--accent-kronos)]" />
          <span className="text-sm font-medium">Remote Desktop</span>
          
          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 ml-2">
            <div className={cn(
              "w-2 h-2 rounded-full transition-colors duration-500",
              powerState === 'off' && "bg-muted-foreground/30",
              powerState === 'booting' && "bg-yellow-500 animate-pulse",
              powerState === 'on' && "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]",
              powerState === 'error' && "bg-red-500",
            )} />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
              {powerState === 'on' ? 'ONLINE' : powerState.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {powerState === 'on' && (
            <button
              onClick={() => fetchScreenshot()}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              title="Take Screenshot"
              disabled={isLoading}
            >
              <Camera className={cn("h-4 w-4", isLoading && "animate-pulse")} />
            </button>
          )}
          
          <button
            onClick={powerState === 'on' ? handlePowerOff : handlePowerOn}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              powerState === 'on' 
                ? "text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            title={powerState === 'on' ? "Disconnect" : "Connect"}
          >
            <Power className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 bg-black/90 overflow-hidden flex items-center justify-center">
        
        {/* State: OFF */}
        {powerState === 'off' && (
          <div className="flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center mb-4 border border-white/5">
              <Power className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-foreground font-medium mb-2">Desktop Disconnected</h3>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Connect to the Kronos Desktop MCP server to view and control the remote environment.
            </p>
            <button
              onClick={handlePowerOn}
              className="px-6 py-2 bg-[var(--accent-kronos)] hover:bg-[var(--accent-kronos)]/90 text-white rounded-full font-medium text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[var(--accent-kronos)]/20"
            >
              Connect to Desktop
            </button>
          </div>
        )}

        {/* State: BOOTING */}
        {powerState === 'booting' && (
          <div className="flex flex-col items-center justify-center text-center p-6">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-[var(--accent-kronos)]/30" />
              <div className="absolute inset-0 rounded-full border-4 border-t-[var(--accent-kronos)] animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-foreground font-mono text-sm animate-pulse">ESTABLISHING CONNECTION...</h3>
              <p className="text-[var(--accent-kronos)] text-xs font-mono">
                {mcpUrl}
              </p>
            </div>
          </div>
        )}

        {/* State: ERROR */}
        {powerState === 'error' && (
          <div className="flex flex-col items-center justify-center text-center p-6 text-red-400">
            <AlertCircle className="h-12 w-12 mb-4 opacity-80" />
            <h3 className="font-medium mb-2">Connection Failed</h3>
            <p className="text-sm opacity-70 max-w-xs mb-4">{errorMsg}</p>
            <button
              onClick={handlePowerOn}
              className="px-4 py-2 border border-red-500/30 hover:bg-red-500/10 rounded-md text-xs transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* State: ON (Display Screenshot) */}
        {powerState === 'on' && (
          <div className="relative w-full h-full bg-black flex items-center justify-center group">
            {screenshot ? (
              <img 
                src={screenshot} 
                alt="Remote Desktop" 
                className="max-w-full max-h-full object-contain shadow-2xl"
              />
            ) : (
              <div className="text-muted-foreground text-sm flex flex-col items-center gap-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-ping" />
                <span>Waiting for video feed...</span>
              </div>
            )}
            
            {/* Overlay Controls (Fade in on hover) */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none flex items-center justify-center">
               <button 
                 onClick={() => fetchScreenshot()}
                 className="opacity-0 group-hover:opacity-100 pointer-events-auto bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/70 transition-all transform translate-y-4 group-hover:translate-y-0"
               >
                 Refresh View
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}