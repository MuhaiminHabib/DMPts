import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

import { useCCountQuery, useCCountforDmQuery,  } from 'src/store/query/statusApi'



const AnalyticsCCount = () => {
  // ** Hook
  // const theme = useTheme()

  const {isLoading, 
    // isError, error, 
    data} = useCCountQuery()
  const {isLoading: isLoadingCCountforDm, 
    // isError: isErrorCCountforDm, 
    // error: CCountforDmError, 
    data: CCountforDmData} = useCCountforDmQuery()
  

    if((isLoading || isLoadingCCountforDm)) {
      console.log('isLoading')
    } else if(CCountforDmData) {
      console.log(CCountforDmData)
    }

  return (
    <CardStatisticsVertical
    isLoading={isLoading || isLoadingCCountforDm}
      title='Total Clients'
      stats={ (data && data) || (CCountforDmData && CCountforDmData)}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}


export default AnalyticsCCount
