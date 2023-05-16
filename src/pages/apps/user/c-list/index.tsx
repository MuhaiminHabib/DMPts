/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, useContext } from 'react'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports



// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'



import axiosConfig from 'src/configs/axios'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { AuthContext } from 'src/context/AuthContext'
import { useFetchCListForBAQuery, useFetchCListForDMQuery, useFetchCListQuery } from 'src/store/query/userApi'
import { showErrorAlert } from 'src/utils/swal'

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
  const [userList, setUserList] = useState<UsersType[]>([])
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {cList} = useSelector((state: RootState) => state.user)
  const auth = useContext(AuthContext)
  const {
    isLoading :isLoadingCList, 
    isError: isErrorCList, 
    error : cListError, 
    data: cListData} = useFetchCListQuery()

  const {
    isLoading :isLoadingCListForBa, 
    isError: isErrorCListForBa, 
    error : cListForBaError, 
    data: cListForBaData} = useFetchCListForBAQuery()
    
  const {
    isLoading :isLoadingCListForDm, 
    isError: isErrorCListForDm, 
    error : cListForDmError, 
    data: cListForDmData} = useFetchCListForDMQuery()
  

  useEffect(() => {
    console.log(auth.user?.role)
    if(auth.user?.role === 'A' && cListData) {
      setUserList(cListData)
    } else if(auth.user?.role === 'BA' && cListForBaData) {
      setUserList(cListForBaData)
    } else if(auth.user?.role === 'DM' && cListForDmData) {
      setUserList(cListForDmData)
    }
  }, [cListData, cListForBaData, cListForDmData, auth])

  // if(cListForBaData) {
  //   console.log('c list is:',cListForBaData)
  // } else 
  // if ((auth.user?.role === 'A' && isErrorCList) || (auth.user?.role === 'BA' && isErrorCListForBa) || (auth.user?.role === 'DM' && isErrorCListForDm)) {
  //   showErrorAlert({text: cListError!.data.errorMessage || cListForBaError!.data.errorMessage || cListForDmError!.data.errorMessage})
  // } 
  // else if(isLoading) {
  //   console.log('Loading')
  // }

  return (
    <UserListTable 
      title={'All Clients'} 
      userList={userList} 
      showAccociatedBtn={true} 
      showHeader={true} 
      addClient={true}
      showLoading={isLoadingCList || isLoadingCListForBa || isLoadingCListForDm} 
      showDeleteBtn={auth.user?.role === 'BA' ? true : false}/>
  )
}

export default UserList
