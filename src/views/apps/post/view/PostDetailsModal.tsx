// ** React Imports
import { Fragment, useState } from 'react'

// ** Config
import authConfig from 'src/configs/auth'

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
import { baseURL } from 'src/utils/constants'

type pageProps = {
  post: PostsTypes
}

type inputParams = {
  content: string
  postId: string
}

type downloadParams = {
  postId: string
  content: string
}

const PostDetailsModal = ({ post }: pageProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const DownloadButton = ({ postId, content }: downloadParams) => (
    <Box>
      <Button variant='outlined' size='small' color='secondary' onClick={() => downloadFile({ postId, content })}>
        Download
      </Button>
    </Box>
  )

  const downloadFile = async ({ postId, content: fileName }: downloadParams) => {
    const myHeaders = new Headers()
    myHeaders.append('accessToken', localStorage.getItem(authConfig.storageTokenKeyName)!)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    fetch(`${baseURL}/API/posting/download/${postId}`, requestOptions)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName) // Set the desired file name and extension here
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch(error => console.log('error', error))
  }

  const FilePreview = ({ content, postId }: inputParams) => {
    const fileType = content.split('.').slice(-1)[0]

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
              <Box sx={{ pb: 7 }}>
                <Typography>{content.substring(5)}</Typography>
              </Box>
              <DownloadButton postId={postId} content={content} />
            </Box>
          )
        } else if (fileType === 'txt' || 'csv' || 'doc' || 'pdf') {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <img src='/dmp-images/file_logo.png' alt={'picture'} width={100} height={100} />
              <Box sx={{ pb: 7 }}>
                <Typography>{content.substring(5)}</Typography>
              </Box>
              <DownloadButton postId={postId} content={content} />
            </Box>
          )
        } else if (fileType === 'zip' || 'rar' || 'tar.gz' || 'tgz') {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <img src='/dmp-images/zip_logo.png' alt={'picture'} width={100} height={100} />
              <Box sx={{ pb: 7 }}>
                <Typography>{content.substring(5)}</Typography>
              </Box>
              <DownloadButton postId={postId} content={content} />
            </Box>
          )
        } else {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <img src='/dmp-images/random_file_logo.png' alt={'picture'} width={100} height={100} />
              <Box sx={{ pb: 7 }}>
                <Typography>{content.substring(5)}</Typography>
              </Box>
              <DownloadButton postId={postId} content={content} />
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

  type SplitDateTime = {
    date: string
    time: string
  }

  function splitDateTime(dateTimeString: string): SplitDateTime {
    const dateTime = new Date(dateTimeString)
    const date = dateTime.toISOString().substring(0, 10)
    const time = dateTime.toISOString().substring(11, 16)

    return {
      date: date,
      time: time
    }
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
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              {`${splitDateTime(post.postingDate).date} at ${splitDateTime(post.postingDate).time}`}
            </Typography>
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
          {post.scheduledDate ? (
            <DialogContentText>
              <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                Scheduled Date:{' '}
              </Typography>
              <Typography component={'span'}>
                {`${splitDateTime(post.scheduledDate).date} at ${splitDateTime(post.scheduledDate).time}`}
              </Typography>
            </DialogContentText>
          ) : null}
          <DialogContentText>
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              Boosted:{' '}
            </Typography>
            <Typography component={'span'}>{post.boost ? 'Yes' : 'No'}</Typography>
          </DialogContentText>

          {post.boost ? (
            <>
              <DialogContentText>
                <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                  Boost Budget:{' '}
                </Typography>
                <Typography component={'span'}>{post.boostingBudget}</Typography>
              </DialogContentText>
              {post.scheduledDate ? (
                <DialogContentText>
                  <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                    Boost Start Date:{' '}
                  </Typography>
                  <Typography component={'span'}>
                    {`${splitDateTime(post.scheduledDate).date} at ${splitDateTime(post.scheduledDate).time}`}
                  </Typography>
                </DialogContentText>
              ) : null}
              {post.boostingEndDate ? (
                <DialogContentText>
                  <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                    Boost End Date:{' '}
                  </Typography>
                  <Typography component={'span'}>
                    {`${splitDateTime(post.boostingEndDate).date} at ${splitDateTime(post.boostingEndDate).time}`}
                  </Typography>
                </DialogContentText>
              ) : null}
            </>
          ) : null}
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
