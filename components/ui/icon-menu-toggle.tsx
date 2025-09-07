'use client'

import { Bars3Icon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function IconMenuToggle({props}: {props: (state: boolean) => void}) {
  const [isOpen, setIsOpen] = useState(false);

  function alternate(state: boolean) {
    setIsOpen(true)
    props(state)
  }

  return (
    <div onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <XMarkIcon onClick={() => alternate(false)} className="absolute z-50 top-1 right-4 self-center h-8 w-8 text-zinc-950" />
        ) : (
          <Bars3Icon onClick={() => alternate(true)} className="absolute z-50 top-1 right-4 self-center h-8 w-8 text-zinc-950" />
        )}  
    </div>
  );
}
