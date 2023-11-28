'use server'

import { getServerSession } from "next-auth/next"
import authOptions, {prisma} from "../lib/authOptions"
import { NextApiRequest, NextApiResponse } from "next";


export async function findRecipeById(id: string) {
    return await prisma.recipe.findUnique({
        where: {
          id: id,
        },
    })
}

export async function findRecipes() {
  return await prisma.recipe.findMany({
    include: {ratings: true}
  })
}