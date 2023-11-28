'use server'

import {prisma} from "../lib/authOptions"

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
        }
    });
}