'use server'

import React from 'react'
import SoftwareList from './(compoents)/SoftwareList'
import prisma from '../../../../lib/prisma';
import PageContainer from '../components/container/PageContainer';
import { Breadcrumbs, Link } from '@mui/material';
import { verifySession } from '../../../../lib/session';
import { redirect } from 'next/navigation';


export default async function page() {

    const user = await verifySession();

    if (!user) {
        redirect('/authentication/login')
    }

    const softwares = await prisma.software.findMany();

    for (let software of softwares) {
        const lastVersion = await prisma.softwareVersion.findFirst({ where: { parId: software.id }, orderBy: { createdAt: 'desc' } });

        if (lastVersion) {
            software.latestVersion = lastVersion.name;
        } else {
            software.latestVersion = 'No version';
        }
    }


    return (
        <PageContainer title="Search Table" description="this is Search Table page">
            <Breadcrumbs aria-label="breadcrumb" sx={{ mx: 2, my: 2 }}>
                <Link underline="hover" color="inherit" href="/">
                    Softwares
                </Link>
            </Breadcrumbs>

            <SoftwareList data={softwares} />


        </PageContainer>
    )
}
