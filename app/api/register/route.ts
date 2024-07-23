import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../libs/prismadb'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    const {name,email, password} = await req.json();

    if(!email || !password) {
        throw new Error("Couldn't register user")
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}