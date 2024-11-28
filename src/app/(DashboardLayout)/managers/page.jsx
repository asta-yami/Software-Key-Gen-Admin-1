'use server'

import { Breadcrumbs, Link } from "@mui/material"
import PageContainer from "../components/container/PageContainer"
import ManagerList from "./(components)/ManagerList"
import prisma from "../../../../lib/prisma";
import { verifySession } from "../../../../lib/session";
import { redirect } from "next/navigation";

export default async function Manager() {

    const user = await verifySession();

    if (!user) {
        redirect('/authentication/login')
    }

    const managers = await prisma.manager.findMany();

    

    return (
        <>
            <PageContainer title="Search Table" description="this is Search Table page">
                <Breadcrumbs aria-label="breadcrumb" sx={{ mx: 2, my: 2 }}>
                    <Link underline="hover" color="inherit" href="/">
                        Manager
                    </Link>
                </Breadcrumbs>

                <ManagerList data={managers} />
            </PageContainer>
        </>
    )
}
