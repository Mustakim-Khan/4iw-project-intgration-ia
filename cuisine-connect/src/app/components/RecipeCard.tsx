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
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react'
import useFavoriteStore from "../../../store/favoriteStore";
import { Rating, Recipe } from "@prisma/client";
import Link from "next/link";

// export default function RecipeCard({ nom, description, temps }) {
export default function RecipeCard({data, favorites}) {
  const { id, title, time } = data
  const router = useRouter()
  const { data : session } = useSession()
  const [isFavorite, setIsFavorite] = React.useState<Boolean>(false)
  const { updateFavorites, getFavorites } = useFavoriteStore((state) => state);
  // const nameUrl = name.replace(/ /g, "-").toLowerCase();

  const handleLikeClick = () => {
    setIsFavorite(prev => !prev)
    if (!session || !session.user){
      signIn()
      return
    } 
    updateFavorites(data.id)
    // getFavorites()
  }
  
  React.useEffect(() => {
    if (session && session.user) {
      if (favorites.length > 0) {
        const recipeListExistInThisUseFavorite = favorites.filter(Boolean).find((item : Rating) => item.recipeId == data.id)
        setIsFavorite(!!recipeListExistInThisUseFavorite)
      }
    }
  }, [data, favorites])

  React.useEffect(() => {
    if (session && session.user){
      // Fetch favorites
      getFavorites()
    }
  }, [isFavorite])
  
  return (
    <Card variant="outlined" sx={{ width: 390 }}>
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
        <Link href={`/recipes/${ title }`} >
          <Typography level="title-md">{title}</Typography>
        </Link>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardActions orientation="horizontal" sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography level="body-xs">{data.ratings.length} like(s)</Typography>
          <Typography level="body-xs">{time}</Typography>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}
