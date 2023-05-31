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

  const [
    meEndpoint,
    { isLoading: isLoadingMeEndpoint, isError: meEndpointIsError, error: meEndpointError, data: meEndpointData }
  ] = useMeEndpointMutation()

  const [logout] = useLogoutMutation()

  useEffect(() => {
    const userData = localStorage.getItem('userData')!
    if (userData) {
      setUser(JSON.parse(userData))
      setLoading(false)
    }
  }, [])

  const hasLoginBeenCalled = useRef(false)

  useEffect(() => {
    // if (loginData && !hasLoginBeenCalled.current) {
    //   onSuccessfulLogin(loginData)
    //   hasLoginBeenCalled.current = true
    // }
    // if (meEndpointData) onSuccessfulMeEndpoint(meEndpointData)

    if (loginIsError) {
      // Handle login error
      showErrorAlert({ error: loginError })
      setLoading(false)
    } else if (loginData && !hasLoginBeenCalled.current) {
      onSuccessfulLogin(loginData)
      hasLoginBeenCalled.current = true
    }

    if (meEndpointIsError) {
      // Handle meEndpoint error
      showErrorAlert({ error: meEndpointError })
      setLoading(false)
    } else if (meEndpointData) {
      onSuccessfulMeEndpoint(meEndpointData)
    }
  }, [loginData, meEndpointData])

  // useEffect(() => {
  //   if (meEndpointError) onErrorMeEndpoint(meEndpointError)
  //   if (loginData) onSuccessfulLogin(loginData)
  //   if (meEndpointData) onSuccessMeEndpoint(meEndpointData)
  //   if (loginIsError) {
  //     setLoading(false)
  //     console.log('loginError', loginError)
  //     showErrorAlert({ error: loginError })
  //     router.push('/login')
  //   }
  // }, [meEndpointIsError, meEndpointError, loginData, meEndpointData, loginIsError, loginError])

  const onSuccessfulMeEndpoint = (meEndpointData: any) => {
    setUser(meEndpointData)
    localStorage.setItem('userData', JSON.stringify(meEndpointData))
    setLoading(false)
    const returnUrl = router.query.returnUrl
    const redirectURL = returnUrl && returnUrl !== '/dashboards/analytics/' ? returnUrl : '/dashboards/analytics/'
    router.replace(redirectURL as string)
  }

  // const onErrorMeEndpoint = (meEndpointError: any) => {
  //   alert('me endpoint error')
  //   setLoading(false)
  //   localStorage.removeItem('userData')
  //   localStorage.removeItem('refreshToken')
  //   localStorage.removeItem('accessToken')
  //   setUser(null)
  //   router.replace('/login')
  // }

  const onSuccessfulLogin = (loginData: any) => {
    localStorage.setItem(authConfig.storageTokenKeyName, loginData.accesstoken)
    localStorage.setItem(authConfig.onTokenExpiration, loginData.refreshtoken)
    meEndpoint()
  }

  const handleLogin = (params: LoginParams) => {
    setLoading(true)
    login(params)
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    localStorage.removeItem('userData')
    localStorage.removeItem(authConfig.storageTokenKeyName)
    localStorage.removeItem(authConfig.onTokenExpiration)
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
