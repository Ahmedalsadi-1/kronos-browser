import { Github, Plus, SettingsIcon, History, X } from 'lucide-react'
import type { FC } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/elements/theme-toggle'
import { productRepositoryUrl } from '@/lib/constants/productUrls'
import { KronosIcon, ProviderIcon } from '@/lib/llm-providers/providerIcons'
import type { ProviderType } from '@/lib/llm-providers/types'
import { ChatProviderSelector } from './ChatProviderSelector'
import type { ChatConversation, Provider } from './chatTypes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


interface ChatHeaderProps {
  selectedProvider: Provider
  providers: Provider[]
  onSelectProvider: (provider: Provider) => void
  onNewConversation: () => void
  hasMessages: boolean
  activeTab: 'chat' | 'kronbot'
  setActiveTab: (tab: 'chat' | 'kronbot') => void
  pastChats: ChatConversation[]
  loadPastChat: (conversation: ChatConversation) => void
  deletePastChat: (conversationId: string) => void
}

export const ChatHeader: FC<ChatHeaderProps> = ({
  selectedProvider,
  providers,
  onSelectProvider,
  onNewConversation,
  hasMessages,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="flex items-center justify-between border-border/40 border-b bg-background/80 px-3 py-2.5 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          className={cn(
            "text-base font-semibold",
            activeTab === 'chat' ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"
          )}
          onClick={() => setActiveTab('chat')}
        >
          CHAT
        </button>
        <button
          className={cn(
            "text-base font-semibold",
            activeTab === 'kronbot' ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"
          )}
          onClick={() => setActiveTab('kronbot')}
        >
          KRONBOT
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onNewConversation}
          className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          title="New conversation"
        >
          <Plus className="h-4 w-4" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              title="History"
            >
              <History className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {pastChats.length === 0 ? (
              <DropdownMenuItem disabled>No past chats</DropdownMenuItem>
            ) : (
              pastChats.map((chat) => (
                <DropdownMenuItem key={chat.id} onSelect={() => loadPastChat(chat)}>
                  <span className="flex-1">{chat.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePastChat(chat.id);
                    }}
                    className="ml-2 text-red-500 hover:text-red-700"
                    title="Delete chat"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onNewConversation}>
              New conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <a
          href="/options.html"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          title="Settings"
        >
          <SettingsIcon className="h-4 w-4" />
        </a>
        {/* Close button - assuming this will be handled by the extension framework or a separate component */}
        <button
          type="button"
          className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          title="Close"
          onClick={() => window.close()} // This will close the popup
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
