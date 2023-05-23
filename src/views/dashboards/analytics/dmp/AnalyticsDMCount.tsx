import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import { useDmCountQuery, useDmCountforBAQuery } from 'src/store/query/statusApi'




const AnalyticsDMCount = () => {
  // ** Hook
  // const theme = useTheme()


  const {isLoading, data} = useDmCountQuery()

  const {
    isLoading : DmCountforBaIsLoading, 
    isError: dmforBAIsError,
    error: dmforBAError,
    data: DmCountforBaData} = useDmCountforBAQuery()

  

  if(DmCountforBaData) {
    console.log(' count of DM is : ',  DmCountforBaData)
  } else if(dmforBAIsError) {
    console.log(dmforBAError)
  } else if(DmCountforBaIsLoading) {
    console.log('it is loading')
  }

  return (
    <CardStatisticsVertical
      isLoading= {isLoading || DmCountforBaIsLoading}
      title='Digital Managers'
      stats={data? data.toString() : DmCountforBaData ? DmCountforBaData.toString() : '0'}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsDMCount
