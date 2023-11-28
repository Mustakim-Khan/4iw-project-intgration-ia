'use server'

import {prisma} from "../lib/authOptions"

export async function findAllRecipes() {
    return await prisma.recipe.findMany();
}