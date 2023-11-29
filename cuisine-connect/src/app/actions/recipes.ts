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

export async function findAllRecipes() {
    return await prisma.recipe.findMany();
}

export async function findAllRecipesForRequest() {
    return await prisma.recipe.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            keywords: true,
            time: true,
            ingredients: true,
            steps: false,
            nutriments: true,
            nutriScore: true,
            ratings: {
                select: {
                    value: true
                }
            },
        }
    });
}

export async function findByTitle(title: string) {
    return await prisma.recipe.findUnique({
        where: {
            title: title
        }
    });
}