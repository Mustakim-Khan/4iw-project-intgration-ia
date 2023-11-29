import { z } from "zod";
import { NextResponse } from "next/server";
import { findAllRecipes, findById, findByTitle } from "../../actions/recipes";
import { NextApiRequest, NextApiResponse } from "next";

const postSchema = z.object({
  search: z.string(),
});

export async function GET(request: Request, response: NextApiResponse) {
    const recipeId = new URL(request.url).searchParams.get("recipeId");
    const recipe = await findById(recipeId);

  return NextResponse.json({
    comments: recipe.comments,
  });
}
