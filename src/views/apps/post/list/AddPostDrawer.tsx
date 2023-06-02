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
import Typography, { TypographyProps } from '@mui/material/Typography'
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
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'

interface SidebarAddPostType {
  open: boolean
  toggle: () => void
}

interface PostData {
  boost: string
  client: string
  description: string
  permissionLevel: string
  platform: string[]
  postingDate: string
  postingEndDate: string
  title: string
  url: string
  file: string
}

// const showErrors = (field: string, valueLen: number, min: number) => {
//   if (valueLen === 0) {
//     return `${field} field is required`
//   } else if (valueLen > 0 && valueLen < min) {
//     return `${field} must be at least ${min} characters`
//   } else {
//     return ''
//   }
// }

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  // client: yup.string().required(),
  // title: yup.string().required(),
  // description: yup.string().required(),
  // platform: yup.string().required(),
  // postingDate: yup.string().required(),
  // postingEndDate: yup.string().required(),
  // permissionLevel: yup.string().required(),
  // boost: yup.string().required(),
  // url: yup.string().required(),
  file: yup.mixed().required()
})

const defaultValues = {
  client: '',
  title: '',
  description: '',
  platform: '',
  postingDate: '',
  postingEndDate: '',
  permissionLevel: '',
  boost: '',
  url: '',
  file: ''
}

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 300,
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(15.75)
  },
  [theme.breakpoints.down('md')]: {
    width: 250,
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 200
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const SidebarAddPost = (props: SidebarAddPostType) => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hook
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const img = files.map((file: FileProp) => (
    <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} />
  ))

  // ** Props
  const { open, toggle } = props

  // ** State

  // ** Hooks
  const [createPost, { isLoading, isError, error, data }] = useCreatePostMutation()
  const {
    // isLoading: isLoadingFetchCListForBA,
    // isError: isErrorFetchCListForBA,
    // error: fetchCListForBAError,

    data: FetchCListForBaData
  } = useFetchCListForBAQuery()
  const {
    // isLoading: isLoadingFetchCListForDm,
    // isError: isErrorFetchCListForDm,
    // error: fetchCListForDmError,

    data: FetchCListForDmData
  } = useFetchCListForDMQuery()
  const {
    reset,
    control,

    // setValue,
    // setError,

    handleSubmit,
    formState: { errors }
  } = useForm({
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
  const onSubmit = async (data: any) => {
    data.platform = [data.platform]
    data.file = files
    console.log(data)
    // createPost(data as PostData)
  }

  const handleClose = () => {
    toggle()
    reset()
  }

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
                  <MenuItem value=''>none</MenuItem>
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

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel
              id='validation-billing-select'
              error={Boolean(errors.platform)}
              htmlFor='validation-billing-select'
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
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            {errors.postingDate && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.postingDate.message}</FormHelperText>
            )}
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
                <TextField value={value} label='Post URL' onChange={onChange} error={Boolean(errors.url)} />
              )}
            />
            {errors.url && <FormHelperText sx={{ color: 'error.main' }}>{errors.url.message}</FormHelperText>}
          </FormControl>

          {/* file */}

          {/* <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='file'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Link to Attached Files'
                  onChange={onChange}
                  error={Boolean(errors.fileName)}
                />
                )}
            /> 
             {errors.file && <FormHelperText sx={{ color: 'error.main' }}>{errors.file.message}</FormHelperText>}
          </FormControl> */}

          {/* <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
            <input {...getInputProps()} />
            {files.length ? (
              img
            ) : (
              <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                  <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
                  <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                    Drop files here or click{' '}
                    <Link href='/' onClick={e => e.preventDefault()}>
                      browse
                    </Link>{' '}
                    thorough your machine
                  </Typography>
                </Box>
              </Box>
            )}
          </Box> */}

          <Controller
            name='file'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                type='file'
                value={value}
                placeholder='insert file'
                onChange={e => console.log(e.target.files![0])}
              />
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
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
