// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import AnalyticsOrder from 'src/views/dashboards/analytics/AnalyticsOrder'
import AnalyticsSales from 'src/views/dashboards/analytics/AnalyticsSales'
import AnalyticsRevenue from 'src/views/dashboards/analytics/AnalyticsRevenue'
import AnalyticsPayments from 'src/views/dashboards/analytics/AnalyticsPayments'
import AnalyticsProfitReport from 'src/views/dashboards/analytics/AnalyticsProfitReport'
import AnalyticsTotalRevenue from 'src/views/dashboards/analytics/AnalyticsTotalRevenue'
import AnalyticsTransactions from 'src/views/dashboards/analytics/AnalyticsTransactions'
import AnalyticsTabsWithChart from 'src/views/dashboards/analytics/AnalyticsTabsWithChart'
import AnalyticsTabsWithTable from 'src/views/dashboards/analytics/AnalyticsTabsWithTable'
import AnalyticsCongratulations from 'src/views/dashboards/analytics/AnalyticsCongratulations'
import AnalyticsOrderStatistics from 'src/views/dashboards/analytics/AnalyticsOrderStatistics'
import AnalyticsActivityTimeline from 'src/views/dashboards/analytics/AnalyticsActivityTimeline'

import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import AnalyticsBACount from 'src/views/dashboards/analytics/dmp/AnalyticsBACount'
import AnalyticsDMCount from 'src/views/dashboards/analytics/dmp/AnalyticsDMCount'
import AnalyticsCCount from 'src/views/dashboards/analytics/dmp/AnalyticsCCount'
import AnalyticsCMCount from 'src/views/dashboards/analytics/dmp/AnalyticsCMCount'
import AnalyticsPostCount from 'src/views/dashboards/analytics/dmp/AnalyticsPostCount'
import { useContext } from 'react'

const AnalyticsDashboard = () => {
  const ability = useContext(AbilityContext)
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8} sx={{ order: -1 }}>
          <AnalyticsCongratulations />
        </Grid>
        {ability?.can('read', 'analytics-aStats') ? (<Grid item xs={12} md={4} sx={{ order: -1 }}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={12} lg={6}>
              <AnalyticsBACount />
            </Grid>
            <Grid item xs={6} md={12} lg={6}>
              <AnalyticsSales />
            </Grid>
          </Grid>
        </Grid>) : null }

        {/* BA */}

        {ability?.can('read', 'analytics-baStats') ?(<>
        <Grid item xs={12} md={4} sx={{ order: -1 }}>
            <Grid container spacing={6}>
              <Grid item xs={6} md={12} lg={6}>
                <AnalyticsDMCount />
              </Grid>
              <Grid item xs={6} md={12} lg={6}>
                <AnalyticsCCount />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sx={{ order: -1 }}>
            <Grid container spacing={6}>
              <Grid item xs={6} md={12} lg={6}>
                <AnalyticsCMCount />
              </Grid>
              <Grid item xs={6} md={12} lg={6}>
                <AnalyticsPostCount />
              </Grid>
            </Grid>
          </Grid>
          </>) : null }

          {/* DM */}


          {ability?.can('read', 'analytics-dmStats') ? (<Grid item xs={12} md={4} sx={{ order: -1 }}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={12} lg={6}>
            <AnalyticsCCount />
            </Grid>
            <Grid item xs={6} md={12} lg={6}>
            <AnalyticsPostCount />
            </Grid>
          </Grid>
        </Grid>) : null }

          {ability?.can('read', 'analytics-cStats') ? (<Grid item xs={12} md={4} sx={{ order: -1 }}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={12} lg={6}>
            <AnalyticsCMCount />
            </Grid>
            <Grid item xs={6} md={12} lg={6}>
            <AnalyticsPostCount />
            </Grid>
          </Grid>
        </Grid>) : null }


        {/* <Grid item xs={12} md={4} sx={{ order: -1 }}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={12} lg={6}>
              <AnalyticsOrder />
            </Grid>
            <Grid item xs={6} md={12} lg={6}>
              <AnalyticsSales />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8}>
          <AnalyticsTotalRevenue />
        </Grid>
        <Grid item xs={12} md={8} lg={4} sx={{ order: [-1, -1, -1, 0] }}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <AnalyticsPayments />
            </Grid>
            <Grid item xs={6}>
              <AnalyticsRevenue />
            </Grid>
            <Grid item xs={12}>
              <AnalyticsProfitReport />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsOrderStatistics />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsTabsWithChart />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsTransactions />
        </Grid>
        <Grid item xs={12} md={6} sx={{ order: [1, 1, 0] }}>
          <AnalyticsActivityTimeline />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnalyticsTabsWithTable />
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
