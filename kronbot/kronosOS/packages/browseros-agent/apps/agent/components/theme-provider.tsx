import { createContext, useContext, useEffect, useState } from 'react'
import { type Theme, themeStorage } from '@/lib/theme/theme-storage'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

/**
 * @public
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system', // Keep defaultTheme as system for consistency with original
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  useEffect(() => {
    themeStorage.getValue().then((savedTheme) => {
      // Force dark theme, but still load/save from storage
      setThemeState('dark')
    })

    const unwatch = themeStorage.watch((newTheme) => {
      // If the theme is changed in storage, still force it to dark
      setThemeState('dark')
    })

    return () => unwatch()
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = (targetTheme: 'dark' | 'light') => {
      const oppositeTheme = targetTheme === 'dark' ? 'light' : 'dark'

      if (root.classList.contains(oppositeTheme)) {
        root.classList.remove(oppositeTheme)
      }
      if (!root.classList.contains(targetTheme)) {
        root.classList.add(targetTheme)
      }
    }

    // Always apply dark theme, overriding any other preference
    applyTheme('dark')
  }, [theme])

  const value = {
    theme: 'dark' as Theme, // Always report dark theme
    setTheme: (newTheme: Theme) => {
      themeStorage.setValue(newTheme)
      setThemeState('dark') // Still set to dark, even if user tries to set light
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
