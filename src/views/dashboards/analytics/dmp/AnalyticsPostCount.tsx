import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

import { usePostCountQuery, usePostCountforCQuery, usePostCountforDmQuery } from 'src/store/query/statusApi'

const AnalyticsPostCount = () => {
  // ** Hook
  // const theme = useTheme()

  const {isLoading, 
    // isError, error, 
    data} = usePostCountQuery()
  const {isLoading: isLoadingPostCountForDm, 
    // isError: isErrorPostCountForDm, 
    // error: PostCountForDmError, 
    data: PostCountForDmData} = usePostCountforDmQuery()

  const {isLoading: isLoadingPostCountForC, 
    // isError: isErrorPostCountForC, 
    // error: PostCountForCError, 
    data: PostCountForCData} = usePostCountforCQuery()
  
  return (
    <CardStatisticsVertical
    isLoading ={isLoading || isLoadingPostCountForDm || isLoadingPostCountForC}
      title='Total Posts'
      stats={ (data ? data.toString() : PostCountForDmData ? PostCountForDmData.toString() : PostCountForCData ? PostCountForCData.toString()  : 'No Data')}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsPostCount
