/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import React, { useState, useEffect } from 'react'

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

  // **Hooks
  const [value, setValue] = React.useState(0)


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const {isLoading : activeBaListIsLoading,
          isError : activeBaListIsError,
          error: activeBaListError,
          data : activeBaList 
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
                {activeBaList && activeBaList.length !== 0 && (
                  <TabPanel value={value} index={0}>
                    <UserListTable 
                      title={'Active Businesses'} 
                      userList={activeBaList.filter(user => (user.active))} 
                      showLoading={activeBaListIsLoading}
                      showAccociatedBtn={true} 
                      showHeader={true}
                      showDeleteBtn={true}/>
                  </TabPanel>
                )}

                {activeBaList && activeBaList.length !== 0 && (
                <TabPanel value={value} index={1}>
                  <UserListTable 
                    title={'Inactive Businesses'} 
                    userList={activeBaList.filter(user => (!user.active))} 
                    showLoading={activeBaListIsLoading}
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
