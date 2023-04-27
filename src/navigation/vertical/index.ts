// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'bx:home-circle',
      path: '/dashboards/analytics'
    },
    {
      title: 'Users',
      icon: 'bx:user',
      children: [
        {
          title: 'Businesses',
          path: '/apps/user/ba-list'
        },
        {
          title: 'Digital Managers',
          path: '/apps/user/dm-list'
        },
        {
          title: 'Clients',
          path: '/apps/user/c-list'
        },
        {
          title: 'Client Managers',
          path: '/apps/user/cm-list'
        }
      ]
    },
    {
      title: 'Posts',
      icon: 'bx:food-menu',
      children: [
        {
          title: 'List',
          path: '/apps/invoice/list'
        },
        {
          title: 'Preview',
          path: '/apps/invoice/preview'
        },
        {
          title: 'Edit',
          path: '/apps/invoice/edit'
        },
        {
          title: 'Add',
          path: '/apps/invoice/add'
        }
      ]
    }
  ]
}

export default navigation
