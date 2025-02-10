import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * A custom hook for handling responsive breakpoints using MUI theme
 *
 * @param query - The type of breakpoint query ('up' | 'down' | 'between' | 'only')
 * @param key - The breakpoint key (xs | sm | md | lg | xl)
 * @param start - Starting breakpoint for 'between' query
 * @param end - Ending breakpoint for 'between' query
 * @returns boolean | null - Returns true/false based on media query match, null if no query specified
 *
 * @example
 * // Check if screen size is larger than 'md' breakpoint
 * const isDesktop = useResponsive('up', 'md')
 *
 * // Check if screen size is between 'sm' and 'md' breakpoints
 * const isTablet = useResponsive('between', 'sm', 'md')
 *
 * // Check if screen size matches exactly 'sm' breakpoint
 * const isSmall = useResponsive('only', 'sm')
 *
 * // Check if screen size is smaller than 'lg' breakpoint
 * const isMobile = useResponsive('down', 'lg')
 */

export default function useResponsive(
  query?: string | undefined,
  key?: any,
  start?: any,
  end?: any,
) {
  const theme = useTheme()
  const mediaUp = useMediaQuery(theme.breakpoints.up(key))
  const mediaDown = useMediaQuery(theme.breakpoints.down(key))
  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end))
  const mediaOnly = useMediaQuery(theme.breakpoints.only(key))

  if (query === 'up') {
    return mediaUp
  }

  if (query === 'down') {
    return mediaDown
  }

  if (query === 'between') {
    return mediaBetween
  }

  if (query === 'only') {
    return mediaOnly
  }
  return null
}
