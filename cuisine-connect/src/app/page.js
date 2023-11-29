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
import { signIn, useSession } from 'next-auth/react';
import RecipeCard from "./components/RecipeCard";
import useRecipeStore from "../../store/recipeStore";
import useFavoriteStore from "../../store/favoriteStore";

const schema = z.object({
  message: z.object({
    role: z.string(),
    content: z.string(),
  }),
});

const schemaRating = z.object({
    value: z.number(),
});

const recipeInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  // description: z.string(),
  time: z.string(),
  ratings: z.array(schemaRating),
});

const recipeSchema = z.array(recipeInfoSchema);

const searchRoute = "/api/search";

export default function Home() {
  const {data: session} = useSession()
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [filteredRecipes, setFilteredRecipes] = React.useState([]);
  // const { recipes, getRecipes } = useRecipeStore((state) => state)
  const { items, getFavorites } = useFavoriteStore((state) => state)

  const updateSearch = React.useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const getSearchResults = React.useCallback(
    (event) => {
      event.preventDefault();
      if (!session || !session.user) {
        signIn()
      } else {
        setLoading(true);
        setFilteredRecipes([]);
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
            console.log('datas => ', newRecipes);
            setFilteredRecipes(newRecipes.data ?? []);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [search]
  );

  React.useEffect(() => {
    // Fetch Recipes
    // getRecipes()
    setLoading(false)
    console.log("filteredRecipes => ", filteredRecipes);
  }, [])

  React.useEffect(() => {
    if (session && session.user){
      // Fetch favorites and Rating
      getFavorites()
    }
  }, [session?.user])

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
        {loading == true && (filteredRecipes.length == 0) ? (
          <Box><Typography textAlign="center"><CircularProgress color="neutral"/></Typography></Box>
        ) : ( !loading && filteredRecipes.length > 0 ?
          (
            <Grid
              container
              gap={2}
              sx={{ flexGrow: 1 }}
              justifyContent="space-around"
            >
              {filteredRecipes.map((recipe, index) => (
                <Grid key={index}>
                  <RecipeCard data={recipe} favorites={items} />       
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box>
              <Typography textAlign="center">No recipes to display</Typography>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}
