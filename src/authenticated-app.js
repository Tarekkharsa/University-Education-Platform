import {ErrorBoundary} from 'react-error-boundary'
import {Link as RouterLink, Route, Routes, useMatch} from 'react-router-dom'
import {ErrorMessage, FullPageErrorFallback} from './components/lib'
import {useAuth} from './context/auth-context'
import Router from './routes'

function ErrorFallback({error}) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

function AuthenticatedApp() {
  // const {user, logout} = useAuth()
  console.log('AuthenticatedApp')

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Router />
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
