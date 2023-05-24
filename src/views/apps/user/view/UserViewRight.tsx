// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'


// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


// ** Types

import UsersViewTable from 'src/views/apps/user/view/UserViewRight'

interface Props {
  tab: string
  
  // invoiceData: InvoiceType[]
}

//  ** Styled TabList component
const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  minHeight: 40,
  marginBottom: theme.spacing(6),
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 40,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    '&.Mui-selected': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main
    }
  }
}))

const UserViewRight = ({ tab }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab)

  // const [isLoading, setIsLoading] = useState<boolean>(false)

  // ** Hooks
  const hideText = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return activeTab ? (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
      >
        <Tab
          value='DM'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
              <Icon icon='bx:lock-alt' />
              {!hideText && 'DM'}
            </Box>
          }
        />
        <Tab
          value='Clients'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
              <Icon icon='bx:detail' />
              {!hideText && 'Clients'}
            </Box>
          }
        />
      </TabList>
      <Box sx={{ '& .MuiTabPanel-root': { p: 0, border: 0, boxShadow: 0, backgroundColor: 'transparent' } }}>
        
        {/* {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : */}
         (
          <>
            <TabPanel value='DM'>
              <h1>Show DM list</h1>
              <UsersViewTable tab='DM'/>
            </TabPanel>
            <TabPanel value='Clients'>
              <h1>Show Clients list</h1>
              <UsersViewTable tab="Clients"/>
            </TabPanel>
          </>
        )
        
        {/* } */}
      </Box>
    </TabContext>
  ) : (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <CircularProgress sx={{ mb: 4 }} />
      <Typography>Loading...</Typography>
    </Box>
  )
}

export default UserViewRight
