import { create } from 'zustand'
import authOptions, {prisma} from "../../cuisine-connect/src/app/lib/authOptions"
import { addRecipeToFavorite, findUserFavoriteRecipes } from '../src/app/actions/users'
import { Recipe } from './recipeStore'


export type Rating = {
    id?: string,
    userId: string,
    recipeId: string,
    value: number
}

interface UserFavoriteRecipeState {
  items: Rating[],
  addFavorites: (recipeId: string) => void
//   deleteFavorites: (recipeId: string) => void
  getFavorites: () => void
}

const useFavoriteStore = create<UserFavoriteRecipeState>((set, get) => ({
    items: [],
    addFavorites: (recipeId: string) => {
        addRecipeToFavorite(recipeId).then((data) => {
            set({items: [...get().items, data]})
        })
    },
    getFavorites: () => {
        findUserFavoriteRecipes().then((data) => {
            set({items: [...data]})
        })
    },
}))

export default useFavoriteStore