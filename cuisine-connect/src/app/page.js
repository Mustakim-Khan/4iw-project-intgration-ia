"use client";
import * as React from "react";
import {
  Box,
  Sheet,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  CircularProgress,
} from "@mui/joy";
import { z } from "zod";
import { useSession } from 'next-auth/react'
import RecipeCard from "./components/RecipeCard";
import useRecipeStore from "../../store/recipeStore";
import useFavoriteStore from "../../store/favoriteStore";

// const schema = z.object({
//   message: z.object({
//     nom: z.string(),
//     description: z.string(),
//     image: z.string(),
//   }),
// });

// const defaultRecipe = (id) => {
//   return {
//     id: id.toString(),
//     name: "Pâte carbo",
//     description: "La pâte carbonara est un plat de pâtes italien classique constitué de spaghetti ou d'autres types de pâtes longues, mélangés avec une sauce à base de lardons, d'œufs, de fromage Parmesan ou Pecorino et de poivre noir moulu. La sauce est crémeuse et riche, et la combinaison des saveurs salées du lard et du fromage avec la texture des pâtes al dente en fait un plat réconfortant et délicieux.",
//     ingredients: [
//       "200g de pâtes (de préférence des spaghettis)",
//       "100g de pancetta ou de lardons fumés",
//       "2 gousses d'ail",
//       "30g de Parmesan",
//       "2 jaunes d'œufs",
//       "Sel",
//       "Poivre",
//     ],
//     steps: [
//       "Faire cuire les pâtes al dente dans une grande casserole d'eau bouillante salée.",
//       "Pendant ce temps, faire revenir la pancetta ou les lardons dans une poêle à feu moyen jusqu'à ce qu'ils soient dorés.",
//       "Ajouter les gousses d'ail finement hachées et cuire pendant environ 1 minute supplémentaire.",
//       "Dans un bol séparé, mélanger les jaunes d'œufs avec le Parmesan râpé.",
//       "Égoutter les pâtes cuites, en réservant un peu d'eau de cuisson.",
//       "Ajouter les pâtes égouttées à la poêle avec la pancetta et l'ail, en remuant pour bien les enrober.",
//       "Hors du feu, incorporer le mélange d'œufs et de Parmesan aux pâtes, en remuant rapidement pour éviter que les œufs ne cuisent.",
//       "Ajouter un peu d'eau de cuisson réservée si nécessaire pour obtenir une consistance crémeuse.",
//       "Saler et poivrer selon votre goût.",
//       "Servir immédiatement, garni de quelques copeaux de Parmesan supplémentaires.",
//     ],
//     rating: 0,
//   }
// }

const schema = z.object({
  message: z.object({
    role: z.string(),
    content: z.string(),
  }),
});

const recipeInfoSchema = z.object({
  nom: z.string(),
  description: z.string(),
  temps: z.string(),
})

const recipeSchema = z.array(recipeInfoSchema);

const searchRoute = "/api/search";

export default function Home() {
  const { data : session } = useSession()
  const [search, setSearch] = React.useState("");
  // const [recipes, setRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { recipes, getRecipes } = useRecipeStore()
  const { getFavorites } = useFavoriteStore()

  const updateSearch = React.useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  

  const getSearchResults = React.useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      setRecipes([]);
      setSearch("");
      fetch(searchRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          return schema.safeParse(json);
        })
        .then((data) => {
          return JSON.parse(data.data.message.content);
        })
        .then((data) => {
          return recipeSchema.safeParse(data);
        })
        .then((newRecipes) => {
          setRecipes(newRecipes.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [search]
  );

  React.useEffect(() => {
    setLoading(true)
    getRecipes()
    if (session && session.user){
      // Fetch Recipes, favorites and Rating
      getFavorites()
    }
    setLoading(false)

  }, [])

  return ( 
    <Box sx={{ gap: 2, m: 2, bgcolor: "white" }} justifyContent="space-between">
      <Stack component="form" spacing={1} onSubmit={getSearchResults}>
        <Input
          label="Recherche"
          placeholder="Une recette à base du poisson colin..."
          autoFocus
          required
          value={search}
          onChange={updateSearch}
        />
        <Button type="submit" variant="plain">
          Rechercher
        </Button>
      </Stack>
      <Box>
        <Typography level="h3" sx={{ mb: 2 }}>
          {" "}
          Les Recettes
        </Typography>
        {loading == true && recipes.length == 0 ? (
          <Box><Typography textAlign="center"><CircularProgress color="neutral"/></Typography></Box>
        ) : ( !loading && recipes.length > 0 ?
          (
            <Grid
              container
              gap={2}
              sx={{ flexGrow: 1 }}
              justifyContent="space-around"
            >
              {recipes.map((recipe, index) => (
                <Grid key={index}>
                  <RecipeCard data={recipe} />       
                </Grid>
              ))}
            </Grid>
          ) :(
            <Box>
              <Typography textAlign="center">No recipes to display</Typography>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}
