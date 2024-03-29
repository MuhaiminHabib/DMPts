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
import RestoreIcon from '@mui/icons-material/Restore'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'
import React from 'react'
import { UsersType } from 'src/types/apps/userTypes'
import { Loader } from '../../../../shared-components/Loader'
import UserEditModal from 'src/views/apps/user/list/UserEditModal'
import UserProfileModal from './UserProfileModal'
import {
  useActivateBaMutation,
  useBaDeletesCMutation,
  useBaDeletesDmMutation,
  useCDeletesCmMutation,
  useInactivateBaMutation
} from 'src/store/query/userApi'
import Swal from 'sweetalert2'
import { showDeleteSuccessAlert, showErrorAlert } from 'src/utils/swal'

type props = {
  title: string
  userList: UsersType[]
  showAccociatedBtn?: boolean
  showHeader?: boolean
  showDeleteBtn?: boolean
  showEditBtn?: boolean
  showActivateBtn?: boolean
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
  showEditBtn = false,
  showActivateBtn = false,
  showLoading = false
}: props) => {
  // ** States

  // ** Hooks

  const [
    activateBa,
    { isLoading: isLoadingActivateBa, isError: ActivateBaIsError, error: activateBaError, data: activateBaData }
  ] = useActivateBaMutation()
  const [
    inactivateBa,
    { isLoading: isLoadingInactivateBa, isError: isErrorInactivateBa, error: inactivateBaError, data: inactivateBaData }
  ] = useInactivateBaMutation()
  const [
    baDeletesDm,
    { isLoading: isLoadingBaDeletesDm, isError: isErrorBaDeletesDm, error: baDeletesDmError, data: baDeletesDmData }
  ] = useBaDeletesDmMutation()
  const [
    baDeletesC,
    { isLoading: isLoadingBaDeletesC, isError: isErrorBaDeletesC, error: baDeletesCError, data: baDeletesCData }
  ] = useBaDeletesCMutation()
  const [
    cDeletesCm,
    { isLoading: isLoadingCDeletesCm, isError: isErrorCDeletesCm, error: cDeletesCmError, data: cDeletesCmData }
  ] = useCDeletesCmMutation()

  // ** Functions

  const showDeleteConfirmationPopup = (id: string, role: string, username: string) => {
    Swal.fire({
      title: `Do you want to ${role === 'BA' ? 'inactive' : 'delete'} ${username}?`,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      denyButtonText: `Cancel`
    }).then(result => {
      if (result.isConfirmed) {
        handleDelete(id, role, username)
      }
    })
  }

  const showActivateConfirmationPopup = (id: string, username: string) => {
    Swal.fire({
      title: `Do you want to activate ${username}?`,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      denyButtonText: `Cancel`
    }).then(result => {
      if (result.isConfirmed) {
        handleUserActivation(id)
      }
    })
  }

  const handleUserActivation = (id: string) => {
    activateBa(id)
  }

  const handleDelete = (id: string, role: string, username: string) => {
    console.log('role is:', role)
    if (role === 'BA') {
      const data = {
        BAID: id,
        username
      }
      inactivateBa(data)
    } else if (role === 'DM') {
      baDeletesDm(id)
    } else if (role === 'C') {
      baDeletesC(id)
    } else if (role === 'CM') {
      cDeletesCm(id)
    }
  }

  if (inactivateBaData) {
    showDeleteSuccessAlert({ text: 'User Inactivated' })
  } else if (activateBaData) {
    showDeleteSuccessAlert({ text: 'User Activated' })
  } else if (baDeletesDmData || baDeletesCData || cDeletesCmData) {
    showDeleteSuccessAlert({ text: 'User Deleted' })
  } else if (isErrorInactivateBa || isErrorBaDeletesDm || isErrorBaDeletesC || isErrorCDeletesCm || ActivateBaIsError) {
    showErrorAlert({
      error: inactivateBaError || baDeletesDmError || baDeletesCError || cDeletesCmError || activateBaError
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box bgcolor={'red'} justifyItems={'center'} alignItems={'center'}></Box>
          <CardHeader title={title} />
          <TableContainer component={Paper}>
            {isLoadingBaDeletesC ||
            isLoadingBaDeletesDm ||
            isLoadingInactivateBa ||
            isLoadingCDeletesCm ||
            isLoadingActivateBa ||
            showLoading ? (
              <Loader />
            ) : (
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Index</TableCell>
                    <TableCell align='center'>Username</TableCell>
                    <TableCell align='center'>Email</TableCell>
                    <TableCell align='center'>First Name</TableCell>
                    <TableCell align='center'>Last Name</TableCell>
                    <TableCell align='center'>actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {userList?.map((user, i) => (
                    <TableRow
                      key={user._id}
                      sx={{
                        '&:child td': { background: !user.active ? '#c1c1c1' : '000000' },
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell component='th' scope='row'>
                        {user.username}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>

                      <TableCell align='right'>
                        <Tooltip title='Profile' placement='top-start'>
                          <UserProfileModal user={user} />
                        </Tooltip>

                        {showAccociatedBtn ? (
                          <Tooltip title='Accociated Users' placement='top-start'>
                            <Button
                              href={`/apps/user/associated-user-list/${user._id}`}
                              startIcon={<Diversity3Icon />}
                            />
                          </Tooltip>
                        ) : null}

                        {showEditBtn ? (
                          <Tooltip title='Edit User Details' placement='top-start'>
                            <UserEditModal user={user} />
                          </Tooltip>
                        ) : null}

                        {showDeleteBtn ? (
                          <Tooltip title={user.role === 'BA' ? 'Inactive User' : 'Delete User'} placement='top-start'>
                            <Button
                              onClick={() => showDeleteConfirmationPopup(user._id, user.role, user.username)}
                              startIcon={user.role === 'BA' ? <PersonRemoveAlt1Icon /> : <DeleteForeverIcon />}
                            />
                          </Tooltip>
                        ) : null}

                        {showActivateBtn ? (
                          <Tooltip title='Activate User' placement='top-start'>
                            <Button
                              onClick={() => showActivateConfirmationPopup(user._id, user.username)}
                              startIcon={<RestoreIcon />}
                            />
                          </Tooltip>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserListTable
