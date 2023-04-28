/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect } from 'react'

// import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Custom Table Components Imports
import axiosConfig from 'src/configs/axios'
import UserListTable from 'src/views/apps/user/list/UserListTable'

interface UserStatusType {
  [key: string]: ThemeColor
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const UserList = () => {
  // ** State

  const [userList, setUserList] = useState<UsersType[]>([])

  useEffect(() => {
    const fetchBAList = async () => {
      const res = await axiosConfig.get('/auth/ba-list')
      console.log(res.data)
      setUserList(res.data)
    }
    fetchBAList()
  }, [])

  return <UserListTable title={'BA List'} userList={userList} showAccociatedBtn={true} showHeader={true} />
}

export default UserList
