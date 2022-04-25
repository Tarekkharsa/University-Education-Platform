import {Navigate, useRoutes} from 'react-router-dom'
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
import Accounts from 'screens/Users/Accounts'
import AddAccount from 'screens/Users/Accounts/Add'
import Cohorts from 'screens/Cohorts'
import AddCohort from 'screens/Cohorts/Add'
import AddCategoty from 'screens/Categories/Add'
import EditCohort from 'screens/Cohorts/EditCohort'
import Profile from 'screens/Profile'
import ShowCohort from 'screens/Cohorts/ShowCohort'
import EditRole from 'screens/Users/Roles/EditRole'
import EditCategoty from 'screens/Categories/EditCategoty'
import ShowCategoty from 'screens/Categories/ShowCategoty'
import ShowAccount from 'screens/Users/Accounts/ShowAccount'
import EditAccount from 'screens/Users/Accounts/EditAccount'

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {path: 'app', element: <DashboardApp />},
        {path: 'profile', element: <Profile />},
        {path: 'courses', element: <Courses />},

        {path: 'categories', element: <Categories />},
        {path: 'categories/add', element: <AddCategoty />},
        {path: 'categories/:id/edit', element: <EditCategoty />},
        {path: 'categories/:id/show', element: <ShowCategoty />},

        {path: 'cohorts', element: <Cohorts />},
        {path: 'cohorts/add', element: <AddCohort />},
        {path: 'cohorts/:id/edit', element: <EditCohort />},
        {path: 'cohorts/:id/show', element: <ShowCohort />},

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
