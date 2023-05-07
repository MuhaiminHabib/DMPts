// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { PostsTypes } from 'src/types/apps/postTypes'
import { Box, FormControl, FormHelperText, InputLabel, TextField, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';


// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { UsersType } from 'src/types/apps/userTypes'


type pageProps = {
    user : UsersType
}

interface UserData {
    dmId: string
    email: string
    firstName: string
    lastName: string

  }
  
//   const defaultValues = {
//       dmId: '',
//       email: '',
//       firstName: '',
//       lastName: '',
      
//     }

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        passwordVerify: yup.string().required(),
        email: yup.string().email().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        role: yup.string().required()
      })

const UserEditModal = ({user} : pageProps) => {
    const defaultValues = {
        dmId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        
      }
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (e: MouseEvent) => {
    e.stopPropagation()
    console.log('done submitting')
    // dispatch(createBAUser(data))
    handleClose()
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

 

  return (
    <Fragment>
      <Button variant='contained' onClick={handleClickOpen} size='small'>
        Edit
      </Button>
      
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle>
            <Typography variant={'h4'}>Edit User Details:</Typography>
        </DialogTitle> 
        <Box sx={{ p: 5 }}>
        <form 
        // onSubmit={handleSubmit(onSubmit)}
        >

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dmId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                disabled={true}
                  value={value}
                  label='User Id'
                  onChange={onChange}
                  error={Boolean(errors.dmId)}
                />
              )}
            />
            {errors.dmId && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.dmId.message}</FormHelperText>
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
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
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
            <Button type='submit' variant='contained' sx={{ ml: 3 }} onClick={handleSubmit(onSubmit)}>
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
