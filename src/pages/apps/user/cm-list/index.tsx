/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useEffect } from 'react'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchCmList } from 'src/store/apps/user'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { useFetchCmListQuery } from 'src/store/query/userApi'


interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

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

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {cmList} = useSelector((state: RootState) => state.user)

const {isLoading, isError, error, data} = useFetchCmListQuery()
  

  if(data) {
    console.log(data)
  } else if (isError) {
    console.log(error)
  } else if(isLoading) {
    console.log('Loading')
  }
  // useEffect(() => {
  //   dispatch(fetchCmList())
  // }, [])

  return (
    <UserListTable title={'All Clients Managers'} userList={data ? data: []} showAccociatedBtn={true} />
  )
}

export default UserList
