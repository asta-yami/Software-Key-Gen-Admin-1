import React from 'react'

import PageContainer from "../../components/container/PageContainer"
import { Grid } from '@mui/material'
import ManagerProfileBanner from './(components)/ManagerProfileBanner'
import prisma from '../../../../../lib/prisma'
import { verifySession } from '../../../../../lib/session'
import { redirect } from 'next/navigation'

export default async function page({params}) {

    const user = await verifySession();

    if (!user) {
        redirect('/authentication/login')
    }

    const manager = await prisma.manager.findUnique({where: {id: params.managerId}, include: {dealers: true, managerTransactions: true}});

    return (
        <PageContainer title="Profile" description="this is Profile">
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <ManagerProfileBanner data={manager} params={params}/>
                </Grid>
            </Grid>
        </PageContainer>
    )
}
