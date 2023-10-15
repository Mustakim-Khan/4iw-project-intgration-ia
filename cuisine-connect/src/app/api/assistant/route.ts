import { z } from "zod";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const schema = z.object({
   recipes : z.string()
});

export async function POST(request: Request) {
  
        const body = await request.json();
        const { recipes } = schema.parse(body);
            
        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
        });
    
        const completions = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Tu es un chef étoilé au guide michelin ayant une 15aines d’années d’expérience dans le métier avec plusieurs concours culinaires gagnés à l’internationnal et tu dois aider les utilisateurs à trouver des recettes de cuisine en fonction de leurs besoins."
                },
                {
                    role: "user",
                    content: `${recipes}`
                }
            ]
        });
    
        return NextResponse.json({
            result: completions.choices[0].message
        });
}