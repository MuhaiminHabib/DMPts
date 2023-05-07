/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, useContext } from 'react'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchCList, fetchCListforBA } from 'src/store/apps/user'


// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'



import axiosConfig from 'src/configs/axios'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { AuthContext } from 'src/context/AuthContext'

// import axiosConfig from 'src/configs/axios'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

// ** Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'bx:mobile-alt', color: 'error' },
  author: { icon: 'bx:cog', color: 'warning' },
  editor: { icon: 'bx:edit', color: 'info' },
  maintainer: { icon: 'bx:pie-chart-alt', color: 'success' },
  subscriber: { icon: 'bx:user', color: 'primary' }
}

interface CellType {
  row: UsersType
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** renders client column



const UserList = () => {
  // ** State

  // ** Hooksß
  const dispatch = useDispatch<AppDispatch>()
  const {cList} = useSelector((state: RootState) => state.user)
  const auth = useContext(AuthContext)

  useEffect(() => {
    console.log(auth.user?.role)
    if(auth.user?.role === 'A') {
      dispatch(fetchCList())
    } else if(auth.user?.role === 'BA') {
      dispatch(fetchCListforBA())
    }
  }, [])

  return (
    <UserListTable title={'All Clients'} userList={cList} showAccociatedBtn={true} showHeader={true} addClient={true}/>
  )
}

export default UserList
