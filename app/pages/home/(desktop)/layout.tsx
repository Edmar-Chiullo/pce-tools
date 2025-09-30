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
  return (
    <main className={`${geistSans.variable} ${geistMono.variable} flex h-full px-1`}>
      <SessionProvider>
        <div className='relative w-full px-2'>
          <div className='flex items-center lg:justify-end w-full lg:flex-col'>
            <Suspense>
              <ViewUser />
            </Suspense>
            <Suspense>
              <CloseSession />
            </Suspense>
          </div>
          <Suspense>
            <MenuToggle />
          </Suspense>
          <div className='flex w-full h-[90vh] lg:h-[86vh]'>
            <div className='hidden w-full md:block md:w-24 md:p-2'>
            <Suspense>
              <BarMenu />
            </Suspense>
            </div>
            <div className={`flex justify-center items-center w-full h-full`}>
              {children}
            </div>
          </div>
        </div>
      </SessionProvider>
    </main>
  );
}