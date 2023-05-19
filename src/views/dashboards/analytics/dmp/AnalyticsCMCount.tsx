import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

import { useCmCountQuery, useCmCountforCQuery } from 'src/store/query/statusApi'



const AnalyticsCMCount = () => {
  // ** Hook
  // const theme = useTheme()
  const {isLoading, isError, error, data} = useCmCountQuery()
  const {isLoading : isLoadingCmCountforC, 
    // isError: isErrorCmCountforC, 
    // error : cmCountforCError, 
    data : cmCountforCData} = useCmCountforCQuery()
  

  if(data) {
    console.log('cm count is: ',  data)
  } else if (cmCountforCData) {
    console.log('cm count for c is ',cmCountforCData)
  }  else if (isError) {
    console.log('post count error',error)
  } else if(isLoading) {
    console.log('Loading')
  }

  return (

    <CardStatisticsVertical
      isLoading={isLoading || isLoadingCmCountforC}
      title='Client Managers'
      stats={(data && data ) || (cmCountforCData && cmCountforCData)}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsCMCount 