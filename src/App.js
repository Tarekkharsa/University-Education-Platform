import * as React from 'react'
import {useAuth} from './context/auth-context'
// theme
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
// components
import ScrollToTop from './components/ScrollToTop'
import {BaseOptionChartStyle} from './components/charts/BaseOptionChart'
import {FullPageSpinner} from 'components/lib'

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {user} = useAuth()
  console.log('user', user)
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <React.Suspense fallback={<FullPageSpinner />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </ThemeConfig>
  )
}

export {App}
