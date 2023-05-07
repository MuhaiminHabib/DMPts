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



import React, { useContext, useState } from 'react'
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

type props = {
  title: string
  userList: UsersType[]
  showAccociatedBtn?: boolean
  showHeader?: boolean
  showLoading?: boolean
  addClient?: boolean
  addDm?: boolean
}

const UserListTable = ({
  title,
  userList,
  showAccociatedBtn = false,
  showHeader = false,
  showLoading = false,
  addClient = false,
  addDm = false
}: props) => {

  // ** States
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)


  // ** Hooks
  const { isLoading } = useSelector((state: RootState) => state.user)


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
      dispatch(inactiveBa(data))
    } else if(role === 'DM') {
      const data = {
        dmId : id
      }
      dispatch(baDeleteDm(data))  
    } else if (role === 'C') {
      const data = {
        cId : id
      }
      dispatch(baDeleteC(data))
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
          {isLoading || showLoading ? <Loader /> : 
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
                {userList.map(user => (
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

                      <Tooltip title='Delete User' placement='top-start'>
                        <Button
                          onClick={() => handleDelete(user._id, user.role, user.username)}
                          startIcon={<DeleteForeverIcon />}
                        />
                      </Tooltip>
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
