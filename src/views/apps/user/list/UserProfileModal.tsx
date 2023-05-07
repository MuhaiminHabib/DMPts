// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { PostsTypes } from 'src/types/apps/postTypes'
import { Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import UserEditModal from './UserEditModal'
import { UsersType } from 'src/types/apps/userTypes'

type pageProps = {
    user: UsersType
}

const UserProfileModal = ({user} : pageProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClickOpen = () => setOpen(true)

  const handleProfileModalClose = () => setOpen(false)

  const handleClick = () => {
    setIsDisabled(true)
  }
 
  useEffect(() => {
    console.log(user)
  }, [])


  return (
    <Fragment>
      <Button variant='text' onClick={handleClickOpen} startIcon={<AccountCircleIcon />} />
      <Dialog fullScreen={fullScreen} open={open} onClose={handleProfileModalClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle>
          <DialogContentText>
            <Typography variant='h4' sx={{fontWeight : 'bold'}}>User Profile: </Typography>
          </DialogContentText>
        </DialogTitle>

        <DialogContent>
         <DialogContentText sx={{py: '10px'}}>
            <Typography component={'span'} sx={{fontWeight : 'bold'}}>User Name: </Typography>
            <Typography component={'span'}>{user.username}</Typography>
          </DialogContentText>
          <DialogContentText sx={{py: '10px'}}>
            <Typography component={'span'} sx={{fontWeight : 'bold'}}>Full Name: </Typography>
            <Typography component={'span'}>{`${user.firstName} ${user.lastName}`} </Typography>
          </DialogContentText>
          <DialogContentText sx={{py: '10px'}}>
            <Typography component={'span'} sx={{fontWeight : 'bold'}}>Email: </Typography>
            <Typography component={'span'}>{ user.email }</Typography>
          </DialogContentText>
          <DialogContentText sx={{py: '10px'}}>
            <Typography component={'span'} sx={{fontWeight : 'bold'}}>Role: </Typography>
            <Typography component={'span'}>
              { user.role === 'BA' ? 'Business Admin' : 
              user.role === 'DM' ? 'Digital Manager' : 
              user.role === 'C' ? 'Client' :
              user.role === 'CM' ? 'Client Manager' : null}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleProfileModalClose}>
            Close
          </Button>
          <Button variant='contained' size='small' disabled={isDisabled} onClick={handleClick}>
            <UserEditModal user={user} />
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default UserProfileModal
