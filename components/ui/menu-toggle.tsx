'use client'
import { useState } from "react";
import BarMenu from "./menu-bar";
import IconMenuToggle from "./icon-menu-toggle";

//{ user }: { user: { first: string; permission: string } }
export default function MenuToggle() {

  const [ openCloseMenu, setOpenCloseMenu ] = useState(false)

  function openClose(state: boolean): void {
    setOpenCloseMenu(state)
  }

  return (
      <div className='flex w-full md:hidden'>
        <IconMenuToggle props={openClose} />
        {
          openCloseMenu && <div className={`absolute z-40 bottom-0 left-0 top-0 flex-col w-full bg-zinc-50`}>
            <BarMenu />
          </div>
        }
      </div>
  );
}