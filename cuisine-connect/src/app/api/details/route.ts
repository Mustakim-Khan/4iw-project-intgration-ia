import { z } from "zod";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const postSchema = z.object({
  search: z.string(),
});

export async function POST(request: Request) {
  console.log("REQUEST :::::::::::", request);
  const body = await request.json();
  const { search } = postSchema.parse(body);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const systemContent =
    "Tu es un cuistot de grande renommé.\
Ton job est de répondre aux questions de cuisine qui te sont posées.\
Tu ne dois rien renvoyer d'autre que le type de résultat demandé, pas de texte avant ou après, pas de bonjour ni rien d'autre que le résultat demandé.";

  const descSystemContent =
    "Donne le résultat de la recherche sous forme d'un string.\
Dès que tu recevras un nom de recette, donne moi une longue description de cette recette, rien de plus que la description.";

  const recipeSystemContent =
    "Donne le résultat de la recherche sous forme JSON, pas un string.\
Dès que tu recevras un nom de recette, dis moi comment cuisiner cette recette, rien de plus. J'ai besoin de savoir quels produits j'ai besoin et les quantités pour chaque ingrédients pour une personne. Ainsi que les étapes à suivre.\
Le résultat doit contenir que les ingrédients et les étapes, rien d'autre.\
Les ingrédients doivent être dans la clé JSON 'ingredients', elle sera un tableau JSON de string.\
Et les étapes seront dans la clé 'steps', elle sera un tableau JSON de string.";

  const descCompletions = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemContent + descSystemContent,
      },
      {
        role: "user",
        content: search,
      },
    ],
  });

  const recipeCompletions = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemContent + recipeSystemContent,
      },
      {
        role: "user",
        content: search,
      },
    ],
  });

  return NextResponse.json({
    description: descCompletions.choices[0].message as unknown as string,
    recipe: recipeCompletions.choices[0].message as unknown as string,
  });
}
