'use client'
import * as React from 'react';
import { Box, Sheet } from '@mui/joy'
import { useRouter, usePathname, useSearchParams } from "next/navigation";


export default function UserDetails({ params }: { params: { slug: string } }) {
  return (
    <Box>
      <Sheet>
        User Page : {params.slug} <br/>
        User Details
      </Sheet>
    </Box>
  )
}
