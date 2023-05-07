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
import { PostsTypes } from 'src/types/apps/postTypes'
import { Tooltip, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook';


type pageProps = {
    post : PostsTypes
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
      <Tooltip title="Post Details" placement='top-start'>
        <Button variant='text' onClick={handleClickOpen} startIcon={<MenuBookIcon />} />
      </Tooltip>
        

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
          <Typography component={'span'} sx={{fontWeight : 'bold'}}>Description: </Typography>
            <Typography component={'span'}>{post.description}</Typography>
          </DialogContentText>
          <DialogContentText>
            <Typography component={'span'} sx={{fontWeight : 'bold'}}>Created By: </Typography>
            <Typography component={'span'}>habib </Typography>
          </DialogContentText>
          <DialogContentText>
            <Typography component={'span'} sx={{fontWeight : 'bold'}}>Boosted: </Typography>
            <Typography component={'span'}>{post.boost ? 'Yes' : 'No'}</Typography>
          </DialogContentText>
          <DialogContentText>
            <Typography component={'span'} sx={{fontWeight : 'bold'}}>Filename: </Typography>
            <Typography component={'span'}><a href={post.fileName} target='blank'>{post.fileName}</a></Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant='contained' onClick={handleClose}>
            Edit
          </Button> */}
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default PostDetailsModal
