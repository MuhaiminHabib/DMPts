/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, useContext } from 'react'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchDmList, } from 'src/store/apps/user'


// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'



import axiosConfig from 'src/configs/axios'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { AuthContext } from 'src/context/AuthContext'
import { useFetchDmListForBaQuery, useFetchDmListQuery } from 'src/store/query/userApi'
import Swal from 'sweetalert2'
import { SwalLoader, SwalSuccess } from 'src/shared-components/swal'
import { showAlert, showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'
import { error } from 'console'

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
    showErrorAlert({text: errorFetchDmListError!.errorMessage || errorFetchDmListForBa!.errorMessage})
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
