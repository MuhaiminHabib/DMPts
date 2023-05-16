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
import { useCmCountQuery, useCmCountforCQuery } from 'src/store/query/statusApi'

const series = [{ data: [30, 70, 35, 55, 45, 70] }]

const AnalyticsCMCount = () => {
  // ** Hook
  const theme = useTheme()

  // const [count, setCount] = useState<number>(0)
  // const [isFetching, setIsFetching] = useState<boolean>(false)


  // const fetchCMCount = async () => {
  //   setIsFetching(true)
  //   try {
  //     const res = await axiosConfig('/auth/ba-gets-total-of-cm')
  //     console.log(res.data)
  //     setCount(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   setIsFetching(false)
  // }

  // useEffect(() => {
  //   fetchCMCount()
  // }, [])

  const {isLoading, isError, error, data} = useCmCountQuery()
  const {isLoading : isLoadingCmCountforC, 
    isError: isErrorCmCountforC, 
    error : cmCountforCError, 
    data : cmCountforCData} = useCmCountforCQuery()
  

  if(data) {
    console.log('cm count is: ',  data)
  } else if (cmCountforCData) {
    console.log('cm count for c is ',cmCountforCData)
  }  else if (isError) {
    console.log('post count error',error)
  } else if(isLoading) {
    console.log('Loading')
  }

  return (

    <CardStatisticsVertical
      isLoading={isLoading || isLoadingCmCountforC}
      title='Client Managers'
      stats={(data && data ) || (cmCountforCData && cmCountforCData)}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsCMCount
