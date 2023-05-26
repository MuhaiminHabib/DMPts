/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, useContext, SyntheticEvent } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { AuthContext } from 'src/context/AuthContext'
import { useFetchDmListForBaQuery, useFetchDmListQuery } from 'src/store/query/userApi'
import { showErrorAlert } from 'src/utils/swal'
import { Box, Card, CardContent, CardHeader, Grid, Tab, Tabs, Typography } from '@mui/material'





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

const [dmList, setDmList] = useState<UsersType[]>([])
const [value, setValue] = useState(0)

  // ** Hooks

  const auth = useContext(AuthContext)


  const {
    isLoading: isLoadingFetchDmList,
    isError: isErrorFetchDmList, 
    error: errorFetchDmListError,
    data : fetchDmListData} = useFetchDmListQuery()
  const {
    isLoading: isLoadingFetchDmListForBa, 
    isError: isErrorFetchDmListForBa, 
    error: errorFetchDmListForBa, 
    data : fetchDmListforBaData} = useFetchDmListForBaQuery()


  useEffect(() => {
    if(auth.user?.role === 'A' && fetchDmListData) {
      setDmList(fetchDmListData)
    } else if(auth.user?.role === 'BA' && fetchDmListforBaData) {
      setDmList(fetchDmListforBaData)
    }
  }, [fetchDmListforBaData, auth.user?.role, fetchDmListData ])


  // **Functions
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  if ((isErrorFetchDmList && auth.user?.role === 'A') || (isErrorFetchDmListForBa && auth.user?.role === 'BA')) {
    showErrorAlert({error: errorFetchDmListError || errorFetchDmListForBa})
  } 


  return (
      <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Digital Managers' />
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                    <Tab label='Active Digital Managers' {...a11yProps(0)} />
                    <Tab label='Inactive Digital Managers' {...a11yProps(1)} />
                  </Tabs>
                </Box>
                {dmList && dmList.length !== 0 && (
                  <TabPanel value={value} index={0}>
                    <UserListTable 
                      title={'Active Digital Managers'} 
                      userList={dmList.filter(user => (user.active))} 
                      showLoading={isLoadingFetchDmList || isLoadingFetchDmListForBa}
                      showHeader={true}
                      showDeleteBtn={true}/>
                  </TabPanel>
                )}

                {dmList && dmList.length !== 0 && (
                <TabPanel value={value} index={1}>
                  <UserListTable 
                    title={'Inactive Digital Managers'} 
                    userList={dmList.filter(user => (!user.active))} 
                    showLoading={isLoadingFetchDmList || isLoadingFetchDmListForBa}
                    showActivateBtn= {true}
                    showDeleteBtn={false}/>
                </TabPanel>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

DmList.acl = {
  action: 'read',
  subject: 'dm-list-page'
}

export default DmList
