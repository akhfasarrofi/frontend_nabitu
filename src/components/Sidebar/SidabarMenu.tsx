/* eslint-disable ts/ban-ts-comment */
import type { ListItemButtonProps } from '@mui/material/ListItemButton'

import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { alpha } from '@mui/material/styles'
import styled from '@mui/material/styles/styled'
import useTheme from '@mui/material/styles/useTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useState } from 'react'
import { matchPath } from 'react-router-dom'

interface SidabarMenuProps {
  sidebarConfig: Array<object>
}

interface ItemSidebar {
  path: string
  icon: string
  title: string
}

interface SidebarItemProps {
  item: {
    title?: string
    path?: string
    icon?: string
    children?: ItemSidebar[]
  }
  active: (path: string) => boolean
}

const ListItemStyle = styled((props: ListItemButtonProps) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}))

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

function SidebarItem({ item, active }: SidebarItemProps) {
  const theme = useTheme()
  const { title, path, icon, children } = item
  const isActiveRoot = active(path!)

  const [open, setOpen] = useState(isActiveRoot)

  const handleOpen = () => {
    setOpen((prev: any) => !prev)
  }

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  }

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          <Icon
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            className="w-4 h-4 ml-1"
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children?.map((item) => {
              const { title, path } = item
              const isActiveSub = active(path)

              return (
                <ListItemStyle
                  key={title}

                  // @ts-ignore
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: theme => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              )
            })}
          </List>
        </Collapse>
      </>
    )
  }

  return (
    <Link href={path!}>
      <ListItemStyle
        sx={{
          ...(isActiveRoot && activeRootStyle),
        }}
      >
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    </Link>
  )
}

function SidabarMenu({ sidebarConfig }: SidabarMenuProps) {
  const pathname = usePathname()

  const match = (path: string) => (path ? !!matchPath({ path, end: false }, pathname) : false)

  return (
    <List disablePadding sx={{ p: 1 }}>
      {sidebarConfig.map((item, idx: number) => (
        <SidebarItem
          key={idx}
          item={item}
          active={match}
        />
      ))}
    </List>
  )
}

export default memo(SidabarMenu)
