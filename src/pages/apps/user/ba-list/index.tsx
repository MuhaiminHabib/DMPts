/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import React, { useState, useEffect, SyntheticEvent, useContext } from 'react'

import { Box, Card, CardContent, CardHeader, Grid, Tab, Tabs, Typography } from '@mui/material'

// import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Custom Table Components Imports

import UserListTable from 'src/views/apps/user/list/UserListTable'

//redux
import { useFetchBaListQuery, useFetchInactiveBaListQuery } from 'src/store/query/userApi'
import Loader from 'src/shared-components/Loader'
import { showErrorAlert } from 'src/utils/swal'
import { truncateSync } from 'fs'
import { AuthContext } from 'src/context/AuthContext'

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

const BaList = (props: TabPanelProps) => {
  // ** State
  const [value, setValue] = useState(0)

  // **Hooks
  const {user} = useContext(AuthContext)


  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const {isLoading : baListIsLoading,
          isError : baListIsError,
          error: baListError,
          data : baList 
        } = useFetchBaListQuery()



  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Businesses' />
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                    <Tab label='Active Businesses' {...a11yProps(0)} />
                    <Tab label='Inactive Businesses' {...a11yProps(1)} />
                  </Tabs>
                </Box>
                {baList && baList.length !== 0 && (
                  <TabPanel value={value} index={0}>
                    <UserListTable 
                      title={'Active Businesses'} 
                      userList={baList.filter(user => (user.active))} 
                      showLoading={baListIsLoading}
                      showAccociatedBtn={true} 
                      showHeader={user!.role === 'A'}
                      showDeleteBtn={true}/>
                  </TabPanel>
                )}

                {baList && baList.length !== 0 && (
                <TabPanel value={value} index={1}>
                  <UserListTable 
                    title={'Inactive Businesses'} 
                    userList={baList.filter(user => (!user.active))} 
                    showLoading={baListIsLoading}
                    showAccociatedBtn={true} 
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
BaList.acl = {
  action: 'read',
  subject: 'ba-list-page'
}


export default BaList
