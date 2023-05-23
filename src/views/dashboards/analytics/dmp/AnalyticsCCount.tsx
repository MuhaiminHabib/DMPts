import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

import { useCCountQuery, useCCountforBAQuery, useCCountforDmQuery,  } from 'src/store/query/statusApi'



const AnalyticsCCount = () => {
  // ** Hook
  const {
    isLoading, 
    data} = useCCountQuery()
  const {
    isLoading : CCountforBaIsLoading, 
    data: CCountforBaData} = useCCountforBAQuery()
  const {
    isLoading: isLoadingCCountforDm, 
    data: CCountforDmData} = useCCountforDmQuery()
  

    if((isLoading || isLoadingCCountforDm)) {
      console.log('isLoading')
    } else if(CCountforDmData) {
      console.log(CCountforDmData)
    }

  return (
    <CardStatisticsVertical
    isLoading={isLoading || CCountforBaIsLoading || isLoadingCCountforDm}
      title='Total Clients'
      stats={ data ? data.toString() : CCountforBaData ? CCountforBaData.toString() : CCountforDmData ? CCountforDmData.toString() : 'No Data'}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}


export default AnalyticsCCount
