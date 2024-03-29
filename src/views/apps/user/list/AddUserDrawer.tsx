// ** React Imports
import React, { useContext, useEffect, useState } from 'react'

// ** MUI Imports

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { AuthContext } from 'src/context/AuthContext'
import { useCreateUserMutation } from 'src/store/query/userApi'
import { showErrorAlert, showSuccessAlert } from 'src/utils/swal'

import LoadingButton from '@mui/lab/LoadingButton'
import {
  Box,
  BoxProps,
  Button,
  Drawer,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  styled
} from '@mui/material'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  addClient?: boolean
  addDm?: boolean
  addCm?: boolean
}

interface UserData {
  username: string
  password: string
  passwordVerify: string
  email: string
  firstName: string
  lastName: string
  role: string
}

// const showErrors = (field: string, valueLen: number, min: number) => {
//   if (valueLen === 0) {
//     return `${field} field is required`
//   } else if (valueLen > 0 && valueLen < min) {
//     return `${field} must be at least ${min} characters`
//   } else {
//     return ''
// }

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4)
    .matches(/^[a-zA-Z0-9]{4,}$/, 'Must contain 4 characters of letters and digits only')
    .required(),
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  role: yup.string().required(),
  password: yup
    .string()
    .min(8)
    .max(64)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,64})/,
      'Must contain 8 to 64 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
    )
    .required(),
  passwordVerify: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match')
})

const defaultValues = {
  username: '',
  password: '',
  passwordVerify: '',
  email: '',
  firstName: '',
  lastName: '',
  role: ''
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, addClient, addDm, addCm } = props

  // ** State
  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordVerify: false
  })

  // ** Hooks
  const auth = useContext(AuthContext)
  const [createUser, { isLoading, isError, error, data }] = useCreateUserMutation()
  const {
    reset,
    control,

    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (isError) {
      console.log(error)
      showErrorAlert({ error: error })
    } else if (data) {
      showSuccessAlert({ text: 'User Created' })
      handleClose()
    }
  }, [isLoading, isError, error, data])

  // ** Functions
  const onSubmit = async (data: UserData) => {
    console.log('from form:', data)

    createUser(data)
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const handleClickTogglePassword = (field: string) => {
    console.log('i am working', field)
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }))
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
        <Typography variant='h6'>Add User</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='username'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Username'
                  onChange={onChange}
                  placeholder='johndoe'
                  error={Boolean(errors.username)}
                />
              )}
            />
            {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
          </FormControl>
          {/* Email */}
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

          {/* Password */}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel htmlFor='icons-adornment-password'>Password</InputLabel>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <OutlinedInput
                  label='Password'
                  value={value}
                  id='icons-adornment-password'
                  onChange={onChange}
                  type={showPassword.password ? 'text' : 'password'}
                  error={Boolean(errors.password)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => handleClickTogglePassword('password')}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon fontSize={20} icon={showPassword.password ? 'bx:show' : 'bx:hide'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
          </FormControl>

          {/* Verify Password */}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel htmlFor='icons-adornment-password'>Verify Password</InputLabel>
            <Controller
              name='passwordVerify'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <OutlinedInput
                  label='Verify Password'
                  value={value}
                  id='icons-adornment-password'
                  onChange={onChange}
                  type={showPassword.passwordVerify ? 'text' : 'password'}
                  error={Boolean(errors.passwordVerify)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => handleClickTogglePassword('passwordVerify')}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon fontSize={20} icon={showPassword.passwordVerify ? 'bx:show' : 'bx:hide'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.passwordVerify && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.passwordVerify.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='validation-billing-select' error={Boolean(errors.role)} htmlFor='validation-billing-select'>
              User role
            </InputLabel>
            <Controller
              name='role'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='User Role'
                  onChange={onChange}
                  error={Boolean(errors.role)}
                  labelId='validation-billing-select'
                  aria-describedby='validation-billing-select'
                >
                  <option aria-label='None' value='' />
                  {auth.user?.role === 'A' ? (
                    <MenuItem value='BA'>Business</MenuItem>
                  ) : auth.user?.role === 'BA' && addDm ? (
                    <MenuItem value='DM'>Digital Manager</MenuItem>
                  ) : auth.user?.role === 'BA' && addClient ? (
                    <MenuItem value='C'>Client</MenuItem>
                  ) : auth.user?.role === 'DM' && addClient ? (
                    <MenuItem value='C'>Client</MenuItem>
                  ) : auth.user?.role === 'C' && addCm ? (
                    <MenuItem value='CM'>Client Manager</MenuItem>
                  ) : null}
                </Select>
              )}
            />
            {errors.role && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-billing-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <LoadingButton size='large' loading={isLoading} variant='contained' type='submit'>
              <>Add User</>
            </LoadingButton>
            {/* <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Add User
            </Button> */}
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
