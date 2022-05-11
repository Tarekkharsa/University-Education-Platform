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
import Courses from 'screens/Courses'
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

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {path: 'login-stepper', element: <CustomizedSteppers />},
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
        {path: 'profile', element: <Profile />},
        {path: 'profile/edit', element: <EditProfile />},
        {path: 'courses', element: <Courses />},

        {path: 'categories', element: <Categories />},
        {path: 'categories/add', element: <AddCategoty />},
        {path: 'categories/:id/edit', element: <EditCategoty />},
        {path: 'categories/:id/show', element: <ShowCategoty />},

        {path: 'groups', element: <Groups />},
        {path: 'groups/add', element: <AddGroup />},
        {path: 'groups/:id/edit', element: <EditGroup />},
        {path: 'groups/:id/show', element: <ShowGroup />},

        {path: 'users/roles', element: <Roles />},
        {path: 'users/roles/:id/edit', element: <EditRole />},
        {path: 'users/accounts', element: <Accounts />},
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
