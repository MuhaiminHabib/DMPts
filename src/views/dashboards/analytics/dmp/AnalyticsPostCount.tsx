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
import { useContext, useEffect, useState } from 'react'
import axiosConfig from 'src/configs/axios'
import { usePostCountQuery, usePostCountforCQuery, usePostCountforDmQuery } from 'src/store/query/statusApi'
import { AuthContext } from 'src/context/AuthContext'
import Loader from 'src/shared-components/Loader'

const series = [{ data: [30, 70, 35, 55, 45, 70] }]

const AnalyticsPostCount = () => {
  // ** Hook
  const theme = useTheme()

  const {isLoading, isError, error, data} = usePostCountQuery()
  const {isLoading: isLoadingPostCountForDm, 
    isError: isErrorPostCountForDm, 
    error: PostCountForDmError, 
    data: PostCountForDmData} = usePostCountforDmQuery()

  const {isLoading: isLoadingPostCountForC, 
    isError: isErrorPostCountForC, 
    error: PostCountForCError, 
    data: PostCountForCData} = usePostCountforCQuery()
  
  return (
    <CardStatisticsVertical
    isLoading ={isLoading || isLoadingPostCountForDm}
      title='Total Posts'
      stats={ (data && data) || (PostCountForDmData && PostCountForDmData) || (PostCountForCData && PostCountForCData)}
      trendNumber={28.14}
      avatarSrc='/images/cards/stats-vertical-wallet.pnga'
    />
  )
}

export default AnalyticsPostCount
