// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/lab'


// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { createBAUser, fetchCList } from 'src/store/apps/user'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'
import axiosConfig from 'src/configs/axios'
import { createPost } from 'src/store/apps/post'
import MenuBookIcon from '@mui/icons-material/MenuBook'

interface SidebarAddPostType {
  open: boolean
  toggle: () => void
}

interface PostData {
  boost: false
  client: string
  description: string
  permissionLevel: 'D' | 'C'
  platform: 'google' | 'fb'
  postingDate: string
  postingEndDate: string
  title: string
  url: string
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({

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

const defaultValues = {
  client: '',
  title: '',
  description: '',
  platform: '',
  postingDate: '',
  postingEndDate: '',
  permissionLevel: '',
  boost: false,
  url: '',
}

const SidebarAddPost = (props: SidebarAddPostType) => {
  // ** Props
  const { open, toggle } = props

  // ** State

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {cList} = useSelector((state: RootState) => state.user)
  

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data: PostData, e: MouseEvent) => {
    e.stopPropagation()
    console.log('submitted',data)
    dispatch(createPost(data))
    handleClose()
  }

  const handleClose = () => {
    toggle()
    reset()
  }



  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add A Post</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='validation-billing-select' error={Boolean(errors.role)} htmlFor='validation-billing-select'>
            Select Client
            </InputLabel>
            <Controller
              name='client'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Select Client'
                  onChange={onChange}
                  error={Boolean(errors.client)}
                  labelId='validation-billing-select'
                  aria-describedby='validation-billing-select'
                >
                  <MenuItem value=''>none</MenuItem>
                  {cList.map(item => (
                    <MenuItem value={item._id}>{item.username}</MenuItem>

                  ))}
                </Select>
              )}
            />
            {errors.client && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-billing-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
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
            <InputLabel id='validation-billing-select' error={Boolean(errors.role)} htmlFor='validation-billing-select'>
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
                  labelId='validation-billing-select'
                  aria-describedby='validation-billing-select'
                >
                  <MenuItem value=''>none</MenuItem>
                  <MenuItem value='google'>Google</MenuItem>
                  <MenuItem value='fb'>FaceBook</MenuItem>
                </Select>
              )}
            />
            {errors.platform && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-billing-select'>
                This field is required
              </FormHelperText>
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
                  <MenuItem value=''>Permission Level</MenuItem>
                  <MenuItem value='D'>Digital Manager</MenuItem>
                  <MenuItem value='C'>Client</MenuItem>
                </Select>
              )}
            />
            {errors.permissionLevel && (
              <FormHelperText sx={{ color: 'error.main' }} id='permissionLevel'>
                This field is required
              </FormHelperText>
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
                  <MenuItem value='false'>No</MenuItem>
                  <MenuItem value='true'>Yes</MenuItem>
                  </Select>
              )}
            />
            {errors.boost && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-billing-select'>
                This field is required
              </FormHelperText>
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

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Add User
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddPost
