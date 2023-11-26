'use client'
import * as React from 'react';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { signIn, signOut, useSession } from 'next-auth/react'

import { Dropdown, Menu, MenuButton, MenuItem, ListItemDecorator } from '@mui/joy';
import { LogIn, LogOut, User} from 'react-feather';


export default function ControlledDropdown() {
  const router = useRouter()
  const { data : session } = useSession()
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = React.useCallback((event: React.SyntheticEvent | null, isOpen: boolean) => {
      setOpen(isOpen);
    },[],
  );

  return (
    <Dropdown open={open} onOpenChange={handleOpenChange}>
      <MenuButton><User/></MenuButton>
      <Menu placement="bottom-end">
        { (session?.user) ? 
          (<>
            <MenuItem onClick={() => router.push('users/me')}>
              <ListItemDecorator> <User/> </ListItemDecorator>{' '}
                My account
            </MenuItem>
            <MenuItem onClick={() => signOut()}><LogOut/>Logout</MenuItem>
          </>)
        : 
          <MenuItem onClick={() => signIn()}>
            <ListItemDecorator> <LogIn/> </ListItemDecorator>{' '}
              Login
          </MenuItem>
        }
      </Menu>
    </Dropdown>
  );
}