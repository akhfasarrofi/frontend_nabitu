import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Logo from 'public/logo.png'
import { useEffect } from 'react'

import useResponsive from '@/hooks/useResponsive'

import SidabarMenu from './/SidabarMenu'
import sidebarConfig from './/SidebarConfig'

const DRAWER_WIDTH = 280

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}))

interface SidebarProps {
  isOpenSidebar: boolean
  onCloseSidebar: any
}

function Sidebar({ isOpenSidebar, onCloseSidebar }: SidebarProps) {
  const pathname = usePathname()
  const isDesktop = useResponsive('up', 'lg')

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar()
    }
  }, [pathname])

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Image src={Logo} alt="Logo" width={50} height={50} />
      </Box>
      <SidabarMenu sidebarConfig={sidebarConfig} />
    </>
  )

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  )
}

export default Sidebar
