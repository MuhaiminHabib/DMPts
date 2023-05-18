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
import { useFetchBaListQuery } from 'src/store/query/userApi'
import Loader from 'src/shared-components/Loader'

interface UserStatusType {
  [key: string]: ThemeColor
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const BaList = () => {
  // ** State

  // **Hooks

  const {isLoading, isError, error, data : baList } = useFetchBaListQuery()


  if(isLoading) {
    console.log('getting data')
  } else if(isError) {
    console.log(error.data.errorMessage)
    console.log('error getting data')
  } else {
    console.log('rtk query data: ',baList)
  }

  if(isLoading) {
    return <Loader />
  }

  return (
    <UserListTable title={'All Businesses'} userList={baList!} showAccociatedBtn={true} showHeader={true}/>
      
  )
  
}
BaList.acl = {
  action: 'read',
  subject: 'ba-list-page'
}


export default BaList
