import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/joy/Button'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import axiosConfig from 'src/configs/axios'
import { useBaCountQuery } from 'src/store/query/statusApi'

const series = [{ data: [30, 70, 35, 55, 45, 70] }]

const AnalyticsBACount = () => {
  const [count, setCount] = useState<number>(0)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  // ** Hook
  const theme = useTheme()
  const {isLoading, isError, error, data} = useBaCountQuery()


  // const options: ApexOptions = {
  //   chart: {
  //     parentHeightOffset: 0,
  //     toolbar: { show: false }
  //   },
  //   tooltip: { enabled: false },
  //   dataLabels: { enabled: false },
  //   stroke: {
  //     width: 3,
  //     curve: 'smooth',
  //     lineCap: 'round'
  //   },
  //   grid: {
  //     show: false,
  //     padding: {
  //       left: 0,
  //       top: -25,
  //       right: 17
  //     }
  //   },
  //   fill: {
  //     type: 'gradient',
  //     gradient: {
  //       opacityTo: 0.7,
  //       opacityFrom: 0.5,
  //       shadeIntensity: 1,
  //       stops: [0, 90, 100],
  //       colorStops: [
  //         [
  //           {
  //             offset: 0,
  //             opacity: 0.6,
  //             color: theme.palette.success.main
  //           },
  //           {
  //             offset: 100,
  //             opacity: 0.1,
  //             color: theme.palette.background.paper
  //           }
  //         ]
  //       ]
  //     }
  //   },
  //   theme: {
  //     monochrome: {
  //       enabled: true,
  //       shadeTo: 'light',
  //       shadeIntensity: 1,
  //       color: theme.palette.success.main
  //     }
  //   },
  //   xaxis: {
  //     labels: { show: false },
  //     axisTicks: { show: false },
  //     axisBorder: { show: false }
  //   },
  //   yaxis: { show: false },
  //   markers: {
  //     size: 1,
  //     offsetY: 2,
  //     offsetX: -4,
  //     strokeWidth: 4,
  //     strokeOpacity: 1,
  //     colors: ['transparent'],
  //     strokeColors: 'transparent',
  //     discrete: [
  //       {
  //         size: 6,
  //         seriesIndex: 0,
  //         fillColor: theme.palette.common.white,
  //         strokeColor: theme.palette.success.main,
  //         dataPointIndex: series[0].data.length - 1
  //       }
  //     ]
  //   }
  // }

  // const fetchBACount = async () => {
  //   setIsFetching(true)
  //   try {
  //     const res = await axiosConfig('auth/total-of-ba')
  //     console.log(res.data)
  //     setCount(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   setIsFetching(false)
  // }

  // useEffect(() => {
  //   fetchBACount()
  // }, [])

  if(data) {
    console.log('BA count is',data)
  } else if (isError) {
    console.log(error)
  } else if(isLoading) {
    console.log('Loading')
  }

  return (

    <CardStatisticsVertical
      title='BA Count'
      stats={data ? data.toString() : '0'}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsBACount
