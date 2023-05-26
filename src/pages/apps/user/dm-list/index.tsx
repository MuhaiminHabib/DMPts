/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, useContext } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { AuthContext } from 'src/context/AuthContext'
import { useFetchDmListForBaQuery, useFetchDmListQuery } from 'src/store/query/userApi'
import { showErrorAlert } from 'src/utils/swal'




// ** Vars



const DmList = () => {
  // ** State

const [userList, setUserList] = useState<UsersType[]>([])

  // ** Hooks

  const auth = useContext(AuthContext)
  const {
    isLoading: isLoadingFetchDmList,
    isError: isErrorFetchDmList, 
    error: errorFetchDmListError,
    data : fetchDmListData} = useFetchDmListQuery()
  const {
    isLoading: isLoadingFetchDmListForBa, 
    isError: isErrorFetchDmListForBa, 
    error: errorFetchDmListForBa, 
    data : fetchDmListforBaData} = useFetchDmListForBaQuery()

  useEffect(() => {
    if(auth.user?.role === 'A' && fetchDmListData) {
      setUserList(fetchDmListData)
    } else if(auth.user?.role === 'BA' && fetchDmListforBaData) {
      setUserList(fetchDmListforBaData)
    }
  }, [fetchDmListforBaData, auth.user?.role, fetchDmListData ])


  

  if ((isErrorFetchDmList && auth.user?.role === 'A') || (isErrorFetchDmListForBa && auth.user?.role === 'BA')) {
    showErrorAlert({error: errorFetchDmListError || errorFetchDmListForBa})
  } 

  return (
    <UserListTable 
      title={'All Digital Managers'} 
      userList={userList} 
      showAccociatedBtn={true} 
      showHeader={true} 
      addDm={true}
      showLoading={isLoadingFetchDmList || isLoadingFetchDmListForBa}
      showDeleteBtn={auth.user?.role === 'BA' ? true : false}/>
  )
}

DmList.acl = {
  action: 'read',
  subject: 'dm-list-page'
}

export default DmList
