/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, useContext } from 'react'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchDmList, fetchDmListforBA } from 'src/store/apps/user'


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

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {dmList} = useSelector((state: RootState) => state.user)
  const auth = useContext(AuthContext)

  useEffect(() => {
    console.log(auth.user?.role)
    if(auth.user?.role === 'A') {
      dispatch(fetchDmList())
    } else {
      dispatch(fetchDmListforBA())
    }
  }, [])

  return (
    <UserListTable title={'All Digital Managers'} userList={dmList} showAccociatedBtn={true} showHeader={true} addDm={true}/>
  )
}

export default UserList
