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
  const [logout, 

    // {isLoading, isError, error, data}
  ] = useLogoutMutation()
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

  useEffect(() => {
    console.log('i am in useEffect')
    const initAuth = async (): Promise<void> => {
      const userData = localStorage.getItem('userData')!
      if (!userData || userData === 'undefined') {
        // call api
        setLoading(true)

        meEndpoint()

        // await axiosConfig
        //   .get(authConfig.meEndpoint, {
        //     headers: {
        //       accessToken: localStorage.getItem(authConfig.storageTokenKeyName)
        //     }
        //   })
        //   .then(async response => {
        //     setLoading(false)
        //     console.log('authcontext useEffect', response.data)
        //     setUser({ ...response.data })
        //     window.localStorage.setItem('userData', JSON.stringify(response.data))
        //     const returnUrl = router.query.returnUrl
        // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        // router.replace(redirectURL as string)
        //   })
        //   .catch(() => {
        //     localStorage.removeItem('userData')
        //     localStorage.removeItem('refreshToken')
        //     localStorage.removeItem('accessToken')
        //     setUser(null)
        //     setLoading(false)
        //     if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
        //       router.replace('/login')
        //     }
        //   })
      } else {
        // set user from localstorage
        setUser(JSON.parse(userData))
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  if(loginIsLoading) {
    console.log('Trying to login')
  } else if(loginIsError) {
    console.log(loginError)
  } else if(loginData) {
    console.log('login data for remember me is: ', loginData)
      if (rememberMe) {
      // window.localStorage.setItem(authConfig.storageTokenKeyName, loginData.accesstoken)
      // window.localStorage.setItem(authConfig.onTokenExpiration, loginData.refreshtoken)
    }
    setIsLoggedIn(true)
  }


  if(meEndpointIsLoading) {
    console.log('Trying to meEndpoint')
  } else if(meEndpointIsError) {
    console.log(meEndpointError)
  } else if(meEndpointData) {
        setLoading(false)
        console.log('me endpoint data', meEndpointData)
        setUser(meEndpointData)
        window.localStorage.setItem('userData', JSON.stringify(meEndpointData))
        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
  }


  const handleLogin = (params: LoginParams) => {
    const {rememberMe} = params
    setRememberMe(rememberMe!)
    login(params)


    // axiosConfig
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async response => {
    //     if (params.rememberMe) {
    //       window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accesstoken)
    //       window.localStorage.setItem(authConfig.onTokenExpiration, response.data.refreshtoken)
    //     }
    //     setIsLoggedIn(true)
    //   })
    //   .catch(err => {
    //     if (errorCallback) errorCallback(err)
    //   })
  }

  const handleLogout = () => {
    setUser(null)
    try {
      logout()
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      window.localStorage.removeItem(authConfig.onTokenExpiration)
      setIsLoggedIn(false)
      router.push('/login')
    } catch (error) {
      console.log('could not log out')
    }
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
