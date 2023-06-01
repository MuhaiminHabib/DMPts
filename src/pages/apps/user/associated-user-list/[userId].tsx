/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useEffect } from 'react'
import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import UserListTable from 'src/views/apps/user/list/UserListTable'
import { useCBelongToBaMutation, useDmsBelongToBaMutation } from 'src/store/query/userApi'

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
  //* States

  //* Hooks
  const { userId } = useRouter().query

  const [
    dmsBelongToBa,
    {
      isLoading: dmsBelongToBaIsLoading,

      // isError: dmsBelongToBaIsError,
      // error : dmsBelongToBaError,
      data: dmsBelongToBaData
    }
  ] = useDmsBelongToBaMutation()

  const [
    cBelongToBa,
    {
      isLoading: cBelongToBaIsLoading,

      // isError: cBelongToBaIsError,
      // error : cBelongToBaError,
      data: cBelongToBaData
    }
  ] = useCBelongToBaMutation()

  useEffect(() => {
    dmsBelongToBa(userId as string)
  }, [userId, dmsBelongToBa])

  const [value, setValue] = React.useState(0)

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
                  <Tab label='Client List' {...a11yProps(1)} onClick={() => cBelongToBa(userId as string)} />
                </Tabs>
              </Box>
              {dmsBelongToBaData && dmsBelongToBaData.length !== 0 && (
                <TabPanel value={value} index={0}>
                  <UserListTable
                    title={'Accociated Digital Managers'}
                    userList={dmsBelongToBaData}
                    showLoading={dmsBelongToBaIsLoading}
                  />
                </TabPanel>
              )}

              {cBelongToBaData && cBelongToBaData.length !== 0 && (
                <TabPanel value={value} index={1}>
                  <UserListTable
                    title={'Accociated Clients'}
                    userList={cBelongToBaData}
                    showLoading={cBelongToBaIsLoading}
                  />
                </TabPanel>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Hello
