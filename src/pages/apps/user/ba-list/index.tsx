/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect } from 'react'

// import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Custom Table Components Imports
import axiosConfig from 'src/configs/axios'
import UserListTable from 'src/views/apps/user/list/UserListTable'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchBaList } from 'src/store/apps/user'
import { RootState, AppDispatch } from 'src/store'
import { useFetchBaListQuery } from 'src/store/query/userApi'
import { fi } from 'date-fns/locale'

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

  // **Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {baList} = useSelector((state: RootState) => state.user)

  const {isFetching, isError, data} = useFetchBaListQuery()


  useEffect(() => {
    dispatch(fetchBaList())
  }, [])

  if(isFetching) {
    console.log('getting data')
  } else if(isError) {
    console.log('error getting data')
  } else {
    console.log(data)
  }

  return <UserListTable title={'All Businesses'} userList={baList} showAccociatedBtn={true} showHeader={true} />
}

export default UserList
