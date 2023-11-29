'use client'
import * as React from 'react';
import { permanentRedirect, redirect } from 'next/navigation'
import { Box, Sheet, Typography } from '@mui/joy'
import { useSession } from 'next-auth/react';
import { currentUser } from '../../actions/users';
import { User } from '@prisma/client';

export default function UserDetails() {
  const {data: session} = useSession()
  const [user, setUser] = React.useState<User>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  
  // Redirect if user session is not defined
  if (!session) {
    redirect('/')
  }

  const getUser = async () =>  {
    const u = await currentUser();
    setUser(u);
  };

  React.useEffect(() => {
    if (session && session?.user) getUser();
    setLoading(false);
  }, [session?.user])
  
  return (
    <Box>
      <Sheet>
          <Typography>
            User DB {user?.email}<br/>
            User Details
          </Typography> 
      </Sheet>
    </Box>
  )
}