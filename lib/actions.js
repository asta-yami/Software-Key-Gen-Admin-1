'use server'

import prisma from "./prisma"
const bcrypt = require('bcrypt');
// const {createSession} = require('./session');
import { createSession, deleteSession, verifySession } from './session'

export const verifyUser = async (name, password) => {
    const user = await prisma.admin.findFirst({ where: { username: name } });

    if (user) {
        const is = bcrypt.compareSync(password, user.password);

        if (is) {

            createSession(user.id);
            return {
                success: true,
                user
            }
        }
    }


    return {
        success: false
    }
}

export const destroySession = async () => {
    deleteSession();
    return true;
}

export const addTokenToManager = async (name, formData) => {
    const is = await verifySession();

    if (!is) {
        return { sucess: false, error: 'Session Expired' }
    }

    const manager = await prisma.manager.findUnique({ where: { id: formData.managerId } });

    if (!manager) {
        return { success: false, error: 'Manager not found' }
    }

    await prisma.manager.update({ where: { id: formData.managerId }, data: { tokens: manager.tokens + formData.token } });
    const managerTransactions = await prisma.managerTransactions.create({ data: formData });

    return {
        success: true,
        data: managerTransactions
    };
}