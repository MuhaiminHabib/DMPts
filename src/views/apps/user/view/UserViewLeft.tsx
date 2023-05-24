// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'



// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'


interface ColorsType {
  [key: string]: ThemeColor
}

const data: UsersType = {
  _id: '123',
  firstName: 'Muhaimin',
  lastName: 'Habib',
  username: 'habib',
  email: 'habib@123',
  password: '123',
  passwordVerify: '123',
  active: true,
  role: 'BA',
  creator: 'Habib', customerID: '123', dm:[]
}

const roleColors: ColorsType = {
  admin: 'error',
  BA: 'info',
  DM: 'warning',
  C: 'success',
  CM: 'primary'
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
// const Sup = styled('sup')(({ theme }) => ({
//   top: '0.25rem',
//   left: '-1rem',
//   fontSize: '1.125rem',
//   position: 'absolute',
//   color: theme.palette.primary.main
// }))

// ** Styled <sub> component
// const Sub = styled('sub')(({ theme }) => ({
//   fontSize: '1rem',
//   marginTop: '0.5rem',
//   alignSelf: 'flex-end',
//   color: theme.palette.text.secondary
// }))

const UserViewLeft = () => {
  // ** States

  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data.avatar ? (
                <CustomAvatar
                  src={data.avatar}
                  variant='rounded'
                  alt={data.username}
                  sx={{ width: 110, height: 110, mb: 6 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor as ThemeColor}
                  sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
                >
                  {getInitials(data.username)}
                </CustomAvatar>
              )}
              <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.375rem !important' }}>
                {data.username}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={data.role}
                sx={{ fontWeight: 500 }}
                color={roleColors[data.role]}
              />
            </CardContent>

            <CardContent sx={{ mt: 6, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                    <Icon icon='bx:check' />
                  </CustomAvatar>
                  <div>
                    <Typography variant='h6' sx={{ fontSize: '1.125rem !important' }}>
                      1.23k
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Task Done</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                    <Icon icon='bx:customize' />
                  </CustomAvatar>
                  <div>
                    <Typography variant='h6' sx={{ fontSize: '1.125rem !important' }}>
                      568
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Project Done</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(1)} !important` }} />
              <Box sx={{ pt: 4, pb: 2 }}>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Username:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>@{data.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Billing Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Status:</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={data.active}
                    sx={{ fontWeight: 500 }}
                    color={statusColors[data.active ? 'active' : 'inactive']}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Type:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{data.role}</Typography>
                </Box>
              </Box>
            </CardContent>

            {/* <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
                Suspend
              </Button>
            </CardActions> */}

            {/* Edit form start */}
            {/* <Dialog
              scroll='body'
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{
                '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] },
                '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
              }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Edit User Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='First Name' defaultValue={data.username.split(' ')[0]} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Last Name' defaultValue={data.username.split(' ')[1]} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Username'
                        defaultValue={data.username}
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Email' defaultValue={data.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={data.status}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='pending'>Pending</MenuItem>
                          <MenuItem value='active'>Active</MenuItem>
                          <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='TAX ID' defaultValue='Tax-8894' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Phone Number' defaultValue={`+1 ${data.contact}`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Language</InputLabel>
                        <Select
                          label='Language'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Country</InputLabel>
                        <Select
                          label='Country'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>USA</MenuItem>
                          <MenuItem value='UK'>UK</MenuItem>
                          <MenuItem value='Spain'>Spain</MenuItem>
                          <MenuItem value='Russia'>Russia</MenuItem>
                          <MenuItem value='France'>France</MenuItem>
                          <MenuItem value='Germany'>Germany</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog> */}

            {/* Edit form end */}

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
