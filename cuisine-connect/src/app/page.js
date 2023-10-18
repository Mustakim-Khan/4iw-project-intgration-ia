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

import RecipeCard from "./components/RecipeCard";

// const schema = z.object({
//   message: z.object({
//     nom: z.string(),
//     description: z.string(),
//     image: z.string(),
//   }),
// });

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
  const [search, setSearch] = React.useState("");
  const [recipes, setRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
        {recipes.length !== 0 ? (
          <Grid
            container
            gap={2}
            sx={{ flexGrow: 1 }}
            justifyContent="space-around"
            alignItems=""
          >
            {recipes.map((recipe, index) => (
              <Grid key={index}>
                <RecipeCard
                  nom={recipe.nom}
                  description={recipe.description}
                  temps={recipe.temps}
                />
              </Grid>
            ))}
          </Grid>
        ) : loading == true ? (
          <Box>
            <Typography textAlign="center">
              <CircularProgress />
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography textAlign="center">No recipes to display</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
