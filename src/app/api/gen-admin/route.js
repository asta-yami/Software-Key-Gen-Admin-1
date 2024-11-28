import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
const bcrypt = require('bcrypt');


export async function POST(req) {
    console.log(req)
    const {name, password, username } = await req.json();
    const  enryptesPassword = await bcrypt.hash(password, 10);
    const data = await prisma.admin.create({data: {name, password: enryptesPassword, username}});
    
    return NextResponse.json({
        success: true,
        data
    })
}