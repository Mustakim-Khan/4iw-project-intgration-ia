'use client'
import * as React from 'react'
import { Box, Sheet, Grid, Typography, FormControl, FormLabel, Input, Stack, Button } from '@mui/joy'
import { z } from "zod";

import RecipeCard from './components/RecipeCard'

const schema = z.object({
  message: z.object({
      role: z.string(),
      content: z.string()
  })
});

const recipeSchema = z.array(z.string());

export default function Home() {
  const [search, setSearch] = React.useState("");
  const [recipes, setRecipes] = React.useState([]);

  const updateSearch = React.useCallback(event => {
    setSearch(event.target.value);
  }, []);

  const getSearchResults = React.useCallback(event => {
    event.preventDefault();
    console.log("Search => ", search);
    return
    // setLoading(true);
    setRecipes([]);
    
    setSearch('')
    fetch("/api/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            search
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        return schema.parse(json);
    }).then(data => {
        return JSON.parse(data.message.content);
    }).then(data => {
        return recipeSchema.parse(data);
    }).then(newRecipes => {
        setRecipes(newRecipes);
    }).catch(error => {
        console.error(error);
    }).finally(() => {
        setLoading(false);
    });
  }, [search]);

  return (
    <Box 
      sx={{gap: 2, m: 2, bgcolor: 'white'}}
      justifyContent="space-between"
    > 
      <Stack component="form" spacing={1} onSubmit={getSearchResults}>
        <Input label="Recherche" placeholder="Une recette dans à base de poisson pané..." autoFocus required 
          value={search} onChange={updateSearch}
        />
        <Button type="submit" variant="plain" >
            Rechercher
        </Button>
      </Stack>
      <Box>
        <Typography level='h3' sx={{mb:2}} > Les Recettes</Typography>
        {recipes.length !== 0 ? <Grid
          container
          gap={2}
          sx={{ flexGrow: 1 }}
          justifyContent='space-around'
          alignItems=''
          >
          {Array.from(Array(14)).map((_, index) => (
            <Grid key={index}>
              <RecipeCard/>
            </Grid>
          ))}
        </Grid> :
        <Box>
          <Typography textAlign='center'>Any receipt found...</Typography>
        </Box>
        }
      </Box>
    </Box>
  )
}
