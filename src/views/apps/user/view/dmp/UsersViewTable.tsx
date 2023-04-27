import { Grid } from '@mui/material'
import React, { useEffect } from 'react'

// ** Demo Component Imports
import UsersInvoiceListTable from 'src/views/apps/user/view/UsersInvoiceListTable'

const UsersViewTable = () => {
  useEffect(() => {
    console.log('i am use Effect')
  }, [])
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <h1>i will show the table for</h1>
        {/* <UsersInvoiceListTable invoiceData={invoiceData} /> */}
      </Grid>
    </Grid>
  )
}

export default UsersViewTable
