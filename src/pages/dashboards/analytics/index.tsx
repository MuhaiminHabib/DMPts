import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Component Imports

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import AnalyticsBACount from 'src/views/dashboards/analytics/dmp/AnalyticsBACount'
import AnalyticsDMCount from 'src/views/dashboards/analytics/dmp/AnalyticsDMCount'
import AnalyticsCCount from 'src/views/dashboards/analytics/dmp/AnalyticsCCount'
import AnalyticsCMCount from 'src/views/dashboards/analytics/dmp/AnalyticsCMCount'
import AnalyticsPostCount from 'src/views/dashboards/analytics/dmp/AnalyticsPostCount'

import AnalyticsSales from 'src/views/dashboards/analytics/dmp/AnalyticsSales'
import AnalyticsCongratulations from 'src/views/dashboards/analytics/dmp/AnalyticsCongratulations'

const AnalyticsDashboard = () => {
  const ability = useContext(AbilityContext)

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {ability?.can('read', 'welcome-card') ? (
          <Grid item xs={12} sx={{ order: -1 }}>
            <AnalyticsCongratulations />
          </Grid>
        ) : null}

        {/* A */}
        {ability?.can('read', 'analytics-aStats') ? (
          <>
            <Grid item xs={12} md={4} sx={{ order: -1 }}>
              <Grid container spacing={6}>
                <Grid item xs={6} md={12} lg={6}>
                  <AnalyticsBACount />
                </Grid>
                <Grid item xs={6} md={12} lg={6}>
                  <AnalyticsSales />
                </Grid>
              </Grid>
            </Grid>
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
          </>
        ) : null}

        {/* BA */}

        {ability?.can('read', 'analytics-baStats') ? (
          <>
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
          </>
        ) : null}

        {/* DM */}

        {ability?.can('read', 'analytics-dmStats') ? (
          <Grid item xs={12} md={4} sx={{ order: -1 }}>
            <Grid container spacing={6}>
              <Grid item xs={6} md={12} lg={6}>
                <AnalyticsCCount />
              </Grid>
              <Grid item xs={6} md={12} lg={6}>
                <AnalyticsPostCount />
              </Grid>
            </Grid>
          </Grid>
        ) : null}

        {ability?.can('read', 'analytics-cStats') ? (
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
        ) : null}

        {ability?.can('read', 'analytics-cmStats') ? (
          <Grid item xs={12} md={4} sx={{ order: -1 }}>
            <Grid container spacing={6}>
              <Grid item xs={6} md={12} lg={6}>
                <AnalyticsPostCount />
              </Grid>
              <Grid item xs={6} md={12} lg={6}></Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
