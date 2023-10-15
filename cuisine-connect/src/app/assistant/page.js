'use client'
import * as React from 'react'
import { Box, Stack, Input, Button } from '@mui/joy'
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function AssistantChat() {
  const [search, setSearch] = React.useState("");

  const callAssistant = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            recipes: search
        })
    });

    const json = await response.json();
    console.log(json);
  }

  return (
    <Box>
     <Stack component="form" spacing={1} onSubmit={callAssistant}>
     <Input
      label="Recherche" 
      placeholder="Une recette dans à base de poisson pané..." 
      autoFocus 
      required
      value={search}
      onChange={e => setSearch(e.target.value)}
      />          
        <Button type="submit" variant="plain" >
            Rechercher
        </Button>
      </Stack>
    </Box>
  )
}
