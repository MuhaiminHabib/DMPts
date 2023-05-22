/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useContext, useEffect, useState } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { useFetchCmListForCQuery, useFetchCmListQuery } from 'src/store/query/userApi'
import { AuthContext } from 'src/context/AuthContext'
import { UsersType } from 'src/types/apps/userTypes'







const CmList = () => {
  
  // ** State
  const [userList, setUserList] = useState<UsersType[]>([])

  // ** Hooks
const {user} = useContext(AuthContext)

const {isLoading, isError, error, data} = useFetchCmListQuery()
const {isLoading : isLoadingFetchCmListForC, 
  isError: isErrorFetchCmListForC, 
  error: fetchCmListForCError, 
  data: fetchCmListForCData} = useFetchCmListForCQuery()
  

  useEffect(() => {
    console.log(user?.role)
    if(user?.role === 'A' && data) {
      setUserList(data)
    } else if(user?.role === 'C' && fetchCmListForCData) {
      setUserList(fetchCmListForCData)
    }
  }, [data, fetchCmListForCData, user?.role])

  return (
    <UserListTable title={'All Clients Managers'} userList={userList} showAccociatedBtn={true} addCm={true} showDeleteBtn={user?.role === 'C'}/>
  )
}

CmList.acl = {
  action: 'read',
  subject: 'cm-list-page'
}

export default CmList
