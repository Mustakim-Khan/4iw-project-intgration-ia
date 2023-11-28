"use client";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Sheet,
  Typography,
} from "@mui/joy";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function ReceipDetails({
  params,
}: {
  params: { slug: string };
}) {
  const detailsRoute = "/api/details";

  const recipeName = decodeURIComponent(params.slug.replace(/-/g, " "));
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState(null);

  useEffect(() => {
    setLoading(true);
    setIngredients(null);
    setSteps(null);
    setDescription(null);
    const getData = async () => {
      const response = await fetch(detailsRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: recipeName,
        }),
      });
      const data = await response.json();
      setDescription(data.description.content);
      setIngredients(JSON.parse(data.recipe.content).ingredients);
      setSteps(JSON.parse(data.recipe.content).steps);
      setLoading(false);
    };
    const response = getData()
      .then((response) => response)
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Box>
      <Sheet className="container mx-auto">
        <Typography level="h1">{recipeName}</Typography>
        {loading ? (
          <Box>
            <Typography textAlign="center">
              <CircularProgress />
            </Typography>
          </Box>
        ) : (
          <div>
            <Typography level="body-md" className="mt-2 mb-4">
              {description}
            </Typography>
            <div className="mb-6">
              <Typography level="h3">Ingrédients requis :</Typography>
              <List>
                {ingredients.map((ingredient,index) => (
                  <ListItem key={index}>{ingredient}</ListItem>
                ))}
              </List>
            </div>
            <div>
              <List>
                <Typography level="h3">Étapes :</Typography>
                {steps.map((step) => (
                  <ListItem key={step}>{step}</ListItem>
                ))}
              </List>
            </div>
          </div>
        )}
      </Sheet>
    </Box>
  );
}
{
  /* <div>{description}</div>
            <div>{ingredients}</div>
            <div>{steps}</div> */
}
