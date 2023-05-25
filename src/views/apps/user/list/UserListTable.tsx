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


//icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import RestoreIcon from '@mui/icons-material/Restore';
import React, { useState } from 'react'
import TableHeader from './TableHeader'
import { UsersType } from 'src/types/apps/userTypes'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import Loader from '../../../../shared-components/Loader'
import UserEditModal from 'src/views/apps/user/list/UserEditModal'
import UserProfileModal from './UserProfileModal'
import { useActivateBaMutation, useBaDeletesCMutation, useBaDeletesDmMutation, useCDeletesCmMutation, useInactivateBaMutation } from 'src/store/query/userApi'


type props = {
  title: string
  userList: UsersType[]
  showAccociatedBtn?: boolean
  showHeader?: boolean
  showDeleteBtn? : boolean
  showActivateBtn? : boolean
  showLoading?: boolean
  addClient?: boolean
  addDm?: boolean
  addCm?: boolean

}

const UserListTable = ({
  title,
  userList,
  showAccociatedBtn = false,
  showDeleteBtn = false,
  showActivateBtn = false,
  showLoading = false,
  addClient = false,
  addDm = false,
  addCm = false,
  showHeader= false,

}: props) => {

  // ** States
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)


  // ** Hooks
  const [activateBa, {isLoading: isLoadingActivateBa}] = useActivateBaMutation()
  const [inactivateBa, {isLoading: isLoadingInactivateBa}] = useInactivateBaMutation()
  const [baDeletesDm, {isLoading: isLoadingBaDeletesDm}] = useBaDeletesDmMutation()
  const [baDeletesC, {isLoading: isLoadingBaDeletesC}] = useBaDeletesCMutation()
  const [cDeletesCm, {isLoading: isLoadingCDeletesCm}] = useCDeletesCmMutation()



  // ** Functions
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const handleUserActivation = (id: string) => {
    console.log('i will activate user')
    activateBa(id)
  }

  const handleDelete = (id: string, role: string, username: string) => {
    console.log('role is:', role) 
    if(role === 'BA') {
      const data = {
        BAID: id,
        username
      }
      inactivateBa(data)
    } else if(role === 'DM') {
      baDeletesDm(id)
    } else if (role === 'C') {
      baDeletesC(id)
    } else if (role === 'CM') {
      cDeletesCm(id)
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
          {isLoadingBaDeletesC || isLoadingBaDeletesDm || isLoadingInactivateBa || isLoadingCDeletesCm || showLoading ? <Loader /> : 
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
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
                      '&:child td' : {background: !user.active ? '#c1c1c1' : '000000'},
                      '&:last-child td, &:last-child th': { border: 0 },
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
                          <Button 
                          href={`/apps/user/associated-user-list/${user._id}`} 
                          startIcon={<Diversity3Icon />} />
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
                      {showActivateBtn ? (<Tooltip title='Activate User' placement='top-start'>
                        <Button
                          onClick={() => handleUserActivation(user._id)}
                          startIcon={<RestoreIcon />}
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

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} addClient={addClient} addDm={addDm} addCm={addCm}/>
    </Grid>
  )
}

export default UserListTable
