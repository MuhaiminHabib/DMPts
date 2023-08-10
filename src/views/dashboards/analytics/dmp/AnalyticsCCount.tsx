import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

import { useCCountQuery } from 'src/store/query/statusApi'

const AnalyticsCCount = () => {
  // ** Hook
  const { isLoading, data } = useCCountQuery()

  return (
    <CardStatisticsVertical
      isLoading={isLoading}
      title='Active Clients'
      stats={data ? data.toString() : '0'}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsCCount
