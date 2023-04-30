// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { InvoiceType } from 'src/types/apps/postTypes'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
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
