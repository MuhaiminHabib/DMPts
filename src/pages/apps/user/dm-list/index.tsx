/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useContext, SyntheticEvent } from 'react'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { AuthContext } from 'src/context/AuthContext'
import { useFetchDmListQuery } from 'src/store/query/userApi'
import { showErrorAlert } from 'src/utils/swal'
import { Box, Card, CardContent, CardHeader, Grid, Tab, Tabs, Typography } from '@mui/material'
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

// ** Vars
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const DmList = () => {
  // ** State

  const [value, setValue] = useState(0)

  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  // ** Hooks

  const auth = useContext(AuthContext)

  const {
    isLoading: isLoadingFetchDmList,
    isError: isErrorFetchDmList,
    error: errorFetchDmListError,
    data: dmList
  } = useFetchDmListQuery()

  // **Functions
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  if (isErrorFetchDmList) {
    showErrorAlert({ error: errorFetchDmListError })
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            {auth.user!.role === 'BA' ? (
              <CardHeader title='Digital Managers' action={<TableHeader toggle={toggleAddUserDrawer} />} />
            ) : (
              <CardHeader title='Digital Managers' />
            )}
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                    <Tab label='Active Digital Managers' {...a11yProps(0)} />
                    {/* <Tab label='Inactive Digital Managers' {...a11yProps(1)} /> */}
                  </Tabs>
                </Box>
                {dmList && dmList.length !== 0 && (
                  <TabPanel value={value} index={0}>
                    <UserListTable
                      title={'Active Digital Managers'}
                      userList={dmList.filter(user => user.active)}
                      showLoading={isLoadingFetchDmList}
                      showHeader={auth.user!.role === 'BA'}
                      showEditBtn={auth.user!.role === 'BA'}
                      showDeleteBtn={auth.user!.role === 'BA'}
                    />
                  </TabPanel>
                )}

                {/* 
                {dmList && dmList.length !== 0 && (
                <TabPanel value={value} index={1}>
                  <UserListTable 
                    title={'Inactive Digital Managers'} 
                    userList={dmList.filter(user => (!user.active))} 
                    showLoading={isLoadingFetchDmList || isLoadingFetchDmListForBa}
                    />
                </TabPanel>
                )} */}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} addDm={auth.user!.role === 'BA'} />
      </Grid>
    </>
  )
}

DmList.acl = {
  action: 'read',
  subject: 'dm-list-page'
}

export default DmList
