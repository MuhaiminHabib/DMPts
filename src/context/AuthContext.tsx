// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import axiosConfig from 'src/configs/axios'
import { useLogoutMutation } from 'src/store/query/authApi'

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

  // ** Hooks
  const router = useRouter()
  // const [logout, {isLoading, isError, error, data}] = useLogoutMutation()

  useEffect(() => {
    console.log('i am in useEffect')
    const initAuth = async (): Promise<void> => {
      const userData = localStorage.getItem('userData')!
      if (!userData || userData === 'undefined') {
        // call api
        setLoading(true)
        await axiosConfig
          .get(authConfig.meEndpoint, {
            headers: {
              accessToken: localStorage.getItem(authConfig.storageTokenKeyName)
            }
          })
          .then(async response => {
            setLoading(false)
            console.log('authcontext useEffect', response.data)
            setUser({ ...response.data })
            window.localStorage.setItem('userData', JSON.stringify(response.data))
            const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        // set user from localstorage
        setUser(JSON.parse(userData))
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])


  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axiosConfig
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        if (params.rememberMe) {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accesstoken)
          window.localStorage.setItem(authConfig.onTokenExpiration, response.data.refreshtoken)
        }
        setIsLoggedIn(true)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    try {
      axiosConfig.get('/API/auth/logout')
      // logout()
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
