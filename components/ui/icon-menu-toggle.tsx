'use client'

import { Bars3Icon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function IconMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <XMarkIcon onClick={() => setIsOpen(true)} className="absolute z-50 top-4 right-4 self-center h-8 w-8 text-zinc-950" />
        ) : (
          <Bars3Icon onClick={() => setIsOpen(true)} className="absolute z-50 top-4 right-4 self-center h-8 w-8 text-zinc-950" />
        )}  
    </div>
  );
}
