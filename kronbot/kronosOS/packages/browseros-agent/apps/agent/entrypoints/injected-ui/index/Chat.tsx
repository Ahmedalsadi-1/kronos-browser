import { useEffect, useRef, useState } from 'react'
import { createBrowserOSAction } from '@/lib/chat-actions/types'
import { SIDEPANEL_AI_TRIGGERED_EVENT } from '@/lib/constants/analyticsEvents'
import { useJtbdPopup } from '@/lib/jtbd-popup/use-jtbd-popup'
import { track } from '@/lib/metrics/track'
import { ChatEmptyState } from './ChatEmptyState'
import { ChatError } from './ChatError'
import { ChatFooter } from './ChatFooter'
import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'
import { DesktopPanel } from './DesktopPanel'
import { useChatSession } from './useChatSession'
import { cn } from '@/lib/utils'

/**
 * @public
 */
export const Chat = () => {
  const {
    mode,
    setMode,
    messages,
    sendMessage,
    status,
    stop,
    providers,
    selectedProvider,
    isLoading,
    agentUrlError,
    chatError,
    handleSelectProvider,
    getActionForMessage,
    resetConversation,
    liked,
    onClickLike,
    disliked,
    onClickDislike,
    pastChats,
    loadPastChat,
    deletePastChat,
  } = useChatSession()

  const {
    popupVisible,
    recordMessageSent,
    triggerIfEligible,
    onTakeSurvey,
    onDismiss: onDismissJtbdPopup,
  } = useJtbdPopup()

  const [input, setInput] = useState('')
  const [attachedTabs, setAttachedTabs] = useState<chrome.tabs.Tab[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [desktopPanelOpen, setDesktopPanelOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'kronbot'>('chat')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    ;(async () => {
      const currentTab = (
        await chrome.tabs.query({
          active: true,
          currentWindow: true,
        })
      ).filter((tab) => tab.url?.startsWith('http'))
      setAttachedTabs(currentTab)
    })()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll only when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Trigger JTBD popup when AI finishes responding
  const previousChatStatus = useRef(status)
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally only trigger on status change
  useEffect(() => {
    const aiWasProcessing =
      previousChatStatus.current === 'streaming' ||
      previousChatStatus.current === 'submitted'
    const aiJustFinished = aiWasProcessing && status === 'ready'

    if (aiJustFinished && messages.length > 0) {
      triggerIfEligible()
    }
    previousChatStatus.current = status
  }, [status])

  const toggleTabSelection = (tab: chrome.tabs.Tab) => {
    setAttachedTabs((prev) => {
      const isSelected = prev.some((t) => t.id === tab.id)
      if (isSelected) {
        return prev.filter((t) => t.id !== tab.id)
      }
      return [...prev, tab]
    })
  }

  const removeTab = (tabId?: number) => {
    setAttachedTabs((prev) => prev.filter((t) => t.id !== tabId))
  }

  const executeMessage = (customMessageText?: string) => {
    const messageText = customMessageText ? customMessageText : input.trim()
    if (!messageText) return

    recordMessageSent()

    if (attachedTabs.length) {
      const action = createBrowserOSAction({
        mode,
        message: messageText,
        tabs: attachedTabs,
      })
      sendMessage({ text: messageText, action })
    } else {
      sendMessage({ text: messageText })
    }
    setInput('')
    setAttachedTabs([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (messages.length === 0) {
      track(SIDEPANEL_AI_TRIGGERED_EVENT, {
        mode,
        tabs_count: attachedTabs.length,
      })
    }
    executeMessage()
  }

  const handleSuggestionClick = (suggestion: string) => {
    executeMessage(suggestion)
  }

  if (isLoading || !selectedProvider) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex h-full w-full flex-col text-foreground"> {/* Removed bg-background/50 backdrop-blur-xl */}
      <ChatHeader
        selectedProvider={selectedProvider}
        onSelectProvider={handleSelectProvider}
        providers={providers}
        onNewConversation={resetConversation}
        hasMessages={messages.length > 0}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pastChats={pastChats}
        loadPastChat={loadPastChat}
        deletePastChat={deletePastChat}
      />

      <main className="mt-2 flex-1 flex flex-col overflow-hidden relative">
        {activeTab === 'chat' && (
          <div className="flex-1 overflow-y-auto px-0 scrollbar-hide"> {/* Changed px-3 to px-0 */}
            {messages.length === 0 ? (
              <ChatEmptyState
                mode={mode}
                mounted={mounted}
                onSuggestionClick={handleSuggestionClick}
              />
            ) : (
              <ChatMessages
                messages={messages}
                status={status}
                messagesEndRef={messagesEndRef}
                getActionForMessage={getActionForMessage}
                liked={liked}
                onClickLike={onClickLike}
                disliked={disliked}
                onClickDislike={onClickDislike}
                showJtbdPopup={popupVisible}
                onTakeSurvey={onTakeSurvey}
                onDismissJtbdPopup={onDismissJtbdPopup}
              />
            )}
          </div>
        )}
        {activeTab === 'kronbot' && (
          <DesktopPanel
            isOpen={true} // Always open when kronbot tab is active
            onClose={() => setActiveTab('chat')} // Close DesktopPanel by switching to chat tab
            defaultHeight={window.innerHeight - 100} // Make it large, almost full height
          />
        )}
        {agentUrlError && <ChatError error={agentUrlError} />}
        {chatError && <ChatError error={chatError} />}
      </main>

      <ChatFooter
        mode={mode}
        onModeChange={setMode}
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        status={status}
        onStop={stop}
        attachedTabs={attachedTabs}
        onToggleTab={toggleTabSelection}
        onRemoveTab={removeTab}
        selectedProvider={selectedProvider}
        providers={providers}
        onSelectProvider={handleSelectProvider}
      />
    </div>
  )
}