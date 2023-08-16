// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Config

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { Box, Divider, Typography } from '@mui/material'
import { useFetchCListQuery } from 'src/store/query/userApi'
import { useAddFbPageMutation } from 'src/store/query/fbApi'
import AddIcon from '@mui/icons-material/Add'

type account = {
  title: string
}

type inputProps = {
  account: account
}

const ConnectionModal = ({ account }: inputProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const { data: clientList } = useFetchCListQuery()

  useEffect(() => {
    if (clientList) {
      console.log('Client list is on modal is', clientList)
    }
  }, [clientList])

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [addFbPage] = useAddFbPageMutation()

  //Functions
  const login = async (cid: string) => {
    setOpen(false)
    try {
      await window.FB.login(
        res => {
          if (res.status === 'connected') {
            console.log('UAT is:', res.authResponse.accessToken)
            const token: string = res.authResponse.accessToken

            addFbPage({ token, cid })
          }
        },
        {
          scope: 'public_profile,pages_read_engagement,pages_show_list,pages_manage_posts'
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Button
        onClick={handleClickOpen}
        key={account.title}
        variant='outlined'
        sx={{
          marginRight: 5,
          marginBottom: 5
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: 250 }}>
          <Box sx={{ mr: 1, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
            {/* <img src={account.logo} alt={'img_alt'} height='30' /> */}
            <AddIcon sx={{ ml: -4 }} fontSize='large' />
          </Box>
          <div>
            <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
          </div>
        </Box>
      </Button>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle sx={{ background: '#f5f5f9' }}>
          <Typography variant={'h4'}>Select a client</Typography>
        </DialogTitle>

        <Divider sx={{ my: theme => `${theme.spacing(0)} !important` }} />
        <DialogContent>
          {clientList
            ? clientList.map(client => (
                <Button
                  onClick={() => login(client._id)}
                  key={client._id}
                  variant='outlined'
                  sx={{
                    marginRight: 5,
                    marginBottom: 5
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: 200 }}>
                    {/* <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                <img src={account.logo} alt={'img_alt'} height='30' />
              </Box> */}

                    <div>
                      <Typography sx={{ fontWeight: 500 }}>{client.username}</Typography>
                    </div>
                  </Box>
                </Button>
              ))
            : null}
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ConnectionModal
