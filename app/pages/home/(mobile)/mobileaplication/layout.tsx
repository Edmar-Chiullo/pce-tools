import { ActiviContextProvider } from "@/app/context/activity-context-provider";
import { auth } from "@/auth";
import CloseSession from "@/components/server-components/close-session";
import ViewUser from "@/components/server-components/view-user";
import BarMenu from "@/components/ui/menu-bar";
import MenuToggle from "@/components/ui/menu-toggle";
import type { Metadata } from "next";

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
      <div className='relative w-full h-screen py-1 px-2'>
        <ViewUser />
        <CloseSession />
        <MenuToggle />
        <div className='flex w-full h-full md:h-[80%]'>
          <div className={`flex flex-col justify-between items-center w-full h-full pr-2`}>
            {children}
          </div>
        </div>
      </div>
    </ActiviContextProvider>
  );
}
