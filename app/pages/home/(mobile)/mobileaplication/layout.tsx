import { ActiviContextProvider } from "@/app/context/activity-context-provider";
import { auth } from "@/auth";
import CloseSession from "@/components/server-components/close-session";
import ViewUser from "@/components/server-components/view-user";
import MenuToggle from "@/components/ui/menu-toggle";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Operações PCE",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";
  return (
    <ActiviContextProvider>
      <SessionProvider>
        <div className='relative w-full h-full px-2'>
          <ViewUser />
          <MenuToggle />
          <div className='flex w-full '>
            <div className={`flex flex-col justify-between items-center w-full  pr-2`}>
              {children}
            </div>
          </div>
        </div>
      </SessionProvider>  
    </ActiviContextProvider>
  );
}
