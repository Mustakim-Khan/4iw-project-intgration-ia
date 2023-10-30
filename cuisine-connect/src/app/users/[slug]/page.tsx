'use client'
import * as React from 'react';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSession } from 'next-auth/react';

import { Box, Sheet, Typography } from '@mui/joy'

export default function UserDetails({ params }: { params: { slug: string } }) {
  const {data: session} = useSession()
  return (
    
    <Box>
      <Sheet>
        { (session?.user) ?
          <Typography>
            User Page : {params.slug} <br/>
            User Details
          </Typography> 
            : <Typography> Login first</Typography>
        }
      </Sheet>
    </Box>
  )
}
