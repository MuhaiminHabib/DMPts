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

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports

// ** Actions Imports

// ** Types Imports
import { zPostForPostCreate } from 'src/types/apps/postSchema'
import z from 'zod'

import { useCreatePostMutation } from 'src/store/query/postApi'
import { useFetchCListForBAQuery, useFetchCListForDMQuery, useFetchCListQuery } from 'src/store/query/userApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'

import { useEffect } from 'react'
import Link from 'next/link'

type Post = z.infer<typeof zPostForPostCreate>

interface SidebarAddPostType {
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarAddPostSchema = zPostForPostCreate
  .refine(data => (data.boost === 'true' ? data.boostingStartDate !== '' : true), {
    message: "boostingStartDate is required when boost is 'true'",
    path: ['boostingStartDate']
  })
  .refine(data => (data.boost === 'true' ? data.boostingEndDate !== '' : true), {
    message: "boostingEndDate is required when boost is 'true'",
    path: ['boostingEndDate']
  })
  .refine(data => (data.boost === 'true' ? data.boostingBudget !== null : true), {
    message: "boostingBudget is required when boost is 'true'",
    path: ['boostingBudget']
  })

const defaultValues = {
  ba: '',
  client: '',
  boost: '',
  description: '',
  permissionLevel: '',
  platform: '',
  postingDate: '',
  title: '',
  url: '',
  scheduledDate: '',
  boostingStartDate: '',
  boostingEndDate: '',
  boostingBudget: 0,
  content: null
}

// _id: post._id,
//     title: post.title,
//     description: post.description,
//     platform: Array.isArray(post.platform) ? post.platform[0]['platform'] : post.platform,
//     postingDate: post.postingDate ? new Date(post.postingDate).toISOString().slice(0, -5) : null,
//     permissionLevel: post.permissionLevel ? post.permissionLevel.permissionLevelName : '',
//     boost: post.boost,
//     scheduledDate: post.scheduledDate ? new Date(post.scheduledDate).toISOString().slice(0, -5) : null,
//     boostingStartDate: post.boostingStartDate ? new Date(post.boostingStartDate).toISOString().slice(0, -5) : null,
//     boostingEndDate: post.boostingEndDate ? new Date(post.boostingEndDate).toISOString().slice(0, -5) : null,
//     boostingBudget: post.boostingBudget,
//     url: post.url

const SidebarAddPost = (props: SidebarAddPostType) => {
  // ** State

  // ** Hook

  // ** Props
  const { open, toggle } = props

  // ** State

  // ** Hooks
  const [createPost, { isLoading, isError, error, data }] = useCreatePostMutation()
  const { data: FetchCListData } = useFetchCListQuery()
  const { data: FetchCListForBaData } = useFetchCListForBAQuery()
  const { data: FetchCListForDmData } = useFetchCListForDMQuery()
  const {
    reset,
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Post>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(SidebarAddPostSchema)
  })

  const clientValue = watch('client')

  useEffect(() => {
    if (clientValue && FetchCListData && FetchCListData.length > 0) {
      console.log('client changed')
      setValue('ba', FetchCListData.filter(client => client._id === clientValue)[0].ba)
      console.log('ba id is:', getValues().ba)
    }
  }, [clientValue, FetchCListData])

  useEffect(() => {
    if (data) {
      showSuccessAlert({ text: 'Post Created' })
      handleClose()
    }
  }, [data])

  useEffect(() => {
    console.log(errors)
    zPostForPostCreate.safeParse(defaultValues)
  }, [errors, defaultValues])

  const onSubmit = async (data: Post, errors: any) => {
    if (errors) {
      console.log(errors)
    }
    zPostForPostCreate.safeParse(data)
    const formData = new FormData()

    Object.keys(data).forEach((key: any) => {
      const value = data[key as keyof Post]

      if (value === undefined) return // Skip undefined values

      if (key === 'content' && value instanceof FileList) {
        // If value is a FileList, append the first file
        formData.append('content', value[0])
      } else if (typeof value === 'string' || value instanceof Blob) {
        // If value is a string or a Blob, append it directly
        formData.append(key, value)
      } else if (value instanceof Array) {
        // If value is an array, convert it to a JSON string
        formData.append(key, JSON.stringify(value))
      } else if (typeof value === 'object') {
        // If value is an object, convert it to a JSON string
        formData.append(key, JSON.stringify(value))
      } else {
        // If value is a number or boolean, convert it to a string
        formData.append(key, String(value))
      }
    })

    console.log(formData)
    createPost(formData as any)
  }

  const handleClose = () => {
    toggle()
  }
  const handleCancel = () => {
    toggle()
    reset()
  }

  if (isLoading) {
    console.log('Loading')
    showLoadingAlert()
  } else if (isError) {
    console.log(error)
    showErrorAlert({ error: error })
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
          {/* Client Id */}
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
                  {FetchCListData &&
                    FetchCListData.map(item => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.username}
                      </MenuItem>
                    ))}
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
                  type='number'
                  label='Enter Boost Budget'
                  onChange={event => onChange(parseFloat(event.target.value))}
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
          {
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
          }

          {/* Boost End Date */}
          {
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
          }

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
            name='content'
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
                {getValues().content && getValues().content![0] ? (
                  <Box sx={{ py: '10' }}>
                    <Typography>{getValues().content![0].name}</Typography>
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
