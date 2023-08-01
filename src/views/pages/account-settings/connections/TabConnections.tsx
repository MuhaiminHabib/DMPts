// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports

import { Divider } from '@mui/material'
import { useFetchFbPageListQuery } from 'src/store/query/fbApi'
import ConnectionModal from './ConnectionModal'

interface SocialAccountsType {
  id: number
  title: string
  logo: string
}

//States
const socialAccountsArr: SocialAccountsType[] = [
  {
    id: 1,
    title: 'Facebook',
    logo: '/images/logos/facebook.png'
  }

  // {
  //   title: 'Instagram',
  //   logo: '/images/logos/instagram.png'
  // }
]

const TabConnections = () => {
  //Hooks

  const { data: FbPageList } = useFetchFbPageListQuery()

  //Functions

  if (FbPageList) {
    console.log('list is:', FbPageList)
  }

  return (
    <Grid container spacing={6}>
      {/* Social Accounts Cards */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Social Accounts' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>Choose a social network to add an account</Typography>

            {socialAccountsArr.map(account => (
              <Box
                key={account.id}
                sx={{
                  marginRight: 5,
                  marginBottom: 5
                }}
              >
                <ConnectionModal account={account} />
              </Box>
            ))}
          </CardContent>

          <Divider sx={{ my: theme => `${theme.spacing(1)} !important` }} />

          {/* Connected Accounts Cards */}
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Display content from your connected accounts on your site
            </Typography>

            {FbPageList
              ? FbPageList.map(fbPage => (
                  <Button
                    key={fbPage.id}
                    variant='outlined'
                    sx={{
                      px: 2,
                      marginRight: 5,
                      marginBottom: 5
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 360
                      }}
                    >
                      <Box sx={{ mr: 4, display: 'flex', justifyContent: 'center' }}>
                        <img src={'/images/logos/facebook.png'} alt={fbPage.name} height='30' width='30' />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                        <Typography>{fbPage.name}</Typography>
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                          FaceBook Page
                        </Typography>
                      </Box>
                      <Button>X</Button>
                    </Box>
                  </Button>
                ))
              : null}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabConnections
