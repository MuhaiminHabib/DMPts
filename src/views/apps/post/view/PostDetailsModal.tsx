// ** React Imports
import { Fragment, useState } from 'react'

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
import { Post } from 'src/types/apps/postTypes'
import { Typography } from '@mui/material'


type pageProps = {
    post : Post
}

const PostDetailsModal = ({post} : pageProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Button variant='outlined' onClick={handleClickOpen} startIcon={<AccountCircleIcon />} />
        

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle>
        <Typography variant={'h4'}>{post.title}</Typography>

        <DialogContentText>
            <Typography component={'span'} sx={{fontWeight : 'bold'}}>Posted On: </Typography>
            <Typography component={'span'}>{post.postingDate.substring(0, 10)}</Typography>
          </DialogContentText>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, architecto cum sed culpa odio amet consequuntur alias? Repellat iusto, voluptas magnam inventore consequatur nostrum maxime exercitationem reprehenderit adipisci repellendus! Cupiditate!
          </DialogContentText>
          <DialogContentText>
            <Typography component={'span'} sx={{fontWeight : 'bold'}}>Created By: </Typography>
            <Typography component={'span'}>habib </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='contained' onClick={handleClose}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default PostDetailsModal
