// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Types Imports
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

import Loader from 'src/shared-components/Loader'

const CardStatsVertical = (props: CardStatsVerticalProps) => {
  // ** Props
  const { title, stats, avatarSrc, avatarIcon, avatarColor = 'primary', isLoading } = props

  return (
    <Card sx={{ minWidth: 145 }}>
      <CardContent sx={{ p: theme => `${theme.spacing(5, 5, 4)} !important` }}>
        <Box sx={{ display: 'flex', mb: 4, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <CustomAvatar
            skin='light'
            variant='rounded'
            color={avatarColor}
            src={avatarSrc ?? ''}
            sx={{ width: 42, height: 42 }}
          >
            {avatarIcon && !avatarSrc ? avatarIcon : null}
          </CustomAvatar>
        </Box>
        <Typography sx={{ mb: 0.5, fontWeight: 600, color: 'text.secondary', height: 50 }}>{title}</Typography>
        {
          <Typography variant='h5' sx={{ mb: 2 }}>
            {isLoading ? <Loader /> : stats}
          </Typography>
        }
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
