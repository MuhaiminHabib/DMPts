// // ** React Imports
// import { Fragment, useContext, useEffect, useState } from 'react'

// // ** Config

// // ** MUI Imports
// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import { useTheme } from '@mui/material/styles'
// import DialogTitle from '@mui/material/DialogTitle'
// import useMediaQuery from '@mui/material/useMediaQuery'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import { Box, Typography } from '@mui/material'
// import { UsersType } from 'src/types/apps/userTypes'
// import { useFetchCListForBAQuery, useFetchCListForDMQuery, useFetchCListQuery } from 'src/store/query/userApi'
// import { AuthContext } from 'src/context/AuthContext'
// import { useAddFbPageMutation } from 'src/store/query/fbApi'

// type account = {
//   title: string
//   logo: string
// }

// const acnt: account = {
//   title: 'hello',
//   logo: 'logo'
// }

// const ScheduleDateModal = () => {
//   // ** State
//   const [open, setOpen] = useState<boolean>(false)

//   // ** Hooks
//   const theme = useTheme()
//   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

//   //Functions

//   const handleClickOpen = () => setOpen(true)

//   const handleClose = () => setOpen(false)

//   return (
//     <Fragment>
//       <Button
//         onClick={handleClickOpen}
//         key={acnt.title}
//         variant='outlined'
//         sx={{
//           marginRight: 5,
//           marginBottom: 5
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 200 }}>
//           <Typography sx={{ fontWeight: 500 }}>Schedule</Typography>
//         </Box>
//       </Button>

//       <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
//         <DialogTitle>
//           <Typography variant={'h4'}>Enter Schedule Time</Typography>
//         </DialogTitle>

//         <DialogContent>
//           <Typography>Enter your desired content here</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button variant='outlined' color='secondary' onClick={handleClose}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Fragment>
//   )
// }

// export default ScheduleDateModal

import React from 'react'

const ScheduleDateModal = () => {
  return <div>ScheduleDateModal</div>
}

export default ScheduleDateModal
