// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box, FormControl, FormHelperText, TextField, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { UsersType } from 'src/types/apps/userTypes'
import { useEditUserMutation } from 'src/store/query/userApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'

type pageProps = {
  user: UsersType
}

// interface UserData {
//   userId: string
//   username: string
//   email: string
//   firstName: string
//   lastName: string
// }

const schema = yup.object().shape({
  userId: yup.string(),
  username: yup.string().required(),
  email: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required()
})

const UserEditModal = ({ user }: pageProps) => {
  const defaultValues = {
    userId: user._id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  }

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [editUser, { isLoading, isError, error, data }] = useEditUserMutation()
  const {
    // reset,
    // setValue,
    // setError,

    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    editUser(data)
    handleClose()
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  if (isLoading) {
    console.log('Loading')
    showLoadingAlert()
  } else if (isError) {
    console.log(error)
    showErrorAlert({ error: error })
  } else if (data) {
    showSuccessAlert({ text: 'User Info Updated' })
  }

  return (
    <Fragment>
      <Tooltip title='Edit User Details' placement='top-start'>
        <Button variant='text' onClick={handleClickOpen} size='small'>
          <EditIcon />
        </Button>
      </Tooltip>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle>
          <Typography variant={'h4'}>Edit User Details:</Typography>
        </DialogTitle>
        <Box sx={{ p: 5 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='username'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled={true}
                    value={value}
                    label='User Name'
                    onChange={onChange}
                    error={Boolean(errors.username)}
                  />
                )}
              />
              {errors.username && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='First Name'
                    onChange={onChange}
                    placeholder='John Doe'
                    error={Boolean(errors.firstName)}
                  />
                )}
              />
              {errors.firstName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Last Name'
                    onChange={onChange}
                    placeholder='John Doe'
                    error={Boolean(errors.lastName)}
                  />
                )}
              />
              {errors.lastName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='email'
                    value={value}
                    label='Email'
                    onChange={onChange}
                    placeholder='johndoe@email.com'
                    error={Boolean(errors.email)}
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
            {/* <DialogActions> */}
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' sx={{ ml: 3 }}>
              Update Info
            </Button>
            {/* </DialogActions> */}
          </form>
        </Box>
      </Dialog>
    </Fragment>
  )
}

export default UserEditModal
