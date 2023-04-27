import {
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
  TableRow
} from '@mui/material'
import React, { useState } from 'react'
import TableHeader from './TableHeader'
import Link from 'src/@core/theme/overrides/link'
import { UsersType } from 'src/types/apps/userTypes'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import axiosConfig from 'src/configs/axios'

type props = {
  title: string
  userList: UsersType[]
  showAccociatedBtn?: boolean
}

const UserListTable = ({ title, userList, showAccociatedBtn = false }: props) => {
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const handleInactivateUser = async (userID: string, username: string) => {
    console.log(`i will inactive user ${userID}, and ${username}`)

    try {
      const res = await axiosConfig.post('/auth/inactive-ba', {
        BAID: userID,
        username: username
      })
      console.log(res)
      console.log('done')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={title} />
          <TableHeader toggle={toggleAddUserDrawer} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>username</TableCell>
                  <TableCell align='right'>Email</TableCell>
                  <TableCell align='right'>FirstName</TableCell>
                  <TableCell align='right'>LastName</TableCell>
                  <TableCell align='right'>type</TableCell>
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
                    <TableCell align='right'>{user.type}</TableCell>
                    <Button>Profile</Button>

                    {showAccociatedBtn ? (
                      <Button href={`/apps/user/associated-user-list/${user._id}`}>Accociated Users</Button>
                    ) : null}

                    <Button onClick={() => handleInactivateUser(user._id, user.username)}>Inactive User</Button>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

// UserListTable.defaultProps = {
//   showAccociatedBtn: false
// }

export default UserListTable
