import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Custom Components Imports
import { useDmCountQuery } from 'src/store/query/statusApi'


const AnalyticsDMCount = () => {
  // ** Hook
  // const theme = useTheme()


  const {isLoading, isError, error, data} = useDmCountQuery()
  

  if(data) {
    console.log(' count of DM is : ',  data)
  } else if (isError) {
    console.log(' DM count error',error)
  } else if(isLoading) {
    console.log('Loading')
  }

  return (
    <CardStatisticsVertical
      isLoading= {isLoading}
      title='Digital Managers'
      stats={data? data.toString() : 'No data'}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsDMCount
