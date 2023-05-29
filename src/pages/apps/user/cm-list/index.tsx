/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { useFetchCmListForCQuery, useFetchCmListQuery } from 'src/store/query/userApi'
import { AuthContext } from 'src/context/AuthContext'
import { UsersType } from 'src/types/apps/userTypes'
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





const CmList = () => {
  
  // ** State
  const [cmList, setCmList] = useState<UsersType[]>([])
  const [value, setValue] = useState(0)

  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  // ** Hooks
const {user} = useContext(AuthContext)


const {isLoading, isError, error, data} = useFetchCmListQuery()
const {isLoading : isLoadingFetchCmListForC, 
  isError: isErrorFetchCmListForC, 
  error: fetchCmListForCError, 
  data: fetchCmListForCData} = useFetchCmListForCQuery()
  

  useEffect(() => {
    console.log(user?.role)
    if(user?.role === 'A' && data) {
      setCmList(data)
    } else if(user?.role === 'C' && fetchCmListForCData) {
      setCmList(fetchCmListForCData)
    }
  }, [data, fetchCmListForCData, user?.role])

  // **Functions
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>

          {user!.role === 'C' ? 
          <CardHeader title='Client Managers' action={
            <TableHeader toggle={toggleAddUserDrawer} /> }
            /> :
            <CardHeader title='Client Managers' />
          }
            
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                    <Tab label='Active Client Managers' {...a11yProps(0)} />
                    <Tab label='Inactive Client Managers' {...a11yProps(1)} />
                  </Tabs>
                </Box>
                {cmList && cmList.length !== 0 && (
                  <TabPanel value={value} index={0}>
                    <UserListTable 
                      title={'Active Client Managers'} 
                      userList={cmList.filter(user => (user.active))} 
                      showLoading={isLoading || isLoadingFetchCmListForC }
                      showHeader={true}
                      showDeleteBtn={true}/>
                  </TabPanel>
                )}

                {cmList && cmList.length !== 0 && (
                <TabPanel value={value} index={1}>
                  <UserListTable 
                    title={'Inactive Client Managers'} 
                    userList={cmList.filter(user => (!user.active))} 
                    showLoading={isLoading || isLoadingFetchCmListForC}
                    showActivateBtn= {true}
                    showDeleteBtn={false}/>
                </TabPanel>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} addClient={user!.role=== 'C'}/>
      </Grid>
    </>
  )
}

CmList.acl = {
  action: 'read',
  subject: 'cm-list-page'
}

export default CmList
