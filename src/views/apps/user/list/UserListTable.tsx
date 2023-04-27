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

type props = {
  title: string
  userList: UsersType[]
}

const UserListTable = ({ title, userList }: props) => {
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={title} />
          {/* <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} /> */}
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
                  <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {user.username}
                    </TableCell>
                    <TableCell align='right'>{user.email}</TableCell>
                    <TableCell align='right'>{user.firstName}</TableCell>
                    <TableCell align='right'>{user.lastName}</TableCell>
                    <TableCell align='right'>{user.type}</TableCell>
                    <Button>Profile</Button>

                    <Button href={`/apps/user/associated-user-list/${user._id}`}>Accociated Users</Button>

                    <Button>Inactive User</Button>
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

export default UserListTable
