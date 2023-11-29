import { z } from "zod";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { findAllRecipes, findByTitle } from "../../actions/recipes";

const postSchema = z.object({
  search: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const { search } = postSchema.parse(body);
  const recipes = await findByTitle(search);

  return NextResponse.json({
    recipe: recipes,
  });
}
