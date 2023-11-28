'use server'

import { getServerSession } from "next-auth/next"
import authOptions, {prisma} from "../lib/authOptions"
import { NextApiRequest, NextApiResponse } from "next";

export async function currentUser() {
  const session = await getServerSession(authOptions);
  console.log(session);
  
  if (!session || !session.user) return null
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

export async function findUserFavoriteRecipes() {
  const user = await currentUser();
  return await prisma.rating.findMany({
      where: {
        userId: user.id
      }
  })
}

export async function addRecipeToFavorite(recipeId: string) {
  const user = await currentUser()
  return await prisma.rating.create({
    data: {
      value: 1,
      userId: user.id,
      recipeId: recipeId
    },
  })
}