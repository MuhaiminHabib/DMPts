// ** React Imports
import { createContext, useEffect, useState, ReactNode, useRef } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, UserDataType } from './types'
import { useLogoutMutation, useLoginMutation, useMeEndpointMutation } from 'src/store/query/authApi'
import { showErrorAlert } from 'src/utils/swal'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  const [login, { isError: loginIsError, error: loginError, data: loginData }] = useLoginMutation()

  const [meEndpoint, { isError: meEndpointIsError, error: meEndpointError, data: meEndpointData }] =
    useMeEndpointMutation()

  const [logout] = useLogoutMutation()

  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData !== 'undefined') {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const hasLoginBeenCalled = useRef(false)

  useEffect(() => {
    if (loginIsError) {
      // Handle login error
      onErrorLogin(loginError)
    } else if (loginData && !hasLoginBeenCalled.current) {
      onSuccessfulLogin(loginData)
      hasLoginBeenCalled.current = true
    }

    if (meEndpointIsError) {
      // Handle meEndpoint error
      onErrorMeEndpoint(meEndpointError)
    } else if (meEndpointData !== null) {
      onSuccessfulMeEndpoint(meEndpointData)
    }
  }, [loginData, meEndpointData, loginIsError, meEndpointIsError])

  const onSuccessfulMeEndpoint = (meEndpointData: any) => {
    setUser(meEndpointData)
    localStorage.setItem('userData', JSON.stringify(meEndpointData))
    setLoading(false)
    const returnUrl = router.query.returnUrl
    const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    router.replace(redirectURL as string)
  }

  const onErrorMeEndpoint = (error: any) => {
    setLoading(false)
    showErrorAlert({ error })
    localStorage.removeItem('userData')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    setUser(null)
    router.replace('/login')
  }

  const onSuccessfulLogin = (loginData: any) => {
    localStorage.setItem(authConfig.storageTokenKeyName, loginData.accesstoken)
    localStorage.setItem(authConfig.onTokenExpiration, loginData.refreshtoken)
    meEndpoint()
  }

  const onErrorLogin = (error: any) => {
    showErrorAlert({ error })
    setLoading(false)
    router.push('/login')
  }

  const handleLogin = (params: LoginParams) => {
    setLoading(true)
    login(params)
  }

  const handleLogout = () => {
    setUser(null)
    hasLoginBeenCalled.current = false
    localStorage.removeItem('userData')
    localStorage.removeItem(authConfig.storageTokenKeyName)
    localStorage.removeItem(authConfig.onTokenExpiration)
    logout()
    setLoading(false)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
