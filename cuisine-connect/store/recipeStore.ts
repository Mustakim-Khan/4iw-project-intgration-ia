import { create } from 'zustand'
import authOptions, {prisma} from "../src/app/lib/authOptions"
import { findRecipes, findRecipeById } from '../src/app/actions/recipes'
// import { Recipe } from '@prisma/client'

type Rating = {
    id?: string,
    value: number
    userId: string,
    recipeId: string,
}

export type Comment = {
    id?:            string
    comment:       string
    userId:        string
    recipeId:      string
    // owner:     User 
    recipe:    Recipe 
}

export type Recipe = {
    id?: string,
    title?:       String,
    description?: String,
    ingredients?: String[],
    keywords?:    String[],
    ratings?:     Rating[],
    comments?:    Comment[],
}

interface RecipeState {
    recipe: Recipe
    recipes: Recipe[]
    getRecipe: (recipeId: string) => void
    deleteRecipe: (recipeId: string) => void
    getRecipes: () => void
}

const useRecipeStore = create<RecipeState>()((set, get) => ({
    recipe: {},
    recipes: [],
    getRecipe: (recipeId: string) => {
        findRecipeById(recipeId).then((data) => {
            set({recipe: {...data}})
        })
    },
    deleteRecipe: (recipeId: string) => {
        const recipes = get().recipes.filter((recipe) => recipe.id != recipeId)
        set({recipes: [...recipes]})
    },
    getRecipes: () => {
        findRecipes().then((data) => {
            set({recipes: [...data]})
        })
    },
}))


export default useRecipeStore