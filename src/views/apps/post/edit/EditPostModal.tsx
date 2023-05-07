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
import { PostsTypes } from 'src/types/apps/postTypes'
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { UsersType } from 'src/types/apps/userTypes'


type pageProps = {
    post : PostsTypes
}

type platform = {
    platform: string
}

interface PostData {
    id: string
    boost: boolean
    client: string
    description: string
    permissionLevel: string
    platform: platform[],
    postingDate: string
    postingEndDate: string
    title: string
    url: string
  }

  const schema = yup.object().shape({
    id: yup.string().required(),
    client: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    platform: yup.string().required(),
    postingDate: yup.string().required(),
    postingEndDate: yup.string().required(),
    permissionLevel: yup.string().required(),
    boost: yup.boolean().required(),
    url: yup.string().required(),
  })
  
const EditPostModal = ({post} : pageProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

//   const platform = () =>  {
//     post.platform[0].platform === 'FB' ?
//   }

  const defaultValues = {
    id: post._id,
    client: post.client,
    title: post.title,
    description: post.description,
    platform: post.platform[0].platform,
    postingDate: new Date(post.postingDate).toISOString().split('T')[0],
    postingEndDate: new Date(post.postingEndDate).toISOString().split('T')[0],
    permissionLevel: post.permissionLevel.permissionLevelName,
    boost: post.boost,
    url: post.url,
  }

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: PostData, e: MouseEvent) => {
 
    console.log('submitted',  data)
    // dispatch(createPost(data))
    // handleClose()

  }



  const onError = (error: any ) => {

    console.log(error)
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  function stopPropagate(callback: () => void) {
    console.log('I am stop propagate')
    return (e: {stopPropagation: () => void}) => {
      e.stopPropagation()
      callback()
    }
  }

  useEffect(() => {
    console.log(post)
    console.log(new Date(post.postingEndDate).toISOString().split('T')[0])
  }, [])

  return (
    <Fragment>
      <Tooltip title="Post Details" placement='top-start'>
        <Button variant='text' onClick={handleClickOpen} startIcon={<MenuBookIcon />} />
      </Tooltip>
        

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle>
        <Typography variant={'h4'}>{`Edit ${post.title}`}</Typography>

        <DialogContentText>
            <Typography component={'span'} sx={{fontWeight : 'bold'}}>Posted On: </Typography>
            <Typography component={'span'}>{post.postingDate.substring(0, 10)}</Typography>
          </DialogContentText>
        </DialogTitle>

        <DialogContent>
          <form 
          onSubmit={stopPropagate(handleSubmit(onSubmit, onError))}
          >
        <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
                name='id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                    <TextField
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

        <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
            //   {...register('title')}
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

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Description: TextArea Required'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.description)}
                  multiline
                  rows={6}
                />
              )}
            />
            {errors.description && <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>}
          </FormControl>



          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='platform' error={Boolean(errors.platform)} htmlFor='platform'>
            Select platform
            </InputLabel>
            <Controller
            //   {...register('platform')}
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
                  <MenuItem value=''>None</MenuItem>
                  <MenuItem value='google'>Google</MenuItem>
                  <MenuItem value='fb'>FaceBook</MenuItem>
                </Select>
              )}
            />
            {errors.platform && <FormHelperText sx={{ color: 'error.main' }}>{errors.platform.message}</FormHelperText>}
          </FormControl>


          {/* Posting Start Date */}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
            //   {...register('postingDate')}
            name='postingDate'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                name='postingDate'
                  type={'date'}
                  value={value}
                  label='Posting Date'
                  onChange={onChange}
                  error={Boolean(errors.postingDate)}
                  InputLabelProps={{ shrink: true }} />
              )}
            />
            {errors.postingDate && <FormHelperText sx={{ color: 'error.main' }}>{errors.postingDate.message}</FormHelperText>}
          </FormControl>

          {/* Posting End Date */}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='postingEndDate'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type={'date'}
                  value={value}
                  label='Posting End Date'
                  onChange={onChange}
                  error={Boolean(errors.postingEndDate)}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            {errors.postingEndDate && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.postingEndDate.message}</FormHelperText>
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
            {errors.boost && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.boost.message}</FormHelperText>
            )}
          </FormControl>

          {/* url */}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='url'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Post URL'
                  onChange={onChange}
                  error={Boolean(errors.url)}
                />
              )}
            />
            {errors.url && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.url.message}</FormHelperText>
            )}
          </FormControl>

          
        {/* <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant='contained'>
            Update Post
          </Button>

          <Button type='submit'>hello</Button>
        </DialogActions> */}
        <Button type='submit' variant='contained'>Submit la la al</Button>
        </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default EditPostModal
