import * as React from 'react'
import {useAuth} from './context/auth-context'
// theme
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
// components
import ScrollToTop from './components/ScrollToTop'
import {BaseOptionChartStyle} from './components/charts/BaseOptionChart'
import {FullPageSpinner} from 'components/lib'
import {I18nProvider} from 'utils/i18n'
import {RecoilRoot} from 'recoil'

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {user} = useAuth()
  return (
    <RecoilRoot>
      <ThemeConfig>
        <I18nProvider>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <React.Suspense fallback={<FullPageSpinner />}>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
          </React.Suspense>
        </I18nProvider>
      </ThemeConfig>
    </RecoilRoot>
  )
}

export {App}
