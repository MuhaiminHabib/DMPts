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
import { Box, Tooltip, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { useDownloadAttachmentMutation } from 'src/store/query/postApi'

type pageProps = {
  post: PostsTypes
}

type inputObj = {
  content: string
}

type inputParams = {
  content: string
  postId: string
}

type downloadParams = {
  postId: string
}

const PostDetailsModal = ({ post }: pageProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [downloadAttachment] = useDownloadAttachmentMutation()

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const DownloadButton = ({ postId }: downloadParams) => (
    <Box>
      <Button variant='outlined' size='small' color='secondary' onClick={() => downloadAttachment(postId)}>
        Download
      </Button>
    </Box>
  )

  const FilePreview = ({ content, postId }: inputParams) => {
    console.log(content)
    let splitArray = content.split('.')
    console.log(splitArray)
    const fileType = splitArray[splitArray.length - 1]

    console.log(fileType)

    const renderPreview = () => {
      if (fileType) {
        if (
          fileType === 'jpg' ||
          'jpeg' ||
          'png' ||
          'gif' ||
          'bmp' ||
          'tif' ||
          'tiff' ||
          'svg' ||
          'webp' ||
          'heic' ||
          'heif' ||
          'ico'
        ) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <img src='/dmp-images/picture_logo.png' alt={'picture'} width={100} height={100} />
              <DownloadButton postId={postId} />
            </Box>
          )
        } else if (fileType === 'txt' || 'csv' || 'doc' || 'pdf') {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <img src='/dmp-images/file_logo.png' alt={'picture'} width={100} height={100} />
              <DownloadButton postId={postId} />
            </Box>
          )
        } else if (fileType === 'zip' || 'rar' || 'tar.gz' || 'tgz') {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <img src='/dmp-images/zip_logo.png' alt={'picture'} width={100} height={100} />
              <DownloadButton postId={postId} />
            </Box>
          )
        } else {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <img src='/dmp-images/random_file_logo.png' alt={'picture'} width={100} height={100} />
              <DownloadButton postId={postId} />
            </Box>
          )
        }
      }
    }

    return (
      <div>
        <h3>File Preview</h3>
        {renderPreview()}
      </div>
    )
  }

  return (
    <Fragment>
      <Tooltip title='Post Details' placement='top-start'>
        <Button variant='text' onClick={handleClickOpen} startIcon={<MenuBookIcon />} />
      </Tooltip>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle>
          <Typography variant={'h4'}>{post.title}</Typography>

          <DialogContentText>
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              Posted On:{' '}
            </Typography>
            <Typography component={'span'}>{post.postingDate.substring(0, 10)}</Typography>
          </DialogContentText>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              Description:{' '}
            </Typography>
            <Typography component={'span'}>{post.description}</Typography>
          </DialogContentText>
          <DialogContentText>
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              Created By:{' '}
            </Typography>
            <Typography component={'span'}>habib </Typography>
          </DialogContentText>
          <DialogContentText>
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              Boosted:{' '}
            </Typography>
            <Typography component={'span'}>{post.boost ? 'Yes' : 'No'}</Typography>
          </DialogContentText>
          <DialogContentText>
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              File:{' '}
            </Typography>
            <Typography component={'span'}>
              {post.content ? <FilePreview content={post.content} postId={post._id} /> : 'No Files Attached'}
            </Typography>
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
