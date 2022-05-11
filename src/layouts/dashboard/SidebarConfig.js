// component
import Iconify from '../../components/Iconify'

// ----------------------------------------------------------------------

const getIcon = name => <Iconify icon={name} width={22} height={22} />
// ['ROLE_ADMIN' ,'ROLE_MANAGER','ROLE_STUDENT','ROLE_TEACHER']
const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
    roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_TEACHER'],
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
    roles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
    children: [
      {
        title: 'accounts',
        path: '/dashboard/users/accounts',
      },
      {
        title: 'roles',
        path: '/dashboard/users/roles',
      },
    ],
  },
  // {
  //   title: 'Courses',
  //   path: '/dashboard/courses',
  //   icon: getIcon('fluent:learning-app-20-regular'),
  // },
  {
    title: 'categories',
    path: '/dashboard/categories',
    icon: getIcon('carbon:categories'),
    roles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  },
  {
    title: 'groups',
    path: '/dashboard/groups',
    icon: getIcon('ic:outline-groups'),
    roles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
]

export default sidebarConfig
