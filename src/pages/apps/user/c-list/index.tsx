/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, useContext, SyntheticEvent } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { AuthContext } from 'src/context/AuthContext'
import { useFetchCListForBAQuery, useFetchCListForDMQuery, useFetchCListQuery } from 'src/store/query/userApi'
import { showErrorAlert } from 'src/utils/swal'
import { Box, Card, CardContent, CardHeader, Grid, Tab, Tabs, Typography } from '@mui/material'
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

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

// ** renders client column



const CList = () => {
  
  // ** State
  const [cList, setCList] = useState<UsersType[]>([])
  const [value, setValue] = useState(0)

  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

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
      setCList(cListData)
    } else if(auth.user?.role === 'BA' && cListForBaData) {
      setCList(cListForBaData)
    } else if(auth.user?.role === 'DM' && cListForDmData) {
      setCList(cListForDmData)
    }
  }, [cListData, cListForBaData, cListForDmData, auth])

  // **Functions 
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  if ((auth.user?.role === 'A' && isErrorCList) || (auth.user?.role === 'BA' && isErrorCListForBa) || (auth.user?.role === 'DM' && isErrorCListForDm)) {
    showErrorAlert({error: cListError || cListForBaError || cListForDmError})
  } 


  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
          {auth.user!.role === 'BA' ||  auth.user!.role === 'DM'? 
          <CardHeader title='Clients' action={
            <TableHeader toggle={toggleAddUserDrawer} /> }
            /> :
            <CardHeader title='Clients' />
          }
            
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                    <Tab label='Active Clients' {...a11yProps(0)} />
                    {/* <Tab label='Inactive Clients' {...a11yProps(1)} /> */}
                  </Tabs>
                </Box>
                {cList && cList.length !== 0 && (
                  <TabPanel value={value} index={0}>
                    <UserListTable 
                      title={'Active Clients'} 
                      userList={cList.filter(user => (user.active))} 
                      showLoading={isLoadingCList || isLoadingCListForBa || isLoadingCListForDm}
                      showEditBtn={auth.user!.role === "BA" || auth.user!.role === "DM"}
                      showDeleteBtn={auth.user!.role === "BA" }/>
                  </TabPanel>
                )}

                {/* {cList && cList.length !== 0 && (
                <TabPanel value={value} index={1}>
                  <UserListTable 
                    title={'Inactive Clients'} 
                    userList={cList.filter(user => (!user.active))} 
                    showLoading={isLoadingCList || isLoadingCListForBa || isLoadingCListForDm}
                    />
                </TabPanel>
                )} */}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} addClient={auth.user!.role=== 'BA' || auth.user!.role=== 'DM'}/>
      </Grid>
    </>
  )
}

CList.acl = {
  action: 'read',
  subject: 'c-list-page'
}

export default CList
