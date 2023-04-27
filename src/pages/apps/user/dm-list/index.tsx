/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'

import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import user, { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { Button, Paper, Table, TableContainer } from '@mui/material'
import axiosConfig from 'src/configs/axios'
import UserListTable from 'src/views/apps/user/list/UserListTable'

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

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 240,
    field: 'fullName',
    headerName: 'User',
    renderCell: ({ row }: CellType) => {
      const { username, email } = row
      console.log(username, email)

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href='/apps/user/view/account'>{username}</LinkStyled>
            <Typography noWrap variant='caption' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  }

  // {
  //   flex: 0.2,
  //   field: 'role',
  //   minWidth: 160,
  //   headerName: 'Role',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         <CustomAvatar
  //           skin='light'
  //           sx={{ mr: 3, width: 30, height: 30 }}
  //           color={userRoleObj[row.role].color as ThemeColor}
  //         >
  //           <Icon fontSize={18} icon={userRoleObj[row.role].icon} />
  //         </CustomAvatar>
  //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
  //           {row.role}
  //         </Typography>
  //       </Box>
  //     )
  //   }
  // },
  // {
  //   flex: 0.15,
  //   minWidth: 120,
  //   headerName: 'Plan',
  //   field: 'currentPlan',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'capitalize' }}>
  //         {row.currentPlan}
  //       </Typography>
  //     )
  //   }
  // },
  // {
  //   flex: 0.2,
  //   minWidth: 185,
  //   field: 'billing',
  //   headerName: 'Billing',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Typography noWrap sx={{ color: 'text.secondary' }}>
  //         {row.billing}
  //       </Typography>
  //     )
  //   }
  // },
  // {
  //   flex: 0.1,
  //   minWidth: 110,
  //   field: 'status',
  //   headerName: 'Status',
  //   renderCell: ({ row }: CellType) => {
  //     return <CustomChip rounded skin='light' size='small' label={row.status} color={userStatusObj[row.status]} />
  //   }
  // },
  // {
  //   flex: 0.1,
  //   minWidth: 90,
  //   sortable: false,
  //   field: 'actions',
  //   headerName: 'Actions',
  //   renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  // }
]

const UserList = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [userList, setUserList] = useState<UsersType[]>([])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan
      })
    )
  }, [dispatch, plan, role, status, value])

  useEffect(() => {
    const fetchBAList = async () => {
      const res = await axiosConfig.get('/auth/dm-list')
      console.log(res.data)
      setUserList(res.data)
    }
    fetchBAList()
  }, [])

  // const handleFilter = useCallback((val: string) => {
  //   setValue(val)
  // }, [])

  // const handleRoleChange = useCallback((e: SelectChangeEvent) => {
  //   setRole(e.target.value)
  // }, [])

  // const handlePlanChange = useCallback((e: SelectChangeEvent) => {
  //   setPlan(e.target.value)
  // }, [])

  // const handleStatusChange = useCallback((e: SelectChangeEvent) => {
  //   setStatus(e.target.value)
  // }, [])

  return <UserListTable title={'DM List'} userList={userList} showAccociatedBtn={true} />
}

export default UserList
