import type { ReactNode } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles'
import { useMemo } from 'react'

import ComponentsOverrides from '@/utils/theme/overrides'
import palette from '@/utils/theme/Palette'
import shadows, { customShadows } from '@/utils/theme/Shadows'
import typography from '@/utils/theme/Typography'

interface ChildrenProps {
  children?: ReactNode
}

/**
 * ThemeProvider component provides Material-UI theming configuration for the application
 *
 * @component
 * @param {object} props - Component props
 * @param {ReactNode} props.children - Child components to be wrapped with theme context
 *
 * Features:
 * - Configures custom theme with palette, typography, shadows and shape
 * - Wraps application with MUI theme provider
 * - Injects CSS baseline styles
 * - Applies component style overrides
 *
 * Theme configuration includes:
 * - Custom color palette with primary/secondary colors
 * - Typography using Public Sans font family
 * - Custom shadows and border radius
 * - Component-specific style overrides
 *
 * Usage:
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */

function ThemeProvider({ children }: ChildrenProps) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
    }),
    [],
  )

  const theme = createTheme(themeOptions as any)
  theme.components = ComponentsOverrides(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeProvider
