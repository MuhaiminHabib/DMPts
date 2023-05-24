// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types


// ** Demo Components Imports

import UserViewRight from 'src/views/apps/user/view/UserViewRight'

type Props = {
  tab: string
  
  // invoiceData: InvoiceType[]
}

const UserView = ({ tab }: Props) => {
  return (
    <Grid container spacing={6}>
      <UserViewRight tab={tab} />
    </Grid>
  )
}

export default UserView
