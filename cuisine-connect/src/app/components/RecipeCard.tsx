"use client";
import * as React from "react";
import {
  IconButton,
  Typography,
  Divider,
  Card,
  CardContent,
  CardOverflow,
  CardActions,
  Button,
} from "@mui/joy";
import { Heart } from "react-feather";
import { useRouter } from "next/router";
import { signIn, useSession } from 'next-auth/react'
import useFavoriteStore from "../../../store/favoriteStore";
import { Recipe } from "@prisma/client";

// const defaultRecipe = (id: number) => {
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
//     rating: 0
//   }
// }

// export default function RecipeCard({ nom, description, temps }) {
export default function RecipeCard({data}:{ data: Recipe}) {
  const { id, title, description } = data
  const router = useRouter()
  const { data : session } = useSession()
  const { items, addFavorites } = useFavoriteStore();
  // const [recipeIdList, setRecipeIdList] = React.useState<string[]>([])
  const [isFavorite, setIsFavorite] = React.useState<Boolean>(false)
  // const nameUrl = name.replace(/ /g, "-").toLowerCase();

  const handleLikeClick = React.useCallback(() => {
    if (!session || !session.user){
      signIn()
    } else {
      if (isFavorite) {
        alert("defavorite")
      } else {
        alert("favorite")
        // addFavorites(data.id)
      }
      setIsFavorite(prev => !prev)
    }
    // Ajouter la recette dans la liste des favoris de reccete de cet utilisateur.
  }, [session])

  React.useEffect(() => {
    // const datasIds = items.map((item) => item.id)
    // setRecipeIdList(datasIds)
  }, [items])
  
  React.useEffect(() => {
    const datasIds = items.map((item) => item.id)
    setIsFavorite(datasIds.includes(data.id))
    // setRecipeIdList(datasIds)
  }, [data])

  return (
    <Card variant="outlined" sx={{ width: 350 }}>
      <CardOverflow>
        <IconButton
          onClick={handleLikeClick} // Action pour incrémenter et decrément le rating
          aria-label="Like minimal photography"
          // size="md"
          variant="plain"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "-50%",
            padding: 0,
            margin:0,
            right: "1rem",
            bottom: -20,
            transform: "translateY(50%)",
            // "&:hover": {
            //   color: "red"
            // }
          }}
        >
          <Heart color={ isFavorite ? "red" : 'grey'} />
        </IconButton>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
            {title}
          {/* <Link href={`/recipes/${ nameUrl }`} overlay underline="none">
          </Link> */}
        </Typography>
        <Typography level="body-sm">
          {description.slice(0, 50)}...
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardActions orientation="horizontal" sx={{display: 'flex', justifyContent: 'space-between'}}>
          {/* <Typography level="body-xs">{rating ?? 0} likes</Typography> */}
          <Typography level="body-xs">{0} likes</Typography>
          {/* <Divider orientation="vertical" /> */}
          <Button size='sm' variant='plain' sx={{ bgcolor: '#fff', color:"#000"}}>open</Button>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}
