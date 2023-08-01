// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'

// ** Config

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { Box, Typography } from '@mui/material'
import { UsersType } from 'src/types/apps/userTypes'
import { useFetchCListForBAQuery, useFetchCListForDMQuery, useFetchCListQuery } from 'src/store/query/userApi'
import { AuthContext } from 'src/context/AuthContext'
import { useAddFbPageMutation } from 'src/store/query/fbApi'

type account = {
  title: string
  logo: string
}

type inputProps = {
  account: account
}

const ConnectionModal = ({ account }: inputProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const auth = useContext(AuthContext)
  const [cList, setCList] = useState<UsersType[]>([])
  const { data: cListData } = useFetchCListQuery()
  const { data: cListForBaData } = useFetchCListForBAQuery()
  const { data: cListForDmData } = useFetchCListForDMQuery()

  useEffect(() => {
    console.log(auth.user?.role)
    if (auth.user?.role === 'A' && cListData) {
      setCList(cListData)
    } else if (auth.user?.role === 'BA' && cListForBaData) {
      setCList(cListForBaData)
    } else if (auth.user?.role === 'DM' && cListForDmData) {
      setCList(cListForDmData)
    }
  }, [cListData, cListForBaData, cListForDmData, auth])

  useEffect(() => {
    if (cList) {
      console.log('Client list is on modal is', cList)
    }
  }, [cList])

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [addFbPage] = useAddFbPageMutation()

  //Functions
  const login = async (cid: string) => {
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
        <Box sx={{ display: 'flex', alignItems: 'center', width: 200 }}>
          <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
            <img src={account.logo} alt={'img_alt'} height='30' />
          </Box>
          <div>
            <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
          </div>
        </Box>
      </Button>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle>
          <Typography variant={'h4'}>{account.title}</Typography>
        </DialogTitle>

        <DialogContent>
          {cList
            ? cList.map(client => (
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
