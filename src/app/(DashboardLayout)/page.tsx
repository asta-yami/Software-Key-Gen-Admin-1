'use server'

import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
// import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
// import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
// import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
// import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
// import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
// import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import { verifySession } from '../../../lib/session';
import { redirect } from 'next/navigation';

const Dashboard = async () => {

  
  const user = await verifySession();

  if (!user) {
      redirect('/authentication/login')
  }

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid> */}

        Coming Soon
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
