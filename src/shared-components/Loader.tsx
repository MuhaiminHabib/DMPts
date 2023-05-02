import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <Box display='flex' justifyContent='center' p={'20px'}>
       <CircularProgress disableShrink />
     </Box>
  )
}

export default Loader