// ** React Imports
import { Fragment, useState } from 'react'

// ** Config

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

// import { UsersType } from 'src/types/apps/userTypes'
// import { useFetchCListForBAQuery, useFetchCListForDMQuery, useFetchCListQuery } from 'src/store/query/userApi'
// import { AuthContext } from 'src/context/AuthContext'
// import { useAddFbPageMutation } from 'src/store/query/fbApi'
// import Link from 'next/link'

type account = {
  title: string
  logo: string
}

const acnt: account = {
  title: 'hello',
  logo: 'logo'
}

const defaultValues = {
  client: '',
  pageId: '',
  body: '',
  publishOption: 'publish',
  scheduledDate: '',
  visibleToClient: false,
  content: null
}
const FilterModal = () => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    control,
    handleSubmit,

    // reset,
    // watch,
    // getValues,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange'

    // resolver: zodResolver(SidebarAddPostSchema)
  })

  //Functions
  const onSubmit = async (data, errors) => {
    console.log(data, errors)
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Button sx={{ height: '100%' }} size={'medium'} onClick={handleClickOpen} key={acnt.title} variant='outlined'>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 200 }}>
          <Typography sx={{ fontWeight: 500 }}>Filter</Typography>
        </Box>
      </Button>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle>
          <Typography variant={'h4'}>Select Filter Parameters</Typography>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
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

                    {/* {fbPageListOfClient
                      ? fbPageListOfClient.map(pages => (
                          <MenuItem key={pages._id} value={pages._id}>
                            {pages.name}
                          </MenuItem>
                        ))
                      : null} */}
                  </Select>
                )}
              />
              {errors.pageId && (
                <FormHelperText sx={{ color: 'error.main' }} id='platform-select'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
            {/* Ba */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='platform-select' error={Boolean(errors.pageId)} htmlFor='platform-select'>
                Select Businesses
              </InputLabel>
              <Controller
                name='pageId'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label='Select BA'
                    onChange={onChange}
                    error={Boolean(errors.pageId)}
                    labelId='platform-select'
                    aria-describedby='platform-select'
                  >
                    <MenuItem value=''>none</MenuItem>

                    {/* {fbPageListOfClient
                      ? fbPageListOfClient.map(pages => (
                          <MenuItem key={pages._id} value={pages._id}>
                            {pages.name}
                          </MenuItem>
                        ))
                      : null} */}
                  </Select>
                )}
              />
              {errors.pageId && (
                <FormHelperText sx={{ color: 'error.main' }} id='platform-select'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>

            {/* DM */}
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='platform-select' error={Boolean(errors.pageId)} htmlFor='platform-select'>
                Select Digital Manager
              </InputLabel>
              <Controller
                name='pageId'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label='Select DM'
                    onChange={onChange}
                    error={Boolean(errors.pageId)}
                    labelId='platform-select'
                    aria-describedby='platform-select'
                  >
                    <MenuItem value=''>none</MenuItem>
                    {/* {fbPageListOfClient
                      ? fbPageListOfClient.map(pages => (
                          <MenuItem key={pages._id} value={pages._id}>
                            {pages.name}
                          </MenuItem>
                        ))
                      : null} */}
                  </Select>
                )}
              />
              {errors.pageId && (
                <FormHelperText sx={{ color: 'error.main' }} id='platform-select'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>

            {/* Client  */}
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
                    <MenuItem value=''>Go to Client Page</MenuItem>

                    {/* {cList
                      ? cList.map(client => (
                          <MenuItem key={client._id} value={client._id}>
                            {client.username}
                          </MenuItem>
                        ))
                      : null} */}
                  </Select>
                )}
              />
              {errors.client && (
                <FormHelperText sx={{ color: 'error.main' }} id='client-select'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='contained'>Apply</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default FilterModal
