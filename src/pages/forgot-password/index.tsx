// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import { FormControl, FormHelperText } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// **React-Hook-Form
import { Controller, useForm } from 'react-hook-form'

//** yup
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

//** 
import { useForgotPasswordMutation } from 'src/store/query/authApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'

// Styled Components
const ForgotPasswordIllustration = styled('img')({
  height: 'auto',
  maxWidth: '100%'
})

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('lg')]: {
    maxWidth: 480
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 635
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(12)
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))



// interface FormData {
//   username: string,
//   email: string,
// }

const schema = yup.object().shape ({
  username: yup.string().required(),
  email: yup.string().email().required()
})


const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))
  const [forgotPassword, {isLoading, isError, error, data}] = useForgotPasswordMutation()

  const { 
    handleSubmit, 
    control, 
    formState: { errors } 
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data : any ) => {
    console.log('data to submit is:', data)
    forgotPassword(data)
  }

  if(isLoading) {
    showLoadingAlert()
  } else if(isError) {
    showErrorAlert({error: error})
  } else if( data) {
    showSuccessAlert({text: 'Email sent to your address'})
  }

  // ** Var
  const { skin } = settings

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ p: 12, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ForgotPasswordIllustration
            width={700}
            alt='forgot-password-illustration'
            src={`/images/pages/girl-unlock-password-${theme.palette.mode}.png`}
          />
        </Box>
      ) : null}
      <RightWrapper
        sx={{ ...(skin === 'bordered' && !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }) }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 400 }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='h5'
              sx={{
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: '-0.45px',
                fontSize: '1.75rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Typography variant='h6' sx={{ mb: 1.5 }}>
            Forgot Password? 🔒
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Enter your <b>username</b> &#38; <b>email</b> and we&prime;ll send you a new password
          </Typography>

          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
           <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='username'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label='Username'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.username)}
                  />
                )}
              />
              {errors.username && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message?.toString()}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label='Email'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message?.toString()}</FormHelperText>
              )}
            </FormControl>
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
              Send me a Password
            </Button>
            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LinkStyled href='/login'>
                <Icon icon='bx:chevron-left' />
                <span>Back to login</span>
              </LinkStyled>
            </Typography>
          </form>

        </Box>
      </RightWrapper>
    </Box>
  )
}

ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ForgotPassword.guestGuard = true

export default ForgotPassword
