import { Icon } from '@iconify/react'

function getIcon(name: string) {
  return (
    <Icon
      className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
      icon={name}
      width={16}
    />
  )
}

const SidebarConfig = [
  {
    title: 'Add Invoice',
    path: '/invoices/add',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'My Invoices',
    path: '/invoices/list',
    icon: getIcon('eva:people-fill'),
  },
]

export default SidebarConfig
