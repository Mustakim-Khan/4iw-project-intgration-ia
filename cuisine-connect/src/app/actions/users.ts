'use server'

import { getServerSession } from "next-auth/next"
import authOptions, {prisma} from "../lib/authOptions"
import { NextApiRequest, NextApiResponse } from "next";

export async function currentUser() {
  const session = await getServerSession(authOptions);
    return await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
    })
}

export async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
          email: email,
        },
    })
}