'use server';

import prisma from "../../lib/prisma"
import bcrypt from 'bcrypt';
import { verifySession } from "../../lib/session";

export const addSoftware = async (name, formData) => {
    try {
        const user = await verifySession();

        if (!user) {
            return { error: 'Session Expired', success: false }
        }
        const is = await prisma.software.findFirst({ where: formData });

        if (is) {
            return { error: 'Software already exists' }
        }

        await prisma.software.create({ data: formData });
        return { success: true };
    }
    catch (e) {
        return { error: 'Internal Server Error', success: false }
    }
}

export const updateSoftware = async (name, id, formData) => {
    try {
        const user = await verifySession();
        if (!user) {
            return { error: 'Session Expired', success: false }
        }
        await prisma.software.update({ where: { id }, data: formData });
        return { success: true };
    } catch (e) {
        return { error: 'Internal Server Error', success: false }
    }
}

export const addSoftwareVersion = async (name, parId, formData) => {
   
    try {
        const user = await verifySession();
        if (!user) {
            return { error: 'Session Expired', success: false }
        }
        const is = await prisma.softwareVersion.findFirst({ where: formData });
        if (is) {
            return { error: 'Software already exists' }
        }
        const data = await prisma.softwareVersion.create({ data: formData });
        return { success: true, data };
    } catch (e) {
        
        return { error: 'Internal Server Error', success: false }
    }
}

export const updateSoftwareVersion = async (name, id, formData) => {
    try {

        const user = await verifySession();

        if (!user) {
            return { error: 'Session Expired', success: false }
        }

        await prisma.softwareVersion.update({ where: { id }, data: formData });
        return { success: true };
    } catch (e) {
        return { error: 'Internal Server Error', success: false }
    }
}

export const addManager = async (name, formData) => {

    try {


        const user = await verifySession();

        if (!user) {
            return { error: 'Session Expired', success: false }
        }

        const is = await prisma.manager.findFirst({ where: { mob: formData.mob } });

        if (is) {
            return { error: 'Manager already exists' }
        }

        formData.password = await bcrypt.hash(formData.password, 10);
        await prisma.manager.create({ data: formData });
        return { success: true };
    } catch (e) {
        return { error: 'Internal Server Error', success: false }
    }
}

export const updateManager = async (name, id, formData) => {
    try {
        const user = await verifySession();

        if (!user) {
            return { error: 'Session Expired', success: false }
        }

        if (formData.password != '' && formData.password != undefined && formData.password != null) {
            formData.password = await bcrypt.hash(formData.password, 10);
        }

        return await prisma.manager.update({ where: { id }, data: formData });
    } catch (e) {
        return { error: 'Internal Server Error', success: false }
    }

}