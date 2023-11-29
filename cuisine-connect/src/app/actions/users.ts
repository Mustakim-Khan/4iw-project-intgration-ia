'use server'

import { getServerSession } from "next-auth/next"
import authOptions, {prisma} from "../lib/authOptions"
import { NextApiRequest, NextApiResponse } from "next";
import { Rating } from "@prisma/client";

export async function currentUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null
  return await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {ratings: true, comments: true}
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

export async function updateRecipeToFavorite(recipeId: string, isNewRating) {
  const user = await currentUser()

  if (isNewRating) {
    const userUpdated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ratings: {
          create: {
            value: 1,
            // userId: user.id,
            recipeId: recipeId
          },
        },
      },
      include: {ratings: true}
    });
    return userUpdated.ratings.length > 0 ? userUpdated.ratings[-1] : userUpdated.ratings[0]
  } else {
    const ratingUpdate: Rating = user.ratings.find((rating: Rating) => rating.recipeId == recipeId)
    
    // const updateUser = await prisma.user.update({
    //   where: {
    //     id: user.id,
    //   },
    //   data: {
    //     ratings: {
    //       update: {
    //         where: {id: ratingUpdate.id },
    //         data: {}
    //       }
    //     },
    //   },
    // })
    return await prisma.rating.delete({
      where: { id: ratingUpdate.id }, // Remplacez ratingId par l'ID du rating à supprimer
    });
  }
}

export async function findUserById(id: string) {
  return await prisma.user.findUnique({
      where: {
        id,
      },
  })
}