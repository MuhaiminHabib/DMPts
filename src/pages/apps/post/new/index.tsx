// ** React Imports
import { useEffect } from 'react'

import ImageIcon from '@mui/icons-material/Image'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack'

// ** MUI Imports
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { Post, zPostForPostCreate } from 'src/types/apps/postSchema'
import Link from 'next/link'
import {
  useDraftToFbMutation,
  useFetchFbPageListByClientIdMutation,
  usePublishToFbMutation,
  useScheduleToFbMutation
} from 'src/store/query/fbApi'

import { useFetchCListQuery } from 'src/store/query/userApi'
import { showErrorAlert, showSuccessAlert } from 'src/utils/swal'
import { convertToLocalToUTC } from 'src/utils/helperFunctions'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box } from '@mui/system'

const defaultValues = {
  client: '',
  pageId: '',
  body: '',
  permissionLevel: 'C',
  publishOption: 'publish',
  scheduledDate: '',
  visibleToClient: false,
  file: null
}

const NewPost = () => {
  // ** State

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
    setError,
    formState: { errors }
  } = useForm<Post>({
    defaultValues,
    mode: 'onChange'
  })

  const clientValue = watch('client')
  const pageIdValue = watch('pageId')
  const bodyValue = watch('body')

  const isClientValid = !!clientValue
  const isPageIdValid = !!pageIdValue
  const isBodyValid = !!bodyValue

  const isFormValid =
    isClientValid &&
    isPageIdValid &&
    isBodyValid &&
    !publishedPostIsLoading &&
    !scheduleToFbIsLoading &&
    !draftToFbIsLoading

  // ** Functions
  const onSubmit = async (data: Post) => {
    zPostForPostCreate.safeParse(data)
    const formData = new FormData()

    Object.keys(data).forEach((key: any) => {
      console.log('key is: ', key)
      console.log('value is: ', data[key])
      const value = data[key as keyof Post]
      if (value === undefined) return

      // Skip undefined values
      if (key === 'file' && value instanceof FileList) {
        // If value is a FileList, append the first file
        data[key][0]['mimetype'] = data[key][0]['type']
        formData.append(key, data[key][0])

        console.log('form data after:', formData.get(key))
      } else if (key === 'scheduledDate' && data[key] !== '') {
        const formattedDatetime = convertToLocalToUTC(data.scheduledDate)

        // Append the formatted UTC datetime to the FormData object
        formData.append(key, formattedDatetime)
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
    console.log('formData before submitting is: ', formData)

    const selectedOption = data.publishOption
    if (selectedOption === 'publish') {
      // Handle publish
      publishToFb(formData as any)
      console.log('will handle publish')
    } else if (selectedOption === 'draft') {
      // Handle draft
      console.log('will handle draft')
      draftToFb(formData as any)
    } else if (selectedOption === 'schedule') {
      // Handle schedule
      console.log('will handle schedule')
      scheduleToFb(formData as any)
    }
  }

  //Validate schedule date
  const isScheduledDateValid = value => {
    const currentDate = new Date()
    const minDate = new Date(currentDate.getTime() + 10 * 60 * 1000) // 10 minutes from now
    const maxDate = new Date(currentDate.getTime() + 6 * 30 * 24 * 60 * 60 * 1000) // 6 months from now

    const selectedDate = new Date(value)

    return selectedDate >= minDate && selectedDate <= maxDate
  }

  const { data: clientList } = useFetchCListQuery()
  const publishOptionSelected = watch('publishOption')

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
    } else if (publishedPostIsError) {
      showErrorAlert({ error: publishedPostError })
    } else if (scheduleToFbIsError) {
      showErrorAlert({ error: scheduleToFbError })
    } else if (draftToFbIsError) {
      showErrorAlert({ error: draftToFbError })
    }
  }, [
    publishedPost,
    scheduleToFbPost,
    draftToFbPost,
    publishedPostIsLoading,
    scheduleToFbIsLoading,
    draftToFbIsLoading,
    publishedPostIsError,
    publishedPostError,
    scheduleToFbIsError,
    scheduleToFbError,
    draftToFbIsError,
    draftToFbError
  ])

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
                      <MenuItem value=''>none</MenuItem>

                      <Link href='/apps/user/c-list/' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <MenuItem value=''>Go to Client Page</MenuItem>
                      </Link>

                      {clientList
                        ? clientList.map(client => (
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
                      disabled={getValues('client') === '' ? true : false}
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

              <Divider sx={{ my: theme => `${theme.spacing(5)} !important` }} />

              {/* File upload */}
              <FormControl fullWidth>
                <FormLabel id='publish-option-label' sx={{ pb: '.5rem' }}>
                  Upload Files
                </FormLabel>

                <Controller
                  name='file'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                        <Box>
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

                          <label htmlFor='contained-button-file'>
                            <Button variant='outlined' component='span'>
                              <ImageIcon />
                            </Button>
                          </label>
                        </Box>
                        <Box sx={{}}>
                          <input
                            accept='.mp4,video/quicktime,video/x-matroska,video/x-ms-wmv,video/x-msvideo'
                            style={{ display: 'none' }}
                            id='contained-button-video'
                            multiple
                            type='file'
                            onChange={e => {
                              const selectedFiles = e.target.files
                              const unsupportedFiles = Array.from(selectedFiles).filter(
                                file =>
                                  ![
                                    'video/mp4',
                                    'video/quicktime',
                                    'video/x-matroska',
                                    'video/x-ms-wmv',
                                    'video/x-msvideo'
                                  ].includes(file.type)
                              )

                              if (unsupportedFiles.length > 0) {
                                setError('file', {
                                  type: 'manual',
                                  message: 'Unsupported video format selected'
                                })
                              } else {
                                onChange(selectedFiles)
                              }
                            }}
                          />

                          <label htmlFor='contained-button-video'>
                            <Button variant='outlined' component='span'>
                              <VideoCameraBackIcon />
                            </Button>
                          </label>
                        </Box>
                      </Box>
                      {value && value[0] && (
                        <Box sx={{ py: '10' }}>
                          <Typography>{value[0].name}</Typography>
                        </Box>
                      )}
                      {errors.file && <Typography sx={{ color: 'red' }}>{errors.file.message}</Typography>}
                    </>
                  )}
                />
              </FormControl>

              <Divider sx={{ my: theme => `${theme.spacing(5)} !important` }} />

              {/* RadioGroup for selecting publish option */}
              <FormControl fullWidth sx={{ pt: 2, pb: 6 }}>
                <FormLabel id='publish-option-label'>Publishing Options</FormLabel>
                <Controller
                  name='publishOption'
                  control={control}
                  defaultValue='publish' // Set a default value here if needed
                  render={({ field: { value, onChange } }) => (
                    <RadioGroup
                      aria-label='publish-option'
                      name='publishOption'
                      value={value}
                      onChange={onChange}
                      sx={{ flexDirection: 'row' }} // Add this line to style the RadioGroup
                    >
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
                  <FormControl sx={{ mb: 6 }}>
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
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20px'
                }}
              >
                <LoadingButton
                  loading={publishedPostIsLoading || scheduleToFbIsLoading || draftToFbIsLoading}
                  disabled={!isFormValid}
                  variant='contained'
                  type='submit'
                >
                  <>Create Post</>
                </LoadingButton>

                {/* <Button size='large' variant='contained' type='submit' disabled={!isFormValid}>
                  Create Post
                  {publishedPostIsLoading && scheduleToFbIsLoading && draftToFbIsLoading ? <Loader /> : null}
                </Button> */}
              </Box>
            </form>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default NewPost
