// ** React Imports
import { Fragment, useState, useContext, useEffect } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {
  useCBelongToBaMutation,
  useCBelongToDmMutation,
  useDmsBelongToBaMutation,
  useFetchBaListQuery,
  useFetchCListQuery,
  useFetchDmListQuery
} from 'src/store/query/userApi'
import { UsersType as User } from 'src/types/apps/userTypes'
import { useFilterPostsMutation } from 'src/store/query/postApi'
import { useRouter } from 'next/router'

type inputProps = {
  setPostList: any
  setNowShowing: any
  setPage: any
}
type account = {
  title: string
  logo: string
}

const acnt: account = {
  title: 'hello',
  logo: 'logo'
}

const defaultValues = {
  platform: '',
  start_date: '',
  end_date: '',
  ba_id: '',
  dm_id: '',
  client_id: '',
  type: ''
}
const FilterModal = ({ setPostList, setNowShowing, setPage }: inputProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [dmList, setDmList] = useState<User[]>([])
  const [clientList, setClientList] = useState<User[]>([])

  // ** Hooks
  const router = useRouter()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const ability = useContext(AbilityContext)

  const { data: baList } = useFetchBaListQuery()

  //Fetch DM
  const { data: dmListData } = useFetchDmListQuery()
  const [dmsBelongToBa, { data: dmBelongToBaData }] = useDmsBelongToBaMutation()

  //Fetch Client
  const { data: clientListData } = useFetchCListQuery()
  const [cBelongToBa, { data: cBelongToBaData }] = useCBelongToBaMutation()
  const [cBelongToDm, { data: cBelongToDmData }] = useCBelongToDmMutation()

  const [filterPost, { data: filteredPosts }] = useFilterPostsMutation()

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  //Functions
  const onSubmit = async (data: any, errors: any) => {
    setValue('type', router.pathname.split('/')[3].charAt(0).toUpperCase())
    console.log('ha ha is', data, errors)
    filterPost(data)
    handleClose()
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
  }

  const handleReset = () => {
    setOpen(false)
    reset()
    location.reload()
  }

  const baId = watch('ba_id')
  const dmId = watch('dm_id')

  useEffect(() => {
    if (baId) {
      dmsBelongToBa(baId)
      cBelongToBa(baId)
    } else if (baId === '') {
      setDmList(dmListData)
      setClientList(clientListData)
    }
  }, [baId])

  useEffect(() => {
    if (dmId) {
      cBelongToDm(dmId)
    } else if (dmId === '') {
      setClientList(cBelongToBaData)
    }
  }, [dmId])

  //Set DM list
  useEffect(() => {
    if (dmBelongToBaData) {
      setDmList(dmBelongToBaData)
    } else if (dmListData) {
      setDmList(dmListData)
    }
  }, [dmBelongToBaData, dmListData])

  // Set Client List
  useEffect(() => {
    if (cBelongToDmData) {
      setClientList(cBelongToDmData)
    }
  }, [cBelongToDmData])

  useEffect(() => {
    if (cBelongToBaData) {
      setClientList(cBelongToBaData)
    }
  }, [cBelongToBaData])
  useEffect(() => {
    if (clientListData) {
      setClientList(clientListData)
    }
  }, [clientListData])

  useEffect(() => {
    setPage(1)
    setNowShowing('filteredPosts')
    setPostList(filteredPosts)
  }, [filteredPosts])

  // if (clientListData) {
  //   console.log(clientListData)
  //   console.log(clientList)
  // }

  console.log('baid is: ', baId)
  console.log('dmList', dmList)
  console.log('dmId is: ', dmId)
  console.log('clientList', clientList)

  console.log('router.pathname in modal is:', router.pathname.split('/')[3])

  if (filteredPosts) {
    console.log('filteredPosts are:', filteredPosts)
  }

  return (
    <Fragment>
      <Button size={'medium'} onClick={handleClickOpen} key={acnt.title} variant='outlined'>
        <Typography sx={{ fontWeight: 500 }}>Filter</Typography>
      </Button>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle>
          <Typography variant={'h4'}>Select Filter Parameters</Typography>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2} alignItems='center' sx={{ mb: 6 }}>
              <Grid item xs={5}>
                {/* Start Date */}
                <FormControl fullWidth>
                  <Controller
                    name='start_date'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='date'
                        value={value}
                        label='Start Date'
                        onChange={onChange}
                        error={Boolean(errors.start_date)}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                  {errors.start_date && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.start_date.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={2} textAlign='center'>
                <Typography variant='h6'>-</Typography>
              </Grid>

              <Grid item xs={5}>
                {/* End Date */}
                <FormControl fullWidth>
                  <Controller
                    name='end_date'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='date'
                        value={value}
                        label='End Date'
                        onChange={onChange}
                        error={Boolean(errors.end_date)}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                  {errors.end_date && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.end_date.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            {/* platform */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='platform-select' error={Boolean(errors.platform)} htmlFor='platform-select'>
                Select platform
              </InputLabel>
              <Controller
                name='platform'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label='Select Platform'
                    onChange={onChange}
                    error={Boolean(errors.platform)}
                    labelId='platform-select'
                    aria-describedby='platform-select'
                  >
                    <MenuItem value=''>none</MenuItem>
                    <MenuItem value='fb'>Facebook</MenuItem>
                  </Select>
                )}
              />
              {errors.platform && (
                <FormHelperText sx={{ color: 'error.main' }} id='platform-select'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
            {/* Ba */}
            {ability?.can('read', 'filter-ba') ? (
              <>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='platform-select' error={Boolean(errors.ba_id)} htmlFor='platform-select'>
                    Select Businesses
                  </InputLabel>
                  <Controller
                    name='ba_id'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Select BA'
                        onChange={onChange}
                        error={Boolean(errors.ba_id)}
                        labelId='platform-select'
                        aria-describedby='platform-select'
                      >
                        <MenuItem value=''>none</MenuItem>

                        {baList
                          ? baList.map(ba => (
                              <MenuItem key={ba._id} value={ba._id}>
                                {ba.username}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    )}
                  />
                  {errors.ba_id && (
                    <FormHelperText sx={{ color: 'error.main' }} id='platform-select'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </>
            ) : null}

            {/* DM */}
            {ability?.can('read', 'filter-dm') ? (
              <>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='platform-select' error={Boolean(errors.dm_id)} htmlFor='platform-select'>
                    Select Digital Manager
                  </InputLabel>
                  <Controller
                    name='dm_id'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Select DM'
                        onChange={onChange}
                        error={Boolean(errors.dm_id)}
                        labelId='platform-select'
                        aria-describedby='platform-select'
                      >
                        <MenuItem value=''>none</MenuItem>
                        {dmList
                          ? dmList.map(dm => (
                              <MenuItem key={dm._id} value={dm._id}>
                                {dm.username}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    )}
                  />
                  {errors.dm_id && (
                    <FormHelperText sx={{ color: 'error.main' }} id='platform-select'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </>
            ) : null}

            {/* Client  */}
            {ability?.can('read', 'filter-c') ? (
              <>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='client-select' error={Boolean(errors.client_id)} htmlFor='client-select'>
                    Select Client
                  </InputLabel>
                  <Controller
                    name='client_id'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Select Client'
                        onChange={onChange}
                        error={Boolean(errors.client_id)}
                        labelId='client-select'
                        aria-describedby='client-select'
                      >
                        <MenuItem value=''>Go to Client Page</MenuItem>

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
                  {errors.client_id && (
                    <FormHelperText sx={{ color: 'error.main' }} id='client-select'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' color='secondary' onClick={handleReset}>
              Reset
            </Button>
            <Button variant='contained' type='submit'>
              Apply
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default FilterModal
