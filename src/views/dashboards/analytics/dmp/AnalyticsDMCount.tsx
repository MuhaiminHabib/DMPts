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
import { useDmCountQuery } from 'src/store/query/statusApi'

const series = [{ data: [30, 70, 35, 55, 45, 70] }]

const AnalyticsDMCount = () => {
  // ** Hook
  const theme = useTheme()

  // const [count, setCount] = useState<number>(0)
  // const [isFetching, setIsFetching] = useState<boolean>(false)


  // const fetchDMCount = async () => {
  //   setIsFetching(true)
  //   try {
  //     const res = await axiosConfig('auth/ba-gets-total-of-dm')
  //     console.log(res.data)
  //     setCount(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   setIsFetching(false)
  // }

  // useEffect(() => {
  //   fetchDMCount()
  // }, [])

  const {isLoading, isError, error, data} = useDmCountQuery()
  

  if(data) {
    console.log(' count of DM is : ',  data)
  } else if (isError) {
    console.log(' DM count error',error)
  } else if(isLoading) {
    console.log('Loading')
  }

  return (
    <CardStatisticsVertical
      title='Digital Managers'
      stats={data}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsDMCount
