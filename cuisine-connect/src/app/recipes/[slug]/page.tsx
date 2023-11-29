"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Sheet,
  Typography,
} from "@mui/joy";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "zod";
import RecipeCard from "../../components/RecipeCard";
import useFavoriteStore from "../../../../store/favoriteStore";


export default function ReceipDetails({
  params,
}: {
  params: { slug: string };
}) {
  const detailsRoute = "/api/details";
  const { items, getFavorites } = useFavoriteStore((state) => state)
  const recipeName = decodeURIComponent(params.slug.replace(/-/g, " ")).charAt(0).toUpperCase() + decodeURIComponent(params.slug.replace(/-/g, " ")).slice(1);
  const lowerCaseRecipeName = recipeName.toLowerCase();
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState(null);

  const [sideDishes, setSideDishes] = useState(null);

  const [sideDishLoading, setSideDishLoading] = useState(false);

  const [recipeRecommandations, setRecipeRecommandations] = useState(null);
  const [recipeRecommandationsLoading, setRecipeRecommandationsLoading] = useState(false);

  function getContentShare(ingredients, recipeName) {
    let content = 'Voici la liste des ingrédients pour la recette ' + recipeName + ' :\n\n';
    ingredients.forEach(ingredient => {
      content += '- '+ingredient + '\n';
    });
    return content;
  }

  function copyToClipboard(content) {
      navigator.clipboard.writeText(content).then(function() {
        
    }).catch(function(err) {
        console.error('Erreur lors de la copie dans le presse-papier: ', err);
    });
  }

  function sendEmail(subject, body) {
    let linkEmail = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(linkEmail);
  }

  function shareSocialMedia(socialMediasChoice, text) {
    let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

    switch (socialMediasChoice) {
      case 'twitter':
        window.open(twitterUrl);
        break;
      default:
        break;
    } 

  }

  function getSideDish() {
    setSideDishLoading(true);
    const sideDishRoute = "/api/side-dish";
    const response = fetch(sideDishRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: recipeName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const dataContent = JSON.parse(data.result.content) as Object;
        setSideDishes(Object.values(dataContent));
      })
      .catch((error) => {
        console.error("Error:", error);
      }).finally(() => {
        setSideDishLoading(false);
      });
  }

  function getRecommandationRecipe() {
    setRecipeRecommandationsLoading(true);
    const recommandationRecipeRoute = "/api/recommandation-recipe";
    const response = fetch(recommandationRecipeRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: recipeName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const dataContent = JSON.parse(data.message.content) as Array<Object>;
        setRecipeRecommandations(dataContent);        
      })
      .catch((error) => {
        console.error("Error:", error);
      }).finally(() => {
        setRecipeRecommandationsLoading(false);
      });
  }

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
          search: lowerCaseRecipeName,
        }),
      });
      const data = await response.json();
      setDescription(data.recipe.description);
      setIngredients(data.recipe.ingredients);
      setSteps(data.recipe.steps);
      setLoading(false);
      getRecommandationRecipe();
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
              <Button type="button" variant="plain" onClick={() => {copyToClipboard(getContentShare(ingredients, recipeName))}} >
                Copier la liste des ingrédients
              </Button>
              <Button type="button" variant="plain" onClick={() => { sendEmail('Liste d\'ingredient pour '+ recipeName, getContentShare(ingredients, recipeName)) }} >
                Email
              </Button>

              <Button type="button" variant="plain" onClick={() => { shareSocialMedia('twitter', getContentShare(ingredients, recipeName)) }} >
                Twitter
              </Button>
            </div>
            <div>
              <List>
                <Typography level="h3">Étapes :</Typography>
                {steps.map((step) => (
                  <ListItem key={step}>{step}</ListItem>
                ))}
              </List>
            </div>

            <div>
              <List>
                <Typography level="h3">Recommendations :</Typography>
                {recipeRecommandations && recipeRecommandations.length !== 0 ? (
                  <Grid
                    container
                    gap={2}
                    sx={{ flexGrow: 1 }}
                    alignItems=""
                  >
                    {recipeRecommandations.map((recipe, index) => (
                      <Grid key={index}>
                        <RecipeCard
                          // nom={recipe.nom}
                          // description={recipe.description}
                          // temps={recipe.temps}
                          data={recipe} favorites={items}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : recipeRecommandationsLoading == true ? (
                  <Box>
                    <Typography textAlign="center">
                      <CircularProgress />
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Typography textAlign="center">Aucune recommandation</Typography>
                  </Box>
                )}
              </List>
            </div>

            <Button type="button" variant="outlined" onClick={() => {getSideDish()}} >
                  {sideDishLoading && <CircularProgress />} Accompagnement avec cette recette
            </Button>

            {sideDishes &&
              <div className="flex">
                {sideDishes.map((sideDish, index) => (
                  <Card key={index} className="mt-2 mb-4 mr-1">
                    <CardContent>
                      <Typography level="h3">{sideDish.recipeName}</Typography>
                      <Typography level="body-md">{sideDish.recipeDescription}</Typography>
                    </CardContent>
                  </Card>
                ))}
                
              </div>
            }
          </div>
        )}
      </Sheet>
    </Box>
  );
}