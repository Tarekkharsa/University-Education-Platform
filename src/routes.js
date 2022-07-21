import {Navigate, Outlet, useRoutes} from 'react-router-dom'
// layouts
import DashboardLayout from 'layouts/dashboard'
import LogoOnlyLayout from 'layouts/LogoOnlyLayout'
//
import Login from 'screens/Login'
import DashboardApp from 'screens/DashboardApp'
import Products from 'screens/Products'
import Blog from 'screens/Blog'
import User from 'screens/User'
import NotFound from 'screens/Page404'
import Categories from 'screens/Categories'
import Roles from 'screens/Users/Roles'

import Groups from 'screens/Groups'
import AddGroup from 'screens/Groups/Add'
import EditGroup from 'screens/Groups/EditGroup'
import ShowGroup from 'screens/Groups/ShowGroup'

import EditRole from 'screens/Users/Roles/EditRole'
import AddCategoty from 'screens/Categories/Add'
import EditCategoty from 'screens/Categories/EditCategoty'
import ShowCategoty from 'screens/Categories/ShowCategoty'

import Profile from 'screens/Profile'

import Accounts from 'screens/Users/Accounts'
import AddAccount from 'screens/Users/Accounts/Add'
import ShowAccount from 'screens/Users/Accounts/ShowAccount'
import EditAccount from 'screens/Users/Accounts/EditAccount'
import CustomizedSteppers from 'screens/Stepper'
import {useAuth} from 'context/auth-context'
import {useEffect} from 'react'
import EditProfile from 'screens/Profile/Partials/EditProfile'
import useRoles from 'hooks/useRoles'

import Calendar from 'screens/Calendar'
import Courses from 'screens/Courses'

import ManageCourses from 'screens/ManageCourses'
import AddCourse from 'screens/ManageCourses/Add'
import EditCourse from 'screens/ManageCourses/EditCourse'
import ShowCourse from 'screens/ManageCourses/ShowCourse'
import ShowLesson from 'screens/ManageCourses/Partials/Lessons/Show'
import FileModule from 'screens/ManageCourses/Partials/Lessons/Show/LessonModules/AddModule/FileModule'
import UrlModule from 'screens/ManageCourses/Partials/Lessons/Show/LessonModules/AddModule/UrlModule'
import ChooseModule from 'screens/ManageCourses/Partials/Lessons/Show/LessonModules/AddModule/ChooseModule'
import BigBlueButton from 'screens/BigBlueButton'
import ShowUserCourse from 'screens/Courses/Show'
import ShowUserLesson from 'screens/Courses/ShowUserLesson'
import AddMeeting from 'screens/BigBlueButton/Add'
import StdBigBlueButton from 'screens/StdBigBlueButton'

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: 'login-stepper',
          element: (
            <PrivateAdminStepperRoute>
              <CustomizedSteppers />
            </PrivateAdminStepperRoute>
          ),
        },
        {
          path: 'app',
          element: (
            <PrivateRoute>
              <PrivateAdminRoute>
                <DashboardApp />
              </PrivateAdminRoute>
            </PrivateRoute>
          ),
        },
        {
          path: 'profile',
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {path: 'profile/edit', element: <EditProfile />},

        {path: 'calendar', element: <Calendar />},

        {path: 'courses', element: <Courses />},
        {path: 'courses/:id/show', element: <ShowUserCourse />},
        {
          path: 'courses/:id/show/lessons/:lessonId/show',
          element: <ShowUserLesson />,
        },

        {path: 'manage-courses', element: <ManageCourses />},
        {path: 'manage-courses/add', element: <AddCourse />},
        {path: 'manage-courses/:id/edit', element: <EditCourse />},
        {path: 'manage-courses/:id/show', element: <ShowCourse />},
        {
          path: 'manage-courses/:id/show/lessons/:lessonId/show',
          element: <ShowLesson />,
        },
        {
          path: 'manage-courses/:id/show/lessons/:lessonId/show/files',
          element: <FileModule />,
        },
        {
          path: 'manage-courses/:id/show/lessons/:lessonId/show/choose',
          element: <ChooseModule />,
        },
        {
          path: 'manage-courses/:id/show/lessons/:lessonId/show/url',
          element: <UrlModule />,
        },
        {
          path: 'categories',
          element: (
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          ),
        },
        {path: 'categories/add', element: <AddCategoty />},
        {path: 'categories/:id/edit', element: <EditCategoty />},
        {path: 'categories/:id/show', element: <ShowCategoty />},

        {
          path: 'groups',
          element: (
            <PrivateRoute>
              <Groups />
            </PrivateRoute>
          ),
        },
        {path: 'groups/add', element: <AddGroup />},
        // {path: 'groups/:id/edit', element: <EditGroup />},
        {path: 'groups/:id/show', element: <ShowGroup />},

        {path: 'std-bbb', element: <StdBigBlueButton />},

        {path: 'bbb', element: <BigBlueButton />},
        {path: 'bbb/add', element: <AddMeeting />},

        {
          path: 'users/roles',
          element: (
            <PrivateRoute>
              <Roles />
            </PrivateRoute>
          ),
        },
        {path: 'users/roles/:id/edit', element: <EditRole />},
        {
          path: 'users/accounts',
          element: (
            <PrivateRoute>
              <Accounts />
            </PrivateRoute>
          ),
        },
        {path: 'users/accounts/add', element: <AddAccount />},
        {path: 'users/accounts/:id/show', element: <ShowAccount />},
        {path: 'users/accounts/:id/edit', element: <EditAccount />},

        {path: 'products', element: <Products />},
        {path: 'blog', element: <Blog />},
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        {path: '/', element: <Navigate to="/dashboard/app" />},
        {path: 'login', element: <Login />},
        {path: '404', element: <NotFound />},
        {path: '*', element: <Navigate to="/404" />},
      ],
    },
    {path: '*', element: <Navigate to="/404" replace />},
  ])
}

function PrivateRoute({children}) {
  const {user} = useAuth()

  return user.status === 0 || user.status === 1 ? (
    <Navigate to="/dashboard/login-stepper" />
  ) : (
    children
  )
}
function PrivateAdminRoute({children}) {
  const {checkIfRolesInUserRoles} = useRoles()

  return !checkIfRolesInUserRoles(['ROLE_ADMIN']) ? (
    <Navigate to="/dashboard/profile" />
  ) : (
    children
  )
}
function PrivateAdminStepperRoute({children}) {
  const {checkIfRolesInUserRoles} = useRoles()

  return checkIfRolesInUserRoles(['ROLE_ADMIN']) ? (
    <Navigate to="/dashboard/app" />
  ) : (
    children
  )
}
