'use client'
import { Box, Sheet } from '@mui/joy'
import { useRouter, usePathname, useSearchParams } from "next/navigation";


export default function ReceipDetails({ params }: { params: { slug: string } }) {
  return (
    <Box>
      <Sheet>
        Receipe Page : {params.slug} <br/>
        Receipt Details
      </Sheet>
    </Box>
  )
}
