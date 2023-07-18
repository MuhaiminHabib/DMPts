// ** React Imports
import { useState } from 'react'

import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import TextField from '@mui/material/TextField'

import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** MUI Imports
import { Card, CardHeader, Grid } from '@mui/material'
import AddPostDrawer from 'src/views/apps/post/list/AddPostDrawer'
import { Controller, useForm } from 'react-hook-form'
import { Post } from 'src/types/apps/postSchema'
import Link from 'next/link'

// import { AbilityContext } from 'src/layouts/components/acl/Can'
// import { AuthContext } from 'src/context/AuthContext'

const NewPost = () => {
  // ** State

  // const [postPage, setPostPage] = useState<string>('1')

  const [addPostOpen, setAddPostOpen] = useState<boolean>(false)

  // ** Hooks
  // const { user } = useContext(AuthContext)
  // const ability = useContext(AbilityContext)

  const {
    // reset,
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<Post>({
    // defaultValues,
    mode: 'onChange'

    // resolver: zodResolver(SidebarAddPostSchema)
  })

  // ** Functions
  const onSubmit = async (data: Post, errors: any) => {
    console.log(data, errors)

    // if (errors) {
    //   console.log(errors)
    // }
    // zPostForPostCreate.safeParse(data)
    // const formData = new FormData()
    // Object.keys(data).forEach((key: any) => {
    //   const value = data[key as keyof Post]
    //   if (value === undefined) return // Skip undefined values
    //   if (key === 'content' && value instanceof FileList) {
    //     // If value is a FileList, append the first file
    //     formData.append('content', value[0])
    //   } else if (typeof value === 'string' || value instanceof Blob) {
    //     // If value is a string or a Blob, append it directly
    //     formData.append(key, value)
    //   } else if (value instanceof Array) {
    //     // If value is an array, convert it to a JSON string
    //     formData.append(key, JSON.stringify(value))
    //   } else if (typeof value === 'object') {
    //     // If value is an object, convert it to a JSON string
    //     formData.append(key, JSON.stringify(value))
    //   } else {
    //     // If value is a number or boolean, convert it to a string
    //     formData.append(key, String(value))
    //   }
    // })
    // console.log(formData)
    // createPost(formData as any)
  }

  const toggleAddPostDrawer = () => setAddPostOpen(!addPostOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Create Post' />
          <Box sx={{ p: 5, paddingTop: -5 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    </Select>
                  )}
                />
                {errors.platform && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-platform-select'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
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
                      <MenuItem>Habib</MenuItem>
                    </Select>
                  )}
                />
                {errors.client && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-billing-select'>
                    This field is required
                  </FormHelperText>
                )}
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

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '20px'
                }}
              >
                <Button size='large' variant='outlined' color='secondary'>
                  Publish
                </Button>
                <Button size='large' variant='outlined' color='secondary'>
                  Draft
                </Button>
                <Button size='large' type='submit' variant='contained' sx={{ ml: 3 }}>
                  Schedule
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      </Grid>

      <AddPostDrawer open={addPostOpen} toggle={toggleAddPostDrawer} />
    </Grid>
  )
}

export default NewPost
