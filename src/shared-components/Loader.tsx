import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export const Loader = () => {
  return (
    <Box display='flex' justifyContent='center' p={'20px'}>
      <CircularProgress disableShrink />
    </Box>
  )
}

export const SimpleLoader = () => {
  return (
    <Box>
      <CircularProgress disableShrink size={20} />
    </Box>
  )
}
