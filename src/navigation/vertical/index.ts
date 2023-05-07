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
          path: '/apps/user/ba-list',
          action: 'read',
          subject: 'businesses-page'
        },
        {
          title: 'Digital Managers',
          path: '/apps/user/dm-list',
          action: 'read',
          subject: 'dm-page'
        },
        {
          title: 'Clients',
          path: '/apps/user/c-list',
          action: 'read',
          subject: 'c-page'
        },
        {
          title: 'Client Managers',
          path: '/apps/user/cm-list',
          action: 'read',
          subject: 'cm-page'
        }
      ]
    },
    {
      title: 'Posts',
      icon: 'bx:food-menu',
      children: [
        {
          title: 'List',
          path: '/apps/post/list'
        },
        {
          title: 'Preview',
          path: '/apps/post/preview'
        },
        {
          title: 'Edit',
          path: '/apps/post/edit'
        },
        {
          title: 'Add',
          path: '/apps/post/add'
        }
      ]
    }
  ]
}

export default navigation
