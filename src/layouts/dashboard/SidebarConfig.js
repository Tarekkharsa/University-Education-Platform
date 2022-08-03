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
    roles: ['ROLE_ADMIN'],
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
  {
    title: 'categories',
    path: '/dashboard/categories',
    icon: getIcon('carbon:categories'),
    roles: ['ROLE_ADMIN'],
  },
  {
    title: 'groups',
    path: '/dashboard/groups',
    icon: getIcon('ic:outline-groups'),
    roles: ['ROLE_ADMIN'],
  },
  {
    title: 'manage_courses',
    path: '/dashboard/manage-courses',
    roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_TEACHER'],
    icon: getIcon('fluent:learning-app-20-regular'),
  },
  {
    title: 'courses',
    path: '/dashboard/courses',
    roles: ['ROLE_STUDENT'],
    icon: getIcon('fluent:learning-app-20-regular'),
  },
  {
    title: 'fav_courses',
    path: '/dashboard/fav_courses',
    roles: ['ROLE_STUDENT'],
    icon: getIcon('iconoir:favourite-book'),
  },
  {
    title: 'calendar',
    path: '/dashboard/calendar',
    roles: ['ROLE_STUDENT', 'ROLE_TEACHER'],
    icon: getIcon('bi:calendar-week'),
  },
  {
    title: 'manage_bigbluebutton',
    path: '/dashboard/bbb',
    roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_TEACHER'],
    icon: getIcon('simple-icons:bigbluebutton'),
  },
  {
    title: 'bigbluebutton',
    path: '/dashboard/std-bbb',
    roles: ['ROLE_STUDENT'],
    icon: getIcon('simple-icons:bigbluebutton'),
  },
  {
    title: 'manage_course_quizzes',
    path: '/dashboard/course_quizzes',
    roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_TEACHER'],
    icon: getIcon('fluent:quiz-new-20-regular'),
  },
  {
    title: 'manage_course_assignments',
    path: '/dashboard/course_assignments',
    roles: ['ROLE_TEACHER', 'ROLE_MANAGER'],
    icon: getIcon('fluent:quiz-new-20-regular'),
  },
  {
    title: 'course_quizzes',
    path: '/dashboard/std_course_quizzes',
    roles: ['ROLE_STUDENT'],
    icon: getIcon('fluent:quiz-new-20-regular'),
  },
  {
    title: 'grades',
    path: '/dashboard/grades',
    roles: ['ROLE_STUDENT'],
    icon: getIcon('emojione-monotone:japanese-passing-grade-button'),
  },
  {
    title: 'course_assignments',
    path: '/dashboard/std_course_assignments',
    roles: ['ROLE_STUDENT'],
    icon: getIcon('fluent:quiz-new-20-regular'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  //   roles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
]

export default sidebarConfig
