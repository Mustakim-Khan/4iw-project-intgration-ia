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

  const systemContent = `Tu es un cuisinier de grande renommé.
  Ton travail est de faire des recommendation de recettes en fonction d'une autre recette qu'on te donnera, cette recette ne doit pas apparaitre dans les résultats et tu dois utiliser uniquement la base de donnée qu'on te fournira.
  Si tu vois que la réponse est trop longue, tu peux la raccourcir en enlevant des recettes.
  Tu reverra un tableau Json en chaine de caractère dans lequel tu renverra la liste des recettes qui correspondent à la recherche, pas de texte avant ou après.
  Pour chaque recette, tu renverras un objet json contenant le nom de la recette, les ratings, un temps estimé pour cuisiner le plat.
  Le rating doit être une liste d'objet json avec la valeur du champ value.
  Chaque recette doit être sous la forme :\{\"id\": \"\",\"title\": \"\",\"time\": \"\",\"ratings\": \"\"\},
  Donne le résultat de la recherche sous forme d'un tableau de string sans clé pour le premier object.
  Pour donner le résultat, tu dois te reposer sur l'objet 'recipes' que je te fournis. Donc les résultats doivent obligatoirement provenir de l'objet 'recipes' que je te fournis. Si tu ne trouve pas de recettes dans l'object 'recettes' que je te fournis, envoie un tableau vide.
  Tu peut utiliser les champs 'keywords' et 'ingredients' pour filtrer les recettes en fonction de la recherche de l'utilisateur, les recettes doivent aussi avoir le plus de similarité sur les aliments.
  Utilise également l'objet 'user' pour savoir qui est l'utilisateur qui te demande la recherche. En tenant compte de ses allergies dans le champ 'allergy' de l'objet 'user'.
Voici l'objet recipes :
${JSON.stringify(recipes)}
Voici l'objet user :
${JSON.stringify(user)}`;

console.log("systemContent", systemContent);

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
