import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useAssociateDmtoCMutation, useFetchCListQuery, useFetchDmListQuery } from 'src/store/query/userApi'
import { showErrorAlert, showSuccessAlert } from 'src/utils/swal'

const defaultValues = {
  client_id: '',
  dm_id: ''
}

const Tag = () => {
  // **States
  // **Hooks
  const { data: dmList } = useFetchDmListQuery()
  const { data: clientList } = useFetchCListQuery()
  const [
    associateDmtoC,
    { isLoading: associationIsLoading, isError: associationIsError, error: associationError, data: associationResult }
  ] = useAssociateDmtoCMutation()

  const {
    control,
    handleSubmit,
    reset,

    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  useEffect(() => {
    if (associationResult) {
      showSuccessAlert({ text: 'Association Successful' })
    } else if (associationIsError) {
      showErrorAlert({ error: associationError })
    }
  }, [associationResult, associationIsError, associationError])

  // **Functions
  const onSubmit = async (data: any) => {
    const submitData = {
      dmId: data.dm_id,
      cId: data.client_id
    }
    associateDmtoC(submitData)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Tag DMs with Clients' />

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <Grid container spacing={2} alignItems='center' sx={{ mb: 6 }}>
                  <Grid item xs={5}>
                    {/* DM */}
                    <FormControl fullWidth>
                      <InputLabel id='platform-select' error={Boolean(errors.dm_id)} htmlFor='platform-select'>
                        Select Digital Manager
                      </InputLabel>
                      <Controller
                        name='dm_id'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={value}
                            label='Select Digital Manager'
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
                  </Grid>

                  <Grid item xs={2} textAlign='center'>
                    <Typography>With</Typography>
                  </Grid>

                  <Grid item xs={5}>
                    {/* Client  */}
                    <FormControl fullWidth>
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
                            <MenuItem value=''>none</MenuItem>
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
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 40 }}>
                <Button variant='outlined' color='secondary' onClick={() => reset()}>
                  Reset
                </Button>
                {/* <Button variant='contained' type='submit'>
                    Apply
                    {associationIsLoading ? <SimpleLoader /> : null}
                  </Button> */}

                <LoadingButton loading={associationIsLoading} variant='contained' type='submit'>
                  <>Submit</>
                </LoadingButton>
              </DialogActions>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
Tag.acl = {
  action: 'read',
  subject: 'tag-page'
}

export default Tag
