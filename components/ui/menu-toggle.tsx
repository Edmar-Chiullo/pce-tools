'use client'

import { useState } from "react";
import BarMenu from "./menu-bar";
//import { signOut } from '@/auth';
import IconMenuToggle from "./icon-menu-toggle";

export default function MenuToggle({ user }: { user: { first: string; permission: string } }) {

  const [ openCloseMenu, setOpenCloseMenu ] = useState(false)

  function openClose(state: boolean): void {
    setOpenCloseMenu(state)
  }

  return (
    <>
      <div className='flex w-full md:hidden'>
        <IconMenuToggle props={openClose} />
        {
          openCloseMenu && <div className={`absolute z-40 bottom-0 left-0 flex-col bg-zinc-50 w-full h-screen`}>
            <BarMenu user={user} />
          </div>
        }
      </div>
    </>
  );
}