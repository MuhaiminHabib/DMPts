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
      action: 'read',
      subject: 'users-navItem',
      children: [
        {
          title: 'Business',
          path: '/apps/user/ba-list',
          action: 'read',
          subject: 'businesses-navItem'
        },
        {
          title: 'Digital Manager',
          path: '/apps/user/dm-list',
          action: 'read',
          subject: 'dm-navItem'
        },
        {
          title: 'Client',
          path: '/apps/user/c-list',
          action: 'read',
          subject: 'c-navItem'
        },
        {
          title: 'Client Managers',
          path: '/apps/user/cm-list',
          action: 'read',
          subject: 'cm-navItem'
        },
        {
          title: 'Tag DM & Client',
          path: '/apps/user/tag',
          action: 'read',
          subject: 'tag-navItem'
        }
      ]
    },
    {
      title: 'Post',
      icon: 'bx:food-menu',
      children: [
        {
          title: 'Create',
          path: '/apps/post/new',
          action: 'read',
          subject: 'create-navItem'
        },
        {
          title: 'Published',
          path: '/apps/post/published',
          action: 'read',
          subject: 'published-navItem'
        },
        {
          title: 'Scheduled',
          path: '/apps/post/scheduled',
          action: 'read',
          subject: 'scheduled-navItem'
        },
        {
          title: 'Draft',
          path: '/apps/post/draft',
          action: 'read',
          subject: 'draft-navItem'
        }
      ]
    }
  ]
}

export default navigation
