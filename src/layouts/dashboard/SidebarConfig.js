// component
import Iconify from '../../components/Iconify'

// ----------------------------------------------------------------------

const getIcon = name => <Iconify icon={name} width={22} height={22} />

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
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
  },
  {
    title: 'cohorts',
    path: '/dashboard/cohorts',
    icon: getIcon('ic:outline-groups'),
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
