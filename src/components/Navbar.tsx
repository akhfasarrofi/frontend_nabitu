import type { MouseEventHandler } from 'react'

import { Avatar } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'
import styled from '@mui/material/styles/styled'
import Toolbar from '@mui/material/Toolbar'
import Image from 'next/image'
import Logo from 'public/logo.png'

const DRAWER_WIDTH = 280
const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 92

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}))

interface NavbarProps {
  openSidebar: MouseEventHandler<HTMLAnchorElement> | undefined | any
}

/**
 * Navbar Component
 *
 * A responsive navigation bar component that displays a logo and user avatar.
 * Features a collapsible sidebar trigger on mobile views.
 *
 * @component
 *
 * Constants:
 * - DRAWER_WIDTH: 280px - Width of the sidebar drawer
 * - APPBAR_MOBILE: 64px - Height of navbar on mobile
 * - APPBAR_DESKTOP: 92px - Height of navbar on desktop
 *
 * Styled Components:
 * - RootStyle: Styled AppBar with blur effect and responsive width
 * - ToolbarStyle: Styled Toolbar with responsive height and padding
 *
 * Props:
 * @param {MouseEventHandler} openSidebar - Handler function to toggle sidebar
 *
 * Features:
 * - Responsive design with mobile/desktop layouts
 * - Blur effect background
 * - Logo image that acts as sidebar trigger on mobile
 * - Right-aligned user avatar
 * - Automatic width adjustment for sidebar on desktop
 *
 * Usage:
 * ```tsx
 * <Navbar openSidebar={handleSidebarOpen} />
 * ```
 */

function Navbar({ openSidebar }: NavbarProps) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={openSidebar}
          sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
        >
          <Image src={Logo} alt="Logo" width={50} height={50} />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <IconButton>
            <Avatar src="https://res.cloudinary.com/den5rttgg/image/upload/v1665677191/kpi/avatar_default_wsifzx.jpg" alt="Avatar" />
          </IconButton>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  )
}

export default Navbar
