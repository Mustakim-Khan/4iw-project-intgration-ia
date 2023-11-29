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

export async function findByTitle(title: string) {
    return await prisma.recipe.findUnique({
        where: {
            title: title
        }
    });
}