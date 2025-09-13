import React, { Suspense } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import BarMenu from "@/components/ui/menu-bar";
import MenuToggle from '@/components/ui/menu-toggle';

import { auth } from '@/auth';
import ViewUser from '@/components/server-components/view-user';
import CloseSession from '@/components/server-components/close-session';

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
  
  return (
    <main className={`${geistSans.variable} ${geistMono.variable} flex w-full h-full bg-zinc-50`}>
      <SessionProvider>
        <div className='relative w-full h-full px-2'>
          <Suspense>
            <ViewUser />
          </Suspense>
          <Suspense>
            <CloseSession />
          </Suspense>
          <Suspense>
            <MenuToggle />
          </Suspense>
          <div className='flex w-full h-[95%] md:h-[91%]'>
            <div className='hidden w-full md:block md:w-24 md:p-2'>
            <Suspense>
              <BarMenu />
            </Suspense>
            </div>
            <div className={`flex justify-center items-center w-full pr-2`}>
              {children}
            </div>
          </div>
        </div>
      </SessionProvider>
    </main>
  );
}