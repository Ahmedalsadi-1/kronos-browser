import { ChevronDown, Layers } from 'lucide-react'
import type { FC, FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { TabSelector } from '@/components/elements/tab-selector'
import { ChatAttachedTabs } from './ChatAttachedTabs'
import { ChatInput } from './ChatInput'
import { ChatModeToggle } from './ChatModeToggle'
import type { ChatMode, Provider } from './chatTypes'
import { KronosIcon, ProviderIcon } from '@/lib/llm-providers/providerIcons'
import type { ProviderType } from '@/lib/llm-providers/types'
import { ChatProviderSelector } from './ChatProviderSelector'

interface ChatFooterProps {
  mode: ChatMode
  onModeChange: (mode: ChatMode) => void
  input: string
  onInputChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  status: 'streaming' | 'submitted' | 'ready' | 'error'
  onStop: () => void
  attachedTabs: chrome.tabs.Tab[]
  onToggleTab: (tab: chrome.tabs.Tab) => void
  onRemoveTab: (tabId?: number) => void
  // desktopPanelOpen?: boolean // Removed from here
  // onToggleDesktopPanel?: () => void // Removed from here
  selectedProvider: Provider
  providers: Provider[]
  onSelectProvider: (provider: Provider) => void
}

export const ChatFooter: FC<ChatFooterProps> = ({
  mode,
  onModeChange,
  input,
  onInputChange,
  onSubmit,
  status,
  onStop,
  attachedTabs,
  onToggleTab,
  onRemoveTab,
  selectedProvider,
  providers,
  onSelectProvider,
}) => {
  return (
    <footer className="border-border/40 border-t"> {/* Removed bg-background/80 backdrop-blur-md */}
      <ChatAttachedTabs tabs={attachedTabs} onRemoveTab={onRemoveTab} />

      <div className="p-3">
        <div className="flex items-center gap-2">
          <ChatModeToggle mode={mode} onModeChange={onModeChange} />

          {/* ChatProviderSelector moved here */}
          <ChatProviderSelector
            providers={providers}
            selectedProvider={selectedProvider}
            onSelectProvider={onSelectProvider}
          >
            <button
              type="button"
              className="group relative inline-flex cursor-pointer items-center gap-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground data-[state=open]:bg-accent"
              title="Change AI Provider"
            >
              {selectedProvider.type === 'browseros' ? (
                <KronosIcon size={18} />
              ) : (
                <ProviderIcon
                  type={selectedProvider.type as ProviderType}
                  size={18}
                />
              )}
              <span className="font-semibold text-base">
                {selectedProvider.name}
              </span>
            </button>
          </ChatProviderSelector>

          {mode === 'chat' && (
            <TabSelector
              selectedTabs={attachedTabs}
              onToggleTab={onToggleTab}
              side="top"
            >
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1.5 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground data-[state=open]:bg-accent"
                title="Select tabs"
              >
                <Layers className="h-4 w-4" />
                {attachedTabs.length > 0 && (
                  <span className="font-medium text-[var(--kronos-primary)] text-xs">
                    {attachedTabs.length}
                  </span>
                )}
                <ChevronDown className="h-3 w-3" />
              </button>
            </TabSelector>
          )}
        </div>

        <ChatInput
          input={input}
          status={status}
          mode={mode}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onStop={onStop}
          selectedTabs={attachedTabs}
          onToggleTab={onToggleTab}
        />
      </div>
    </footer>
  )
}
