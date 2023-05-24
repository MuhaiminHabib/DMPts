import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

import { useCmCountQuery, useCmCountforBAQuery, useCmCountforCQuery } from 'src/store/query/statusApi'



const AnalyticsCMCount = () => {
  // ** Hook
  const {isLoading, data} = useCmCountQuery()
  const {isLoading: cmCountforBaIsLoading, data : cmCountforBaData} = useCmCountforBAQuery()
  const {
    isLoading : isLoadingCmCountforC, 
    data : cmCountforCData} = useCmCountforCQuery()
  


  return (

    <CardStatisticsVertical
      isLoading={isLoading || cmCountforBaIsLoading || isLoadingCmCountforC}
      title='Client Managers'
      stats={(data ? data.toString() : cmCountforBaData ? cmCountforBaData.toString() : cmCountforCData ? cmCountforCData.toString() : "No data")}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsCMCount 