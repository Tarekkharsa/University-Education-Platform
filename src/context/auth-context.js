import * as React from 'react'
import {QueryClient} from 'react-query'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'

async function bootstrapAppData() {
  const queryCache = new QueryClient()
  let user = null

  const token = await auth.getToken()
  const id = await auth.getID()
  if (token && id) {
    const data = await client(`getUserById?id=${id}`, {token})
    queryCache.setQueryData('user', data.data, {
      staleTime: 5000,
    })

    user = {
      ...data.data,
      token,
      permissions: data.data.roles.map(role => role.name),
    }
  }
  return user
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()
  const queryCache = new QueryClient()
  React.useEffect(() => {
    const appDataPromise = bootstrapAppData()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    form =>
      auth.login(form).then(user => {
        setData({...user, permissions: user.roles.map(role => role.name)})
      }),
    [setData],
  )
  const register = React.useCallback(
    form =>
      auth
        .register(form)
        .then(user =>
          setData({...user, permissions: user.roles.map(role => role.name)}),
        ),
    [setData],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    queryCache.clear()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({user, login, logout, register}),
    [login, logout, register, user],
  )

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function useClient() {
  const {user} = useAuth()
  const token = user?.token
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {AuthProvider, useAuth, useClient}
