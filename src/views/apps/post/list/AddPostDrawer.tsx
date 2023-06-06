// ** React Imports

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

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports

// ** Actions Imports
// import { createBAUser, fetchCList } from 'src/store/apps/user'

// ** Types Imports
import { useCreatePostMutation } from 'src/store/query/postApi'
import { useFetchCListForBAQuery, useFetchCListForDMQuery } from 'src/store/query/userApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'

import { useEffect } from 'react'
import Link from 'next/link'

interface SidebarAddPostType {
  open: boolean
  toggle: () => void
}

interface PostData {
  client: string
  boost: string
  description: string
  permissionLevel: string
  platform: string[]
  postingDate: string
  title: string
  url: string | null
  scheduledDate: string
  boostingStartDate: string
  boostingEndDate: string
  boostingBudget: string
  file: FileList | null
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
  boost: yup.string().required(),
  description: yup.string().required(),
  permissionLevel: yup.string().required(),
  platform: yup.string().required(),
  postingDate: yup.string().required(),
  title: yup.string().required(),
  url: yup.string().notRequired(),
  scheduledDate: yup.string(),
  boostingStartDate: yup.string().notRequired(),
  boostingEndDate: yup.string().notRequired(),
  boostingBudget: yup.string().notRequired(),
  file: yup.mixed().notRequired()
})

const defaultValues = {
  client: '',
  boost: '',
  description: '',
  permissionLevel: '',
  platform: [],
  postingDate: '',
  title: '',
  url: '',
  scheduledDate: '',
  boostingStartDate: '',
  boostingEndDate: '',
  boostingBudget: '',
  file: null
}

const SidebarAddPost = (props: SidebarAddPostType) => {
  // ** State

  // ** Hook

  // ** Props
  const { open, toggle } = props

  // ** State

  // ** Hooks
  const [createPost, { isLoading, isError, error, data }] = useCreatePostMutation()
  const { data: FetchCListForBaData } = useFetchCListForBAQuery()
  const { data: FetchCListForDmData } = useFetchCListForDMQuery()
  const {
    reset,
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<PostData>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (data) {
      showSuccessAlert({ text: 'Post Created' })
      handleClose()
    }
  }, [data])
  const onSubmit = async (data: any, errors: any) => {
    if (errors) {
      console.log(errors)
    }

    const formData = new FormData()
    console.log(data)

    Object.keys(data).forEach(key => {
      if (data.file && key === 'file') {
        formData.append('file', data.file[0])
      } else {
        formData.append(key, data[key])
      }
    })

    createPost(formData as any)
  }

  const handleClose = () => {
    toggle()
  }
  const handleCancel = () => {
    toggle()
    reset()
  }

  // const getFormattedDate = () => {
  //   const today = new Date()
  //   const year = today.getFullYear()
  //   const month = String(today.getMonth() + 1).padStart(2, '0')
  //   const day = String(today.getDate()).padStart(2, '0')
  //   return `${year}-${month}-${day}`
  // }

  if (isLoading) {
    console.log('Loading')
    showLoadingAlert()
  } else if (isError) {
    console.log(error)
    showErrorAlert({ error: error })
  } else if (data) {
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
          {/* Client */}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel
              id='validation-billing-select'
              error={Boolean(errors.client)}
              htmlFor='validation-billing-select'
            >
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
                  <Link href='/apps/user/c-list/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem value=''>Go to Client Page</MenuItem>
                  </Link>
                  {FetchCListForBaData &&
                    FetchCListForBaData.map(item => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.username}
                      </MenuItem>
                    ))}
                  {FetchCListForDmData &&
                    FetchCListForDmData.map(item => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.username}
                      </MenuItem>
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
            <InputLabel
              id='validation-platform-select'
              error={Boolean(errors.platform)}
              htmlFor='validation-platform-select'
            >
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
                  labelId='validation-platform-select'
                  aria-describedby='validation-platform-select'
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
              <FormHelperText sx={{ color: 'error.main' }} id='validation-platform-select'>
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
                  type='datetime-local'
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

          {/* Schedule Date */}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='scheduledDate'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='datetime-local'
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
            <InputLabel id='boost' error={Boolean(errors.boost)} htmlFor='validation-boost-select'>
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
                  labelId='validation-boost-select'
                  aria-describedby='validation-boost-select'
                >
                  <MenuItem value='false'>No</MenuItem>
                  <MenuItem value='true'>Yes</MenuItem>
                </Select>
              )}
            />
            {errors.boost && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-boost-select'>
                This field is required
              </FormHelperText>
            )}
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
              render={({ field: { value, onChange } }) => (
                <TextField value={value} label='Post URL' onChange={onChange} error={Boolean(errors.url)} />
              )}
            />
            {errors.url && <FormHelperText sx={{ color: 'error.main' }}>{errors.url.message}</FormHelperText>}
          </FormControl>

          {/* file */}
          <Controller
            name='file'
            control={control}
            render={({ field: { onChange } }) => (
              <div>
                <input
                  accept='image/*'
                  style={{ display: 'none' }}
                  id='contained-button-file'
                  multiple
                  type='file'
                  onChange={e => {
                    onChange(e.target.files)
                  }}
                />

                <label htmlFor='contained-button-file' style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button variant='contained' component='span' style={{ marginBottom: '10px' }}>
                    Select File
                  </Button>
                </label>
                {getValues().file && getValues().file![0] ? (
                  <Box sx={{ py: '10' }}>
                    <Typography>{getValues().file![0].name}</Typography>
                  </Box>
                ) : (
                  'No file selected'
                )}
              </div>
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <Button size='large' variant='outlined' color='secondary' onClick={handleCancel}>
              Cancel
            </Button>
            <Button size='large' type='submit' variant='contained' sx={{ ml: 3 }}>
              Add Post
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddPost
