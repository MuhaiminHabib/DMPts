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

const series = [{ data: [30, 70, 35, 55, 45, 70] }]

const AnalyticsCCount = () => {
  // ** Hook
  const theme = useTheme()

  const [count, setCount] = useState<number>(0)
  const [isFetching, setIsFetching] = useState<boolean>(false)


  const fetchBACount = async () => {
    setIsFetching(true)
    try {
      const res = await axiosConfig('/auth/ba-gets-total-of-dm')
      console.log(res.data)
      setCount(res.data)
    } catch (error) {
      console.log(error)
    }
    setIsFetching(false)
  }

  useEffect(() => {
    fetchBACount()
  }, [])

  return (
    <CardStatisticsVertical
      title='Total Clients'
      stats={count.toString()}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsCCount
