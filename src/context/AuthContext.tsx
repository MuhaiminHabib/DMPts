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

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
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
            // setUser({ ...response.data.userData })
            const myUserData = {
              id: response.data.userId,
              role: 'admin',
              email: 'string',
              fullName: 'habib',
              username: 'habib',
              password: 'Root@2023'
            }
            setUser({ ...myUserData })
            window.localStorage.setItem('userData', JSON.stringify(myUserData))
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
      // const storedToken = localStorage.getItem(authConfig.storageTokenKeyName)!
      // if (storedToken) {
      //   setLoading(true)
      //   await axiosConfig
      //     .get(authConfig.meEndpoint, {
      //       headers: {
      //         accessToken: localStorage.getItem(authConfig.storageTokenKeyName)
      //       }
      //     })
      //     .then(async response => {
      //       setLoading(false)
      //       setUser({ ...response.data.userData })
      //     })
      //     .catch(() => {
      //       localStorage.removeItem('userData')
      //       localStorage.removeItem('refreshToken')
      //       localStorage.removeItem('accessToken')
      //       setUser(null)
      //       setLoading(false)
      //       if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
      //         router.replace('/login')
      //       }
      //     })
      // } else {
      //   setLoading(false)
      // }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axiosConfig
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        if (params.rememberMe) {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accesstoken)
          window.localStorage.setItem(authConfig.onTokenExpiration, response.data.refreshtoken)
        }
        const returnUrl = router.query.returnUrl

        // setUser({ ...response.data.userData })
        const myUserData = {
          id: response.data.userId,
          role: 'admin',
          email: 'string',
          fullName: 'habib',
          username: 'habib',
          password: 'Root@2023'
        }
        setUser({ ...myUserData })

        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
        // params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(myUserData)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
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
