// ** MUI Imports
import Card from '@mui/material/Card'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'

// Styled Grid component
// const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
//   [theme.breakpoints.down('sm')]: {
//     order: -1,
//     display: 'flex',
//     justifyContent: 'center'
//   }
// }))

// Styled component for the image
// const Img = styled('img')(({ theme }) => ({
//   right: 60,
//   bottom: -1,
//   height: 170,
//   position: 'absolute',
//   [theme.breakpoints.down('sm')]: {
//     position: 'static'
//   }
// }))

const AnalyticsCongratulations = () => {
  // ** Hook

  // const theme = useTheme()
  const {user} = useContext(AuthContext)

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ py: theme => `${theme.spacing(5)} !important` }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} sx={{ textAlign: ['center', 'start'] }}>
            <Typography variant='h5' sx={{ mb: 4, color: 'primary.main' }}>
              Welcome {user?.username}! 🎉
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Get ready to set and check your digital assets.</Typography>

            {/* <Typography sx={{ mb: 3, color: 'text.secondary' }}>Check your new badge in your profile.</Typography>
            <Button size='small' variant='outlined'>
              View Badges
            </Button> */}
          </Grid>

          {/* <StyledGrid item xs={12} sm={6}>
            <Img alt='Congratulations John' src={`/images/cards/illustration-john-${theme.palette.mode}.png`} />
          </StyledGrid> */}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AnalyticsCongratulations
