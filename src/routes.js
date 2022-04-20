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
import Permissions from 'screens/Users/Permissions'
import Accounts from 'screens/Users/Accounts'
import AddAccount from 'screens/Users/Accounts/Add'
import Cohorts from 'screens/Cohorts'
import AddCohort from 'screens/Cohorts/Add'
import EditCohort from 'screens/Cohorts/Edit'

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {path: 'app', element: <DashboardApp />},
        {path: 'courses', element: <Courses />},
        {path: 'categories', element: <Categories />},
        {path: 'cohorts', element: <Cohorts />},
        {path: 'cohorts/add', element: <AddCohort />},
        {path: 'cohorts/:id', element: <EditCohort />},
        {path: 'users/permissions', element: <Permissions />},
        {path: 'users/accounts', element: <Accounts />},
        {path: 'users/accounts/add', element: <AddAccount />},
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
