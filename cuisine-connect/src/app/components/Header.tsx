'use client'
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import UserMenu from "./UserMenu"
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AspectRatio, Box, Typography } from "@mui/joy"

export default function Header () {
    const router = useRouter()
    const pathname = usePathname()
    const query = useSearchParams()
    return (
        <Box
            component="header"
            className="Header"
            sx={{
                p: 2,
                gap: 2,
                bgcolor: 'black',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gridColumn: '1 / -1',
                borderBottom: '1px solid',
                borderColor: 'divider',
                // position: 'sticky',
                top: 0,
                zIndex: 1100,
                boxShadow: 'sm',
            }}
        >
            <Link href="/">
                <Typography
                    onClick={() => pathname != "/" && router.push("/")}
                    startDecorator={
                        // <AspectRatio ratio='2'>
                            <img
                                src="/appIcon.svg"
                                loading="lazy"
                                width="42"
                                height="36"
                                alt=""
                            />
                        // </AspectRatio>
                    }
                    level="h4" 
                    fontWeight="xl"
                    sx={{color: 'white', cursor:'pointer'}}
                >
                    Cuisine-connect
                </Typography>
            </Link>
            <UserMenu></UserMenu>
        </Box>
    )
}