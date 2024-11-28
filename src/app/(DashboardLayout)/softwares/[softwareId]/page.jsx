'use server'

import React from 'react'
import prisma from '../../../../../lib/prisma';
import PageContainer from '../../components/container/PageContainer';
import { Breadcrumbs, Link } from '@mui/material';
import SoftwareVersionList from './(components)/SoftwareVersionList';
import { verifySession } from '../../../../../lib/session';
import { redirect } from 'next/navigation';

export default async function page({ params }) {

    const user = await verifySession();

    if (!user) {
        redirect('/authentication/login')
    }

    const softwareVersions = await prisma.softwareVersion.findMany({ where: { parId: params.softwareId }, include: {software: true} });
    
    return (
        <PageContainer title="Search Table" description="this is Search Table page">
            <Breadcrumbs aria-label="breadcrumb" sx={{ mx: 2, my: 2 }}>
                <Link underline="hover" color="inherit" href="/softwares">
                    Softwares
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href={`/softwares/${params.softwareId}`}
                >
                    Versions
                </Link>
            </Breadcrumbs>

            <SoftwareVersionList data={softwareVersions} parId={params.softwareId}  />
        </PageContainer>
    )
}
