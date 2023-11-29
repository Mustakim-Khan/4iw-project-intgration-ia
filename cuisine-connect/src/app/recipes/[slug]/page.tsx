"use client";
import {
  Accordion,
  AccordionGroup,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  Sheet,
  Typography,
} from "@mui/joy";

import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';

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

            <AccordionGroup
                variant="outlined"
                transition="0.2s"
                sx={{
                  maxWidth: '100%',
                  borderRadius: 'lg',
                  [`& .${accordionSummaryClasses.button}:hover`]: {
                    bgcolor: 'transparent',
                  },
                  [`& .${accordionDetailsClasses.content}`]: {
                    boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
                    [`&.${accordionDetailsClasses.expanded}`]: {
                      paddingBlock: '0.75rem',
                    },
                  },
                }}
              >
                <Accordion defaultExpanded>
                  <AccordionSummary>Ingrédients requis :</AccordionSummary>
                  <AccordionDetails variant="soft">
                      <List>
                        {ingredients.map((ingredient,index) => (
                          <ListItem key={index}> • {ingredient}</ListItem>
                        ))}
                      </List>
                      
                      {ingredients && ingredients.length > 0 && recipeName &&
                         <div className="flex">
                          <Button type="button" size="sm" variant="outlined" className="mr-3" onClick={() => {copyToClipboard(getContentShare(ingredients, recipeName))}} >
                            <IconButton> <ContentCopyIcon color="primary"/> </IconButton>
                          </Button>
                          <Button type="button" size="sm" variant="outlined" className="mr-3" onClick={() => { sendEmail('Liste d\'ingredient pour '+ recipeName, getContentShare(ingredients, recipeName)) }} >
                              <IconButton> <EmailIcon color="primary"/> </IconButton>
                          </Button>
  
                          <Button type="button" size="sm" variant="outlined" className="mr-3" onClick={() => { shareSocialMedia('twitter', getContentShare(ingredients, recipeName)) }} >
                              <IconButton> <TwitterIcon color="primary"/> </IconButton>
                          </Button>
                        </div>
                      }

                  </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                  <AccordionSummary>Étapes :</AccordionSummary>
                  <AccordionDetails variant="soft">
                    <List>
                      {steps.map((step) => (
                        <ListItem key={step}>• {step}</ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                  <AccordionSummary>Recommendations :</AccordionSummary>
                  <AccordionDetails variant="soft">
                  <List>
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
                  </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                  <AccordionSummary>Accompagnements :</AccordionSummary>
                  <AccordionDetails variant="soft">
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
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>

            
          </div>
        )}
      </Sheet>
    </Box>
  );
}