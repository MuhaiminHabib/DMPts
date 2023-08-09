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
import {
  Card,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import AddPostDrawer from 'src/views/apps/post/list/AddPostDrawer'
import { Controller, useForm } from 'react-hook-form'
import { Post } from 'src/types/apps/postSchema'
import Link from 'next/link'
import {
  useDraftToFbMutation,
  useFetchFbPageListByClientIdMutation,
  usePublishToFbMutation,
  useScheduleToFbMutation
} from 'src/store/query/fbApi'
import { AuthContext } from 'src/context/AuthContext'
import { UsersType } from 'src/types/apps/userTypes'
import { useFetchCListForBAQuery, useFetchCListForDMQuery, useFetchCListQuery } from 'src/store/query/userApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'

const defaultValues = {
  client: '',
  pageId: '',
  body: '',
  publishOption: 'publish',
  scheduledDate: '',
  visibleToClient: false,
  content: null
}

const NewPost = () => {
  // ** State

  const [addPostOpen, setAddPostOpen] = useState<boolean>(false)

  // ** Hooks

  const [fetchFbPageListByClientId, { data: fbPageListOfClient }] = useFetchFbPageListByClientIdMutation()
  const [
    publishToFb,
    { isLoading: publishedPostIsLoading, isError: publishedPostIsError, error: publishedPostError, data: publishedPost }
  ] = usePublishToFbMutation()
  const [
    scheduleToFb,
    { isLoading: scheduleToFbIsLoading, isError: scheduleToFbIsError, error: scheduleToFbError, data: scheduleToFbPost }
  ] = useScheduleToFbMutation()
  const [
    draftToFb,
    { isLoading: draftToFbIsLoading, isError: draftToFbIsError, error: draftToFbError, data: draftToFbPost }
  ] = useDraftToFbMutation()

  const {
    reset,
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<Post>({
    defaultValues,
    mode: 'onChange'

    // resolver: zodResolver(SidebarAddPostSchema)
  })

  // ** Functions
  const onSubmit = async (data: Post, errors: any) => {
    console.log(data, errors)
    const selectedOption = data.publishOption

    if (selectedOption === 'publish') {
      // Handle publish
      publishToFb(data)
      console.log('will handle publish')
    } else if (selectedOption === 'draft') {
      // Handle draft
      console.log('will handle draft')
      draftToFb(data)
    } else if (selectedOption === 'schedule') {
      // Handle schedule
      console.log('will handle schedule')
      scheduleToFb(data)
    }

    // if (errors) {
    //   console.log(errors)
    // }
    // zPostForPostCreate.safeParse(data)
    // const formData = new FormData()
    // Object.keys(data).forEach((key: any) => {
    //   const value = data[key as keyof Post]
    //   if (value === undefined) return
    //   // Skip undefined values
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
    // console.log('formData before sumbitting is: ', formData)

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1])
    // }
    // publishToFb(formData as any)
  }

  //Validate schudule date
  const isScheduledDateValid = value => {
    const currentDate = new Date()
    const minDate = new Date(currentDate.getTime() + 10 * 60 * 1000) // 10 minutes from now
    const maxDate = new Date(currentDate.getTime() + 6 * 30 * 24 * 60 * 60 * 1000) // 6 months from now

    const selectedDate = new Date(value)

    return selectedDate >= minDate && selectedDate <= maxDate
  }

  const toggleAddPostDrawer = () => setAddPostOpen(!addPostOpen)

  const auth = useContext(AuthContext)
  const [cList, setCList] = useState<UsersType[]>([])
  const { data: cListData } = useFetchCListQuery()
  const { data: cListForBaData } = useFetchCListForBAQuery()
  const { data: cListForDmData } = useFetchCListForDMQuery()
  const clientValue = watch('client')
  const publishOptionSelected = watch('publishOption')

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

  //Fetch Client List
  useEffect(() => {
    console.log('clientValue is:', clientValue)
    fetchFbPageListByClientId(clientValue as string)
  }, [clientValue])

  // Reset if Posting is success
  useEffect(() => {
    if (publishedPost || scheduleToFbPost || draftToFbPost) {
      showSuccessAlert({ text: 'Post Created' })
      reset()
    }
  }, [publishedPost, scheduleToFbPost, draftToFbPost])

  if (publishedPostIsLoading || scheduleToFbIsLoading || draftToFbIsLoading) {
    showLoadingAlert()
  } else if (publishedPostIsError) {
    showErrorAlert({ error: publishedPostError })
  } else if (scheduleToFbIsError) {
    showErrorAlert({ error: scheduleToFbError })
  } else if (draftToFbIsError) {
    showErrorAlert({ error: draftToFbError })
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

              {/* RadioGroup for selecting publish option */}
              <FormControl fullWidth sx={{ py: 5 }}>
                <FormLabel id='publish-option-label'>Publish Option</FormLabel>
                <Controller
                  name='publishOption'
                  control={control}
                  defaultValue='publish' // Set a default value here if needed
                  render={({ field: { value, onChange } }) => (
                    <RadioGroup aria-label='publish-option' name='publishOption' value={value} onChange={onChange}>
                      <FormControlLabel value='publish' control={<Radio />} label='Publish' />
                      <FormControlLabel value='draft' control={<Radio />} label='Draft' />
                      <FormControlLabel value='schedule' control={<Radio />} label='Schedule' />
                    </RadioGroup>
                  )}
                />
              </FormControl>

              {publishOptionSelected === 'schedule' ? (
                <>
                  {/* Schedule Date */}
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                      name='scheduledDate'
                      control={control}
                      rules={{
                        required: publishOptionSelected === 'schedule',
                        validate: {
                          validScheduledDate: value =>
                            publishOptionSelected !== 'schedule' || isScheduledDateValid(value)
                        }
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type='datetime-local'
                          value={value}
                          label='Schedule Date'
                          onChange={onChange}
                          error={Boolean(errors.scheduledDate)}
                          helperText={
                            publishOptionSelected === 'schedule' && errors.scheduledDate
                              ? 'Scheduled date is required and should be at least 10 minutes from now and no longer than 6 months'
                              : ''
                          }
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            min: new Date(Date.now() + 10 * 60 * 1000).toISOString().slice(0, 16), // Minimum 10 minutes from now
                            max: new Date(new Date().getTime() + 6 * 30 * 24 * 60 * 60 * 1000)
                              .toISOString()
                              .slice(0, 16)
                          }}
                        />
                      )}
                    />

                    {errors.scheduledDate && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.scheduledDate.message}</FormHelperText>
                    )}
                  </FormControl>
                </>
              ) : publishOptionSelected === 'draft' ? (
                <Controller
                  name='visibleToClient'
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, onChange } }) =>
                    getValues().publishOption === 'draft' && (
                      <FormControlLabel
                        control={<Checkbox checked={value} onChange={onChange} />}
                        label='Visible to client'
                      />
                    )
                  }
                />
              ) : null}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '20px'
                }}
              >
                <Button size='large' variant='contained' type='submit'>
                  Create Post
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
