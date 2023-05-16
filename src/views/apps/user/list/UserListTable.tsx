import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

//icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Diversity3Icon from '@mui/icons-material/Diversity3'



import React, { useContext, useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import { UsersType } from 'src/types/apps/userTypes'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import axiosConfig from 'src/configs/axios'
import { useDispatch } from 'react-redux'
import { baDeleteC, baDeleteDm, inactiveBa } from 'src/store/apps/user'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import Loader from '../../../../shared-components/Loader'
import UserEditModal from 'src/views/apps/user/list/UserEditModal'
import { AuthContext } from 'src/context/AuthContext'
import UserProfileModal from './UserProfileModal'
import { useBaDeletesCMutation, useBaDeletesDmMutation, useInactivateBaMutation } from 'src/store/query/userApi'


type props = {
  title: string
  userList: UsersType[]
  showAccociatedBtn?: boolean
  showHeader?: boolean
  showDeleteBtn? : boolean
  showLoading?: boolean
  addClient?: boolean
  addDm?: boolean

}

const UserListTable = ({
  title,
  userList,
  showAccociatedBtn = false,
  showHeader = false,
  showDeleteBtn = false,
  showLoading = false,
  addClient = false,
  addDm = false,

}: props) => {

  // ** States
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)


  // ** Hooks
  // const { isLoading } = useSelector((state: RootState) => state.user)
  const [baDeletesDm, {
    isLoading: isLoadingBaDeletesDm, 
    isError : isErrorBaDeletesDm, 
    error: errorBaDeletesDm, 
    data: baDeletesDmData}] = useBaDeletesDmMutation()
  const [baDeletesC, {
    isLoading: isLoadingBaDeletesC, 
    isError :isErrorBaDeletesC, 
    error: errorBaDeletesC, 
    data: baDeletesCData}] = useBaDeletesCMutation()
  const [inactivateBa, {
    isLoading: isLoadingInactivateBa, 
    isError :isErrorInactivateBa, 
    error: errorInactivateBa, 
    data: inactivateBaData}] = useInactivateBaMutation()


useEffect(() => {
  console.log('useEffect clients are:', userList)
}, [])
  // ** Functions
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const dispatch = useDispatch()


  const handleDelete = async (id: string, role: string, username: string) => {
    console.log('role is:', role) 
    if(role === 'BA') {
      const data = {
        BAID: id,
        username
      }
      // dispatch(inactiveBa(data))
      inactivateBa(data)
    } else if(role === 'DM') {
      baDeletesDm(id)
    } else if (role === 'C') {
      baDeletesC(id)
    }
  }


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box bgcolor={'red'} justifyItems={'center'} alignItems={'center'}></Box>

          <CardHeader title={title} />
          {showHeader ? <TableHeader toggle={toggleAddUserDrawer} /> : null}

          <TableContainer component={Paper}>
          {isLoadingBaDeletesC || isLoadingBaDeletesDm || isLoadingInactivateBa || showLoading ? <Loader /> : 
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>username</TableCell>
                  <TableCell align='right'>Email</TableCell>
                  <TableCell align='right'>FirstName</TableCell>
                  <TableCell align='right'>LastName</TableCell>
                  <TableCell align='right'>actions</TableCell>
                </TableRow>
              </TableHead>
                
              <TableBody>
                {userList?.map(user => (
                  <TableRow
                    key={user._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      background: !user.active && '#c1c1c1'
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {user.username}
                    </TableCell>
                    <TableCell align='right'>{user.email}</TableCell>
                    <TableCell align='right'>{user.firstName}</TableCell>
                    <TableCell align='right'>{user.lastName}</TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Profile' placement='top-start'>
                        <UserProfileModal user={user}/>
                      </Tooltip>

                      {showAccociatedBtn ? (
                        <Tooltip title='Accociated Users' placement='top-start'>
                          <Button href={`/apps/user/associated-user-list/${user._id}`} startIcon={<Diversity3Icon />} />
                        </Tooltip>
                      ) : null}

                      <Tooltip title='Edit User Details' placement='top-start'>
                        <UserEditModal user={user}/>
                      </Tooltip>

                      {showDeleteBtn ? (<Tooltip title='Delete User' placement='top-start'>
                        <Button
                          onClick={() => handleDelete(user._id, user.role, user.username)}
                          startIcon={<DeleteForeverIcon />}
                        />
                      </Tooltip>) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
                }
            
          </TableContainer>
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} addClient={addClient} addDm={addDm}/>
    </Grid>
  )
}

export default UserListTable
