/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, useContext } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { AuthContext } from 'src/context/AuthContext'
import { useFetchCListForBAQuery, useFetchCListForDMQuery, useFetchCListQuery } from 'src/store/query/userApi'
import { showErrorAlert } from 'src/utils/swal'


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



const CList = () => {
  
  // ** State
  const [userList, setUserList] = useState<UsersType[]>([])

  // ** Hooks

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


  if ((auth.user?.role === 'A' && isErrorCList) || (auth.user?.role === 'BA' && isErrorCListForBa) || (auth.user?.role === 'DM' && isErrorCListForDm)) {
    showErrorAlert({text: cListError!.data.errorMessage || cListForBaError!.data.errorMessage || cListForDmError!.data.errorMessage})
  } 


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

CList.acl = {
  action: 'read',
  subject: 'c-list-page'
}

export default CList
