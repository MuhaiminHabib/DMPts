import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

import { useBaCountQuery } from 'src/store/query/statusApi'


const AnalyticsBACount = () => {


  // ** Hook
  // const theme = useTheme()
  const {isLoading, isError, error, data} = useBaCountQuery()



  if(data) {
    console.log('BA count is',data)
  } else if (isError) {
    console.log(error)
  } else if(isLoading) {
    console.log('Loading')
  }

  return (

    <CardStatisticsVertical
    isLoading={isLoading}
      title='Active Businesses'
      stats={data ? data.toString() : '0'}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsBACount
