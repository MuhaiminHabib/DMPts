import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

import { usePostCountQuery, usePostCountforBAQuery, usePostCountforCQuery, usePostCountforDmQuery } from 'src/store/query/statusApi'

const AnalyticsPostCount = () => {
  // ** Hook
  // const theme = useTheme()

  const {
    isLoading, 
    data} = usePostCountQuery()
  const {
    isLoading: isLoadingPostCountforBa, 
    data: PostCountforBaData} = usePostCountforBAQuery()

    const {
    isLoading: isLoadingPostCountForDm, 
    isError,
    error,
    data: PostCountForDmData} = usePostCountforDmQuery()

  const {
    isLoading: isLoadingPostCountForC, 
    data: PostCountForCData} = usePostCountforCQuery()

    if(isLoadingPostCountForDm) {
      console.log('loading the right data')
    } else if (PostCountForDmData) {
      console.log('Post count data is: ', PostCountForDmData)
    } else if(isError) {
      console.log(error)
    }
  
  return (
    <CardStatisticsVertical
    isLoading ={isLoading || isLoadingPostCountforBa || isLoadingPostCountForDm || isLoadingPostCountForC}
      title='Total Posts'
      stats={ 
        (data ? data.toString() 
        : PostCountforBaData? PostCountforBaData.toString() 
        : PostCountForDmData ? PostCountForDmData.toString() 
        : PostCountForCData ? PostCountForCData.toString()  
        : '0')}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsPostCount
