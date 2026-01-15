import {
  BotIcon,
  CheckCircle2,
  ChevronDownIcon,
  CircleDashed,
  Loader2,
  XCircle,
} from 'lucide-react'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import {
  Task,
  TaskContent,
  TaskItem,
  TaskTrigger,
} from '@/components/ai-elements/task'
import type {
  ToolInvocationInfo,
  ToolInvocationState,
} from './getMessageSegments'

interface ToolBatchProps {
  tools: ToolInvocationInfo[]
  isLastBatch: boolean
  isLastMessage: boolean
  isStreaming: boolean
}

export const ToolBatch: FC<ToolBatchProps> = ({
  tools,
  isLastBatch,
  isLastMessage,
  isStreaming,
}) => {
  const shouldBeOpen = isLastMessage && isLastBatch && isStreaming
  const [isOpen, setIsOpen] = useState(shouldBeOpen)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  useEffect(() => {
    if (isLastMessage && !hasUserInteracted) {
      if (isLastBatch) {
        setIsOpen(isStreaming)
      } else {
        setIsOpen(false)
      }
    }
  }, [isStreaming, isLastMessage, isLastBatch, hasUserInteracted])

  const completedCount = tools.filter((t) => isToolCompleted(t.state)).length

  const onManualToggle = (newState: boolean) => {
    setHasUserInteracted(true)
    setIsOpen(newState)
  }

  return (
    <Task open={isOpen} onOpenChange={onManualToggle}>
      <TaskTrigger
        title={`${completedCount}/${tools.length} actions completed`}
        TriggerIcon={BotIcon}
      />
      <TaskContent>
        {tools.map((tool) => (
          <ToolItem key={tool.toolCallId} tool={tool} />
        ))}
      </TaskContent>
    </Task>
  )
}

interface ToolItemProps {
  tool: ToolInvocationInfo
}

const ToolItem: FC<ToolItemProps> = ({ tool }) => {
  const [isOpen, setIsOpen] = useState(false)
  const formattedOutput = formatToolOutput(tool.toolName, tool.output)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 py-1">
          <ToolStatusIcon state={tool.state} />
          <span className="text-sm">{formatToolName(tool.toolName)}</span>
          {formattedOutput && (
            <ChevronDownIcon
              className={cn(
                'h-3.5 w-3.5 transition-transform',
                isOpen ? 'rotate-180' : '',
              )}
            />
          )}
        </div>
      </CollapsibleTrigger>
      {formattedOutput && (
        <CollapsibleContent>
          <div className="mt-1 ml-5 text-xs text-muted-foreground font-mono whitespace-pre-wrap">
            {formattedOutput}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}

const formatToolName = (name: string) => {
  return name
    ?.replace(/_/g, ' ')
    ?.replace(/([a-z])([A-Z])/g, '$1 $2')
    ?.replace(/^./, (s) => s.toUpperCase())
}

const formatToolOutput = (toolName: string, output: unknown[]): string => {
  if (!output || output.length === 0) return ''

  const lastOutput = output[output.length - 1]
  if (lastOutput === null || lastOutput === undefined) return ''

  if (typeof lastOutput === 'string') {
    const trimmed = lastOutput.trim()
    if (!trimmed) return ''

    try {
      const parsed = JSON.parse(trimmed)
      if (typeof parsed === 'object' && parsed !== null) {
        return JSON.stringify(parsed, null, 2)
      }
      return trimmed
    } catch {
      return trimmed
    }
  }

  if (typeof lastOutput === 'object') {
    try {
      return JSON.stringify(lastOutput, null, 2)
    } catch {
      return String(lastOutput)
    }
  }

  return String(lastOutput)
}

const isToolCompleted = (state: ToolInvocationState) =>
  state === 'result' || state === 'output-available'

const isToolInProgress = (state: ToolInvocationState) =>
  state === 'call' || state === 'input-available'

const isToolError = (state: ToolInvocationState) => state === 'output-error'

const ToolStatusIcon: FC<{ state: ToolInvocationState }> = ({ state }) => {
  if (isToolCompleted(state)) {
    return <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
  }
  if (isToolInProgress(state)) {
    return (
      <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--accent-kronos)]" />
    )
  }
  if (isToolError(state)) {
    return <XCircle className="h-3.5 w-3.5 text-destructive" />
  }
  return <CircleDashed className="h-3.5 w-3.5 text-muted-foreground" />
}
