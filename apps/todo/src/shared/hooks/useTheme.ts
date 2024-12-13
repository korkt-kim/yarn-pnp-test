import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { isBrowser } from '../lib/isBrowser'

type Theme = 'light' | 'dark'

/**
 * Custom React hook for managing theme (dark/light mode) with system preference and user preference support.
 *
 * The hook handles:
 * - Loading saved theme preference from localStorage
 * - Detecting and responding to system theme changes
 * - Syncing theme state across components
 * - Applying theme by setting data-theme attribute on document root
 *
 * @returns {readonly [Theme | undefined, () => void]} A tuple containing:
 *   - Current theme ('light' | 'dark' | undefined)
 *   - Function to toggle between light and dark themes
 *
 * @example
 * ```tsx
 * function App() {
 *   const [theme, toggleTheme] = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Switch to {theme === 'light' ? 'dark' : 'light'} mode
 *     </button>
 *   );
 * }
 * ```
 *
 * @remarks
 * The hook follows this priority order for theme selection:
 * 1. User's saved preference (stored in localStorage)
 * 2. System theme preference (using prefers-color-scheme media query)
 *
 * Uses useLayoutEffect for initial theme detection to avoid flash of wrong theme.
 * Handles SSR by checking for browser environment before accessing window object.
 */
export const useTheme = () => {
  const [permanentTheme, setPermanentTheme] = useLocalStorage<Theme>('mode')
  const [theme, setTheme] = useState<Theme>()

  useLayoutEffect(() => {
    if (!isBrowser()) {
      return
    }

    if (permanentTheme) {
      setTheme(permanentTheme)

      return
    }

    setTheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    )
  }, [])

  // 테마 변경 함수
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setPermanentTheme(newTheme)
    setTheme(newTheme)
  }, [theme])

  // 시스템 테마 변경 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      // localStorage에 저장된 사용자 선택이 없을 때만 시스템 설정 반영
      if (permanentTheme) {
        return
      }

      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, toggleTheme])

  // 테마 적용
  useEffect(() => {
    if (!theme) {
      return
    }

    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return [theme, toggleTheme] as const
}
