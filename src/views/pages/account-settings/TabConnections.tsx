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

import { baseURL } from 'src/utils/constants'

interface ConnectedAccountsType {
  title: string
  logo: string
  subtitle: string
}

interface SocialAccountsType {
  title: string
  logo: string
}

const socialAccountsArr: SocialAccountsType[] = [
  {
    title: 'Facebook',
    logo: '/images/logos/facebook.png'
  }

  // {
  //   title: 'Instagram',
  //   logo: '/images/logos/instagram.png'
  // }
]

const connectedAccountsArr: ConnectedAccountsType[] = [
  {
    title: 'Test Facebook Page Name',
    logo: '/images/logos/google.png',
    subtitle: 'Facebook Page'
  },
  {
    title: 'Test2 Facebook Page Name',
    logo: '/images/logos/slack.png',
    subtitle: 'Facebook Page'
  },
  {
    title: 'Test3 Facebook Page Name',
    logo: '/images/logos/github.png',
    subtitle: 'Facebook Page'
  },
  {
    title: 'Test4 Facebook Page Name',
    subtitle: 'Facebook Page',
    logo: '/images/logos/mail-chimp.png'
  },
  {
    title: 'Test5 Facebook Page Name',
    subtitle: 'Facebook Page',
    logo: '/images/logos/asana.png'
  }
]

const TabConnections = () => {
  const getTokenFromBe = async (token: string) => {
    const response = await fetch(`${baseURL}/API/fb-api/get-fb-info?token=${token}`)

    const data = await response.json()
    console.log('data is:', data)
  }

  const login = async () => {
    try {
      await window.FB.login(
        res => {
          if (res.status === 'connected') {
            console.log('UAT is:', res.authResponse.accessToken)

            getTokenFromBe(res.authResponse.accessToken)
          }
        },
        {
          scope: 'public_profile,pages_read_engagement,pages_show_list'
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  // const getPagesPermission = async () => {
  //   try {
  //     await window.FB.login(
  //       res => {
  //         if (res.status === 'connected') {
  //           console.log('UAT is:', res.authResponse.accessToken)

  //           getTokenFromBe(res.authResponse.accessToken)
  //         }
  //       },
  //       {
  //         scope: 'pages_read_engagement'
  //       }
  //     )
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <Grid container spacing={6}>
      {/* Social Accounts Cards */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Social Accounts' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>Choose a social network to add an account</Typography>

            {socialAccountsArr.map(account => (
              <Button
                onClick={login}
                key={account.title}
                variant='outlined'
                sx={{
                  marginRight: 5,
                  marginBottom: 5
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: 200 }}>
                  <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                    <img src={account.logo} alt={account.title} height='30' />
                  </Box>
                  <div>
                    <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
                  </div>
                </Box>
              </Button>
            ))}
            {/* <Button
              onClick={getPagesPermission}
              variant='outlined'
              sx={{
                marginRight: 5,
                marginBottom: 5
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: 200 }}>
                <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                    <img src={account.logo} alt={account.title} height='30' />
                  </Box>
                <div>
                  <Typography sx={{ fontWeight: 500 }}>Hit pages_read_engagement</Typography>
                </div>
              </Box>
            </Button> */}
          </CardContent>

          <Divider sx={{ my: theme => `${theme.spacing(1)} !important` }} />

          {/* Connected Accounts Cards */}
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Display content from your connected accounts on your site
            </Typography>

            {connectedAccountsArr.map(account => (
              <Button
                key={account.title}
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
                    <img src={account.logo} alt={account.title} height='30' width='30' />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                    <Typography>{account.title}</Typography>
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      {account.subtitle}
                    </Typography>
                  </Box>
                  <Button>X</Button>
                </Box>
              </Button>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabConnections
