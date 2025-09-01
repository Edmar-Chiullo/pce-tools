import React from 'react';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import BarMenu from "@/components/ui/menu-bar";
import MenuToggle from '@/components/ui/menu-toggle';
import Image from 'next/image';

import { auth, signOut } from '@/auth';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PCE TOOLS",
  description: "",
};

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";
  const image = session?.user?.image ?? "/user.png";
  
  return (
    <main className={`${geistSans.variable} ${geistMono.variable} flex antialiased w-full h-[92vh] p-2 bg-zinc-100`}>
      <div className='relative flex-1'>
        <div className='hidden md:flex flex-col justify-end items-end w-full h-10 px-2'>
          <div className="flex justify-end items-center gap-4 w-full">
            <p className="text-sm">{user.first}</p>
            <Image 
                className="self-start rounded-full" 
                src={image} alt={user.first}
                width={28}
                height={28}
            />
          </div>
          <form
            action={async () => {
                "use server"
                await signOut()
              }}
            className="relative flex justify-end"
          >
            <button className="flex grow items-center justify-center gap-2 rounded-md text-2xl  md:text-sm font-medium text-zinc-950 cursor-pointer md:flex-none md:justify-start underline">
              Sair
            </button>
          </form>
        </div>
        <MenuToggle />

        <div className='flex w-full h-full'>
          <div className='hidden md:block w-24 p-2'>
            <BarMenu user={user} />
          </div>
          <div className={`flex items-center w-full h-full pr-2`}>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}