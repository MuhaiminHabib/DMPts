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
import { useCCountQuery, useCCountforDmQuery,  } from 'src/store/query/statusApi'

const series = [{ data: [30, 70, 35, 55, 45, 70] }]

const AnalyticsCCount = () => {
  // ** Hook
  const theme = useTheme()

  const {isLoading, isError, error, data} = useCCountQuery()
  const {isLoading: isLoadingCCountforDm, 
    isError: isErrorCCountforDm, 
    error: CCountforDmError, 
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
