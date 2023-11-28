import { z } from "zod";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const schema = z.object({
   recipe : z.string()
});

export async function POST(request: Request) {  
        const body = await request.json();
        const { recipe } = schema.parse(body);
            
        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
        });

    
        const completions = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Tu auras un plat principal et tu dois trouver 4 accompagnements pour ce plat. Tu devras envoyer une réponse en json avec l'accompagnement sera un index et chaque accompagnement aura un nom qui aura recipeName comme clé et description qui aura recipeDescription comme clé"
                },
                {
                    role: "user",
                    content: `${recipe}`
                }
            ]
        });
    
        return NextResponse.json({
            result: completions.choices[0].message
        });
}