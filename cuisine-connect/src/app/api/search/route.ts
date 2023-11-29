import { z } from "zod";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { currentUser } from "../../actions/users";
import { findAllRecipes, findAllRecipesForRequest } from "../../actions/recipes";
import { sys } from "typescript";

const postSchema = z.object({
  search: z.string(),
});

export async function POST(request: Request) {
  const user = await currentUser();
  const recipes = await findAllRecipesForRequest();

  const body = await request.json();
  const { search } = postSchema.parse(body);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  // Le résultat final doit être cette forme zod : 'const schema = z.object({message: z.object({role: z.string(),content: z.string()})});'

  const systemContent = `Tu es un cuisinier de grande renommé.
  Ton travail est de proposer des recettes en fonction de la recherche qu'on te donnera, tu dois utiliser uniquement la base de donnée qu'on te fournira.
  Tu reverra un tableau JSON en chaine de caractère dans lequel tu renverra la liste des recettes qui correspondent à la recherche, pas de texte avant ou après.
  Pour chaque recette, tu renverras un objet json contenant le nom de la recette, les ratings, un temps estimé pour cuisiner le plat.
  Le rating doit être une liste d'objet json avec la valeur du champ value.
  Chaque recette doit être sous la forme :\{\"id\": \"\",\"title\": \"\",\"time\": \"\",\"ratings\": \"\"\},
  Si tu vois que la réponse est trop longue, tu peux la raccourcir en enlevant des recettes.
  Donne le résultat de la recherche sous forme d'un tableau de string sans clé pour le premier object.
  Pour donner le résultat, tu dois te reposer sur l'objet 'recipes' que je te fournis. Donc les résultats doivent obligatoirement provenir de l'objet 'recipes' que je te fournis. Si tu ne trouve pas de recettes dans l'object 'recettes' que je te fournis, envoie un tableau vide.
  Tu peut utilises les champs 'keywords' et 'title' pour filtrer les recettes en fonction de la recherche de l'utilisateur.
  Utilise également l'objet 'user' pour savoir qui est l'utilisateur qui te demande la recherche. En tenant compte de ses allergies dans le champ 'allergy' de l'objet 'user'.
Voici l'objet recipes :
${JSON.stringify(recipes)}
Voici l'objet user :
${JSON.stringify(user)}`;

  const completions = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemContent,
      },
      // {
      //   role: "system",
      //   content: JSON.stringify(user),
      // },
      // {
      //   role: "system",
      //   content: JSON.stringify(recipes),
      // },
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
