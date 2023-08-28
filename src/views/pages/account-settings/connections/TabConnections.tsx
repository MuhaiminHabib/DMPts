// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Divider } from '@mui/material'

// ** Icon Imports
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { useDeleteFbPageMutation, useFetchFbPageListQuery } from 'src/store/query/fbApi'
import ConnectionModal from './ConnectionModal'
import { Loader } from 'src/shared-components/Loader'
import Swal from 'sweetalert2'

interface SocialAccountsType {
  id: number
  title: string
}

//States
const socialAccountsArr: SocialAccountsType[] = [
  {
    id: 1,
    title: 'Add Facebook Page'
  }

  // {
  //   title: 'Instagram',
  //   logo: '/images/logos/instagram.png'
  // }
]

const TabConnections = () => {
  //Hooks

  const { isFetching, data: socialAccountsList } = useFetchFbPageListQuery()
  const [deleteFbPage] = useDeleteFbPageMutation()

  //Functions
  const showDeleteConfirmationPopup = (postId: string) => {
    Swal.fire({
      title: `Do you really want to delete this post?`,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      denyButtonText: `Cancel`
    }).then(result => {
      if (result.isConfirmed) {
        handleDelete(postId)
      }
    })
  }

  const handleDelete = (pageId: string) => {
    console.log('i will delete', pageId)
    deleteFbPage(pageId)
  }

  if (socialAccountsList) {
    console.log('list is:', socialAccountsList)
  }

  return (
    <Grid container spacing={6}>
      {/* Social Accounts Cards */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Add a new social account' />
          <CardContent>
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
          <CardHeader title='Connected social accounts' />
          <CardContent>
            {isFetching ? (
              <Loader />
            ) : socialAccountsList ? (
              socialAccountsList.map(socialAccount => (
                <Button
                  key={socialAccount._id}
                  variant='outlined'
                  sx={{
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={'/images/logos/facebook.png'} alt={socialAccount.name} height='30' />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'start',
                          justifyContent: 'start',
                          flexDirection: 'column',
                          textTransform: 'none'
                        }}
                      >
                        <Typography>{socialAccount.name}</Typography>
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                          Facebook Page
                        </Typography>
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                          Client: {socialAccount.client.username}
                        </Typography>
                      </Box>
                    </Box>
                    <Button onClick={() => showDeleteConfirmationPopup(socialAccount._id)}>
                      <DeleteForeverIcon color='error' fontSize='large' />
                    </Button>
                  </Box>
                </Button>
              ))
            ) : (
              'Please add a Page'
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabConnections
