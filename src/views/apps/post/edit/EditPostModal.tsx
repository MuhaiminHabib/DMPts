// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { PostsTypes } from 'src/types/apps/postTypes'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import EditIcon from '@mui/icons-material/Edit'
import { useEditPostMutation } from 'src/store/query/postApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'

type pageProps = {
  post: PostsTypes
}

const schema = yup.object().shape({
  id: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  platform: yup.string().required(),
  postingDate: yup.string().required(),
  permissionLevel: yup.string().required(),
  boost: yup.string().required(),
  scheduledDate: yup.string().notRequired(),
  boostingStartDate: yup.string().notRequired(),
  boostingEndDate: yup.string().notRequired(),
  boostingBudget: yup.string().notRequired(),
  url: yup.string().notRequired()
})

const EditPostModal = ({ post }: pageProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [editPost, { isLoading, isError, error, data }] = useEditPostMutation()

  const defaultValues = {
    id: post._id,
    title: post.title,
    description: post.description,
    platform: Array.isArray(post.platform) ? post.platform[0]['platform'] : post.platform,
    postingDate: post.postingDate ? new Date(post.postingDate).toISOString().slice(0, -5) : null,
    permissionLevel: post.permissionLevel.permissionLevelName,
    boost: post.boost.toString(),
    scheduledDate: post.scheduledDate ? new Date(post.scheduledDate).toISOString().slice(0, -5) : null,
    boostingStartDate: post.boostingStartDate ? new Date(post.boostingStartDate).toISOString().slice(0, -5) : null,
    boostingEndDate: post.boostingEndDate ? new Date(post.boostingEndDate).toISOString().slice(0, -5) : null,
    boostingBudget: post.boostingBudget,
    url: post.url
  }

  const {
    control,

    // reset,
    // setValue,
    // setError,

    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    data.platform = [data.platform]
    editPost(data as PostsTypes)
    handleClose()
  }

  const onError = (error: any) => {
    console.log('i am the onError')
    console.log(error)
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  if (isLoading) {
    console.log('Loading')
    showLoadingAlert()
  } else if (isError) {
    console.log(error)
    showErrorAlert({ error: error })
  } else if (data) {
    showSuccessAlert({ text: 'Post Edited Successfully' })
  }

  return (
    <Fragment>
      <Tooltip title='Post Edit' placement='top-start'>
        <Button variant='text' onClick={handleClickOpen} startIcon={<EditIcon />} />
      </Tooltip>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle>
          <Typography variant={'h4'}>{`Edit ${post.title}`}</Typography>

          <DialogContentText>
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              Posted On:{' '}
            </Typography>
            <Typography component={'span'}>{post.postingDate.substring(0, 10)}</Typography>
          </DialogContentText>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {/* PostId */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled={true}
                    value={value}
                    label='Post Id'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.id)}
                  />
                )}
              />
              {errors.id && <FormHelperText sx={{ color: 'error.main' }}>{errors.id.message}</FormHelperText>}
            </FormControl>

            {/* title */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Enter Title'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.title)}
                    multiline
                    rows={2}
                  />
                )}
              />
              {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
            </FormControl>

            {/* description */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Description'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.description)}
                    multiline
                    rows={6}
                  />
                )}
              />
              {errors.description && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
              )}
            </FormControl>

            {/* platform */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='platform' error={Boolean(errors.platform)} htmlFor='platform'>
                Select platform
              </InputLabel>
              <Controller
                name='platform'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label='Select Platform'
                    onChange={onChange}
                    error={Boolean(errors.platform)}
                    labelId='platform'
                    aria-describedby='platform'
                  >
                    <MenuItem value=''>none</MenuItem>
                    <MenuItem value='fb'>Facebook</MenuItem>
                    <MenuItem value='instagram'>Instagram</MenuItem>
                    <MenuItem value='linkedin'>Linkedin</MenuItem>
                    <MenuItem value='behance'>Behance</MenuItem>
                    <MenuItem value='pinterest'>Pinterest</MenuItem>
                    <MenuItem value='google'>Google</MenuItem>
                    <MenuItem value='shutterstock'>Shutterstock</MenuItem>
                    <MenuItem value='youtube'>Youtube</MenuItem>
                  </Select>
                )}
              />
              {errors.platform && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.platform.message}</FormHelperText>
              )}
            </FormControl>

            {/* Posting Start Date */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='postingDate'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    name='postingDate'
                    type={'datetime-local'}
                    value={value}
                    label='Posting Date'
                    onChange={onChange}
                    error={Boolean(errors.postingDate)}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
              {errors.postingDate && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.postingDate.message}</FormHelperText>
              )}
            </FormControl>

            {/* Permission Level */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='permissionLevel' error={Boolean(errors.permissionLevel)} htmlFor='permissionLevel'>
                Permission Level
              </InputLabel>
              <Controller
                name='permissionLevel'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label='Permission Level'
                    onChange={onChange}
                    error={Boolean(errors.permissionLevel)}
                    labelId='permissionLevel'
                    aria-describedby='permission Level'
                  >
                    <MenuItem value=''>none</MenuItem>
                    <MenuItem value='D'>Digital Manager</MenuItem>
                    <MenuItem value='C'>Client</MenuItem>
                  </Select>
                )}
              />
              {errors.permissionLevel && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.permissionLevel.message}</FormHelperText>
              )}
            </FormControl>

            {/* Schedule Date */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='scheduledDate'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    name='scheduledDate'
                    type={'datetime-local'}
                    value={value}
                    label='Schedule Date'
                    onChange={onChange}
                    error={Boolean(errors.scheduledDate)}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />

              {errors.scheduledDate && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.scheduledDate.message}</FormHelperText>
              )}
            </FormControl>

            {/* boost */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='boost' error={Boolean(errors.boost)} htmlFor='validation-billing-select'>
                Boosted
              </InputLabel>
              <Controller
                name='boost'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label='Boosted'
                    onChange={onChange}
                    error={Boolean(errors.boost)}
                    labelId='validation-billing-select'
                    aria-describedby='validation-billing-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    <MenuItem value='false'>No</MenuItem>
                    <MenuItem value='true'>Yes</MenuItem>
                  </Select>
                )}
              />
              {errors.boost && <FormHelperText sx={{ color: 'error.main' }}>{errors.boost.message}</FormHelperText>}
            </FormControl>

            {/* boost Budget */}

            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='boostingBudget'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Enter Boost Budget'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.boostingBudget)}
                  />
                )}
              />
              {errors.boostingBudget && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.boostingBudget.message}</FormHelperText>
              )}
            </FormControl>

            {/* Boost Start Date */}

            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='boostingStartDate'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='datetime-local'
                    value={value}
                    label='Boost Start Date'
                    onChange={onChange}
                    error={Boolean(errors.boostingStartDate)}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />

              {errors.boostingStartDate && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.boostingStartDate.message}</FormHelperText>
              )}
            </FormControl>

            {/* Boost End Date */}

            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='boostingEndDate'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='datetime-local'
                    value={value}
                    label='Boost End Date'
                    onChange={onChange}
                    error={Boolean(errors.boostingEndDate)}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />

              {errors.boostingEndDate && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.boostingEndDate.message}</FormHelperText>
              )}
            </FormControl>

            {/* url */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='url'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField value={value} label='Post URL' onChange={onChange} error={Boolean(errors.url)} />
                )}
              />
              {errors.url && <FormHelperText sx={{ color: 'error.main' }}>{errors.url.message}</FormHelperText>}
            </FormControl>

            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button type='submit' variant='contained' sx={{ ml: 3 }}>
              Update Post
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default EditPostModal
