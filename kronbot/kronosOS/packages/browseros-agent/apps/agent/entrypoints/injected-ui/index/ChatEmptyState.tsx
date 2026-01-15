import { Sparkles } from 'lucide-react'
import type { FC } from 'react'
// import KronosLogoSvg from '@/assets/kronos_logo.svg'
import { cn } from '@/lib/utils'
import { AGENT_SUGGESTIONS, CHAT_SUGGESTIONS, type ChatMode } from './chatTypes'

interface ChatEmptyStateProps {
  mode: ChatMode
  mounted: boolean
  onSuggestionClick: (suggestion: string) => void
}

export const ChatEmptyState: FC<ChatEmptyStateProps> = ({
  mode,
  mounted,
  onSuggestionClick,
}) => {
  const suggestions = mode === 'chat' ? CHAT_SUGGESTIONS : AGENT_SUGGESTIONS

  return (
    <div
      className={cn(
        'm-0! flex h-full flex-col items-center justify-center space-y-4 text-center opacity-0 transition-all duration-700',
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      )}
    >
      <div className="mb-3 flex justify-center">
        <img src="/icon/mainkronos-logo.png" alt="kronosOS-assistant" className="h-12 w-12" />
      </div>
      <div>
        <h2 className="mb-1 font-semibold text-lg">
          {mode === 'chat' ? 'Chat with this page' : 'Agent at your service'}
        </h2>
        <p className="max-w-[200px] text-muted-foreground text-xs">
          {mode === 'chat'
            ? 'Ask questions about the current page or any topic'
            : 'Let AI automate tasks and browse for you'}
        </p>
      </div>

      <div className="mt-6 grid w-full max-w-[260px] grid-cols-1 gap-2">
        {suggestions.map((suggestion) => (
          <button
            type="button"
            key={suggestion.display}
            onClick={() => onSuggestionClick(suggestion.prompt)}
            className="group flex items-center justify-between rounded-lg border border-border/50 bg-card px-3 py-2.5 text-left text-xs transition-all duration-200 hover:border-[var(--accent-kronos)]/50 hover:bg-[var(--accent-kronos)]/5"
          >
            {suggestion.display}
            <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {suggestion.icon}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
