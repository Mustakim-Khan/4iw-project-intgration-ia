'use client'
import * as React from 'react';
import { Dropdown, Menu, MenuButton, MenuItem, ListItemDecorator } from '@mui/joy';
import Link from "next/link"
import { LogOut, User} from 'react-feather';
import { useRouter, usePathname, useSearchParams } from "next/navigation";


export default function ControlledDropdown() {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = React.useCallback((event: React.SyntheticEvent | null, isOpen: boolean) => {
      setOpen(isOpen);
    },[],
  );

  return (
    <Dropdown open={open} onOpenChange={handleOpenChange}>
      <MenuButton><User/></MenuButton>
      <Menu placement="bottom-end">
        <MenuItem onClick={() => alert("My account")}>
		<ListItemDecorator>
			<User/>
          </ListItemDecorator>{' '}
			My account
		</MenuItem>
        <MenuItem onClick={() => alert("Logout")}><LogOut/>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}