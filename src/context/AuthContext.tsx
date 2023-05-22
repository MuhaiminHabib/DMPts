// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'


// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, UserDataType } from './types'
import { useLogoutMutation, useLoginMutation, useMeEndpointMutation } from 'src/store/query/authApi'


// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  const [login, 
    {isLoading: loginIsLoading, 
      isError: loginIsError, 
      error: loginError, 
      data: loginData}
  ] = useLoginMutation()

  const [meEndpoint, 
    {isLoading: meEndpointIsLoading, 
      isError: meEndpointIsError, 
      error: meEndpointError, 
      data: meEndpointData}
  ] = useMeEndpointMutation()

  const [logout, 

    {isLoading: logoutIsLoading, 
      isError: logoutIsError,
       error: logoutError,
        data: logoutData}
  ] = useLogoutMutation()

  useEffect(() => {
    if(isLoggedIn) {
      const initAuth = async (): Promise<void> => {
        const userData = localStorage.getItem('userData')!
        if (!userData || userData === 'undefined') {
          setLoading(true)
          meEndpoint()
        } else {
          setUser(JSON.parse(userData))
          setLoading(false)
        }
      }
      initAuth()
    }
  }, [isLoggedIn])

  useEffect(() => {
    onSuccessMeEndpoint(meEndpointData)
  }, [meEndpointData])

  useEffect(() => {
    onErrorMeEndpoint(meEndpointError)
  }, [meEndpointIsError])

  useEffect(() => {
    if(loginData) {
      onSuccessLogin(loginData)
    }
  }, [loginData])

   const onSuccessfulLogout = () => {
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      window.localStorage.removeItem(authConfig.onTokenExpiration)
      setIsLoggedIn(false)
      setLoading(false)
      router.push('/login')
   }

  
  const onSuccessMeEndpoint = (meEndpointData: any) => {
    console.log('me endpoint data', meEndpointData)
    setUser(meEndpointData)
    window.localStorage.setItem('userData', JSON.stringify(meEndpointData))
    const returnUrl = router.query.returnUrl
    const redirectURL = returnUrl && returnUrl !== '/dashboards/analytics/' ? returnUrl : '/dashboards/analytics/'
    setLoading(false)
    router.replace(redirectURL as string)
  }
  
  const onErrorMeEndpoint = (meEndpointError: any) => {
    console.log('meEndpointError', meEndpointError)
    setLoading(false)
    localStorage.removeItem('userData')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    setUser(null)
    router.replace('/login')
    if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
      console.log('routing to login page')
    }
  }

  const onSuccessLogin = (loginData: any) => {
    console.log(loginData)
    if (rememberMe) {
      window.localStorage.setItem(authConfig.storageTokenKeyName, loginData.accesstoken)
      window.localStorage.setItem(authConfig.onTokenExpiration, loginData.refreshtoken)
    }
    setIsLoggedIn(true)
  }



  const handleLogin = (params: LoginParams) => {
    setLoading(true)
    const {rememberMe} = params
    setRememberMe(rememberMe!)
    login(params)
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    console.log('i am here in logout')
    onSuccessfulLogout()

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
