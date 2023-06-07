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
  const [downloadAttachment, { isLoading, isError, data }] = useDownloadAttachmentMutation()

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const DownloadButton = ({ postId }: downloadParams) => (
    <Box>
      <Button variant='outlined' size='small' color='secondary' onClick={() => downloadFile(postId)}>
        Download
      </Button>
    </Box>
  )

  const downloadFile = (postId: string) => {
    downloadAttachment(postId)

    if (!isLoading && !isError && data) {
      alert('here')
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url

      // Extract the filename from the URL or use a default filename
      const filename = link.href.split('/').pop() || 'download'

      link.setAttribute('download', filename)

      document.body.appendChild(link)
      link.click()

      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    }
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

  type SplitDateTime = {
    date: string
    time: string
  }

  function splitDateTime(dateTimeString: string): SplitDateTime {
    let dateTime = new Date(dateTimeString)
    let date = dateTime.toISOString().substring(0, 10)
    let time = dateTime.toISOString().substring(11, 16)

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
                {`${splitDateTime(post.scheduledDate).time} ${splitDateTime(post.scheduledDate).date}`}
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
              <DialogContentText>
                <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                  Boost Start Date:{' '}
                </Typography>
                <Typography component={'span'}>
                  {`${splitDateTime(post.scheduledDate).time} ${splitDateTime(post.scheduledDate).date}`}
                </Typography>
              </DialogContentText>
              <DialogContentText>
                <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                  Boost End Date:{' '}
                </Typography>
                <Typography component={'span'}>
                  {`${splitDateTime(post.boostingEndDate).time} ${splitDateTime(post.boostingEndDate).date}`}
                </Typography>
              </DialogContentText>
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
