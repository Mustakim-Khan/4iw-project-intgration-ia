'use server'
import {prisma} from "../lib/authOptions"


export async function findRecipeById(id: string) {
    return await prisma.recipe.findUnique({
        where: {
          id: id,
        },
    })
}

export async function findRecipes() {
  return await prisma.recipe.findMany({
    // select: {
    //   title: true
    // },
    include: {ratings: true, comments: true},
  })
}