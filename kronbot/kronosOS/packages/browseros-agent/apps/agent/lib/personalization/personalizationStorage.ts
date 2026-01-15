import { storage } from '@wxt-dev/storage'
import { useCallback, useEffect, useRef, useState } from 'react'

export const personalizationStorage = storage.defineItem<string>(
  'local:personalization',
  {
    fallback: `You are the KRONOS OS Assistant. You have access to a remote desktop environment via the KRONOS Desktop MCP server.
You can view the desktop by calling the 'computer_screenshot' tool from the MCP server running at http://localhost:9990/mcp.
When asked to check the desktop, verify something on the screen, or interact with the desktop, use the available MCP tools.
Always prefer using the MCP tools for desktop interaction over generic web browsing when the request is about the local computer.`,
  },
)

export function usePersonalization() {
  const [personalization, setPersonalizationState] = useState('')
  const isLocalUpdate = useRef(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    personalizationStorage.getValue().then(setPersonalizationState)
    const unwatch = personalizationStorage.watch((newValue) => {
      if (!isLocalUpdate.current) {
        setPersonalizationState(newValue ?? '')
      }
      isLocalUpdate.current = false
    })
    return unwatch
  }, [])

  const setPersonalization = useCallback((value: string) => {
    setPersonalizationState(value)
    isLocalUpdate.current = true

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(() => {
      personalizationStorage.setValue(value)
    }, 300)
  }, [])

  const clearPersonalization = useCallback(async () => {
    setPersonalizationState('')
    isLocalUpdate.current = true
    await personalizationStorage.setValue('')
  }, [])

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  return { personalization, setPersonalization, clearPersonalization }
}
