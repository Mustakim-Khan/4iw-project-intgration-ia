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

  const systemContent = "Tu es un cuistot de grande renommé.\
Ton job est de répondre aux questions de cuisine qui te sont posées.\
À partir de maintenant, dès que tu recevras un nom de recette,\
tu renverras un tableau JSON de chaînes de caractères dans lequel tu renverra une description détaillée de la recette, et une liste d'instructions détaillé pour réaliser ce plat.\
Tu ne dois rien renvoyer d'autre que du JSON, pas de texte avant ou après pas de bonjour ni rien du tout d'autre que du JSON et le tableau ne doit pas être inclu dans aucune propriété, seulement un tableau tout simple de string.\
Le résultat final doit être sous cette forme zod :\
const schema = z.object({message: z.object({role: z.string(),content: z.string()})});\
La description de la recette doit être dans la clé json 'description' et la valeur doit être une longue phrase.\
La liste d'instructions de la recette doit être dans une clé json 'instructions' et doit être un tableau sous format json.\
Donne le résultat de la recherche sous forme d'un tableau de string sans clé pour le premier object.";

  const completions = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemContent,
      },
      {
        role: "user",
        content: search,
      },
    ],
  });

  return NextResponse.json({
    message: completions.choices[0].message as unknown as string,
  });
}
