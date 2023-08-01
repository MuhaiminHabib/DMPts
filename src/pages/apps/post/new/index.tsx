// ** React Imports
import { useContext, useEffect, useState } from 'react'

import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import TextField from '@mui/material/TextField'

import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** MUI Imports
import { Card, CardHeader, Grid } from '@mui/material'
import AddPostDrawer from 'src/views/apps/post/list/AddPostDrawer'
import { Controller, useForm } from 'react-hook-form'
import { Post } from 'src/types/apps/postSchema'
import Link from 'next/link'
import { useFetchFbPageListByClientIdMutation, usePublishToFbMutation } from 'src/store/query/fbApi'
import { AuthContext } from 'src/context/AuthContext'
import { UsersType } from 'src/types/apps/userTypes'
import { useFetchCListForBAQuery, useFetchCListForDMQuery, useFetchCListQuery } from 'src/store/query/userApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'

// import { AbilityContext } from 'src/layouts/components/acl/Can'
// import { AuthContext } from 'src/context/AuthContext'

const defaultValues = {
  client: '',
  platform: '',
  body: ''
}

const NewPost = () => {
  // ** State

  // const [postPage, setPostPage] = useState<string>('1')

  const [addPostOpen, setAddPostOpen] = useState<boolean>(false)

  // ** Hooks
  // const { user } = useContext(AuthContext)
  // const ability = useContext(AbilityContext)

  const [fetchFbPageListByClientId, { data: fbPageListOfClient }] = useFetchFbPageListByClientIdMutation()
  const [
    publishToFb,
    { isLoading: publishedPostIsLoading, isError: publishedPostIsError, error: publishedPostError, data: publishedPost }
  ] = usePublishToFbMutation()

  const {
    reset,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Post>({
    defaultValues,
    mode: 'onChange'

    // resolver: zodResolver(SidebarAddPostSchema)
  })

  // ** Functions
  const onSubmit = async (data: Post, errors: any) => {
    console.log(data, errors)
    publishToFb(data)

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

  const auth = useContext(AuthContext)
  const [cList, setCList] = useState<UsersType[]>([])
  const { data: cListData } = useFetchCListQuery()
  const { data: cListForBaData } = useFetchCListForBAQuery()
  const { data: cListForDmData } = useFetchCListForDMQuery()

  useEffect(() => {
    console.log(auth.user?.role)
    if (auth.user?.role === 'A' && cListData) {
      setCList(cListData)
    } else if (auth.user?.role === 'BA' && cListForBaData) {
      setCList(cListForBaData)
    } else if (auth.user?.role === 'DM' && cListForDmData) {
      setCList(cListForDmData)
    }
  }, [cListData, cListForBaData, cListForDmData, auth])

  const clientValue = watch('client')

  useEffect(() => {
    console.log('clientValue is:', clientValue)
    fetchFbPageListByClientId(clientValue as string)
  }, [clientValue])

  useEffect(() => {
    if (publishedPost) {
      reset()
    }
  }, [publishedPost])

  if (publishedPostIsLoading) {
    showLoadingAlert()
  } else if (publishedPostIsError) {
    showErrorAlert({ error: publishedPostError })
  } else if (publishedPost) {
    showSuccessAlert({ text: 'Post Created' })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Create Post' />
          <Box sx={{ p: 5, paddingTop: -5 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Client Id */}
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='client-select' error={Boolean(errors.client)} htmlFor='client-select'>
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
                      labelId='client-select'
                      aria-describedby='client-select'
                    >
                      <Link href='/apps/user/c-list/' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <MenuItem value=''>Go to Client Page</MenuItem>
                      </Link>

                      {cList
                        ? cList.map(client => (
                            <MenuItem key={client._id} value={client._id}>
                              {client.username}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  )}
                />
                {errors.client && (
                  <FormHelperText sx={{ color: 'error.main' }} id='client-select'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>

              {/* platform */}
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='platform-select' error={Boolean(errors.pageId)} htmlFor='platform-select'>
                  Select platform
                </InputLabel>
                <Controller
                  name='pageId'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Select Platform'
                      onChange={onChange}
                      error={Boolean(errors.pageId)}
                      labelId='platform-select'
                      aria-describedby='platform-select'
                    >
                      <MenuItem value=''>none</MenuItem>
                      {fbPageListOfClient
                        ? fbPageListOfClient.map(pages => (
                            <MenuItem key={pages._id} value={pages._id}>
                              {pages.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  )}
                />
                {errors.pageId && (
                  <FormHelperText sx={{ color: 'error.main' }} id='platform-select'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>

              {/* description */}
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='body'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Body'
                      onChange={onChange}
                      error={Boolean(errors.body)}
                      multiline
                      rows={6}
                    />
                  )}
                />
                {errors.body && <FormHelperText sx={{ color: 'error.main' }}>{errors.body.message}</FormHelperText>}
              </FormControl>

              {/* file */}
              {/* <Controller
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
              /> */}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '20px'
                }}
              >
                <Button size='large' variant='contained' type='submit'>
                  Publish
                </Button>
                <Button size='large' variant='outlined' color='secondary' disabled={true}>
                  Draft
                </Button>
                <Button size='large' type='submit' variant='contained' sx={{ ml: 3 }} disabled={true}>
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
