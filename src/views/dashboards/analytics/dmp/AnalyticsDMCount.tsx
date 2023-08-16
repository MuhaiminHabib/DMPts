import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import { useDmCountQuery } from 'src/store/query/statusApi'

const AnalyticsDMCount = () => {
  // ** Hook
  // const theme = useTheme()

  const { isLoading, data } = useDmCountQuery()

  return (
    <CardStatisticsVertical
      isLoading={isLoading}
      title='Active Digital Managers'
      stats={data ? data.toString() : '0'}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsDMCount
