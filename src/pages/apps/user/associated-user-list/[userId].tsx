/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useState, useEffect, MouseEvent, useCallback } from 'react'
import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import axiosConfig from 'src/configs/axios'
import { UsersType } from 'src/types/apps/userTypes'

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

const Hello = (props: TabPanelProps) => {
  const [DMList, setDMList] = useState<UsersType[]>([])
  const [CList, setCList] = useState<UsersType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { userId } = router.query

  useEffect(() => {
    handleFetchDMList()
  }, [])

  const [value, setValue] = React.useState(0)

  const handleFetchDMList = async () => {
    setIsLoading(true)
    try {
      const res = await axiosConfig.post('/auth/dms-belong-to-ba', {
        BAID: userId
      })
      console.log(res.data)
      setDMList(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleFetchCList = async () => {
    setIsLoading(true)
    const res = await axiosConfig.post('/auth/c-belongs-to-ba', {
      BAID: userId
    })
    console.log(res.data)
    setCList(res.data)
    setIsLoading(false)
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='BA Accociation' />
          <CardContent>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                  <Tab label='DM List' {...a11yProps(0)} />
                  <Tab label='Client List' {...a11yProps(1)} onClick={() => handleFetchCList()} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <UserListTable title={'Accociated DM'} userList={DMList} showLoading={isLoading} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <UserListTable title={'Accociated DM'} userList={CList} showLoading={isLoading} />
              </TabPanel>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

Hello.authGuard = false
Hello.guestGuard = false

export default Hello
