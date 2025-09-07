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
  /**
   * 
   * <div className="flex flex-col gap-12">
          <div className="flex justify-center items-end w-full">
              <h1 className="titleApp font-bold">App de Operações</h1>
          </div>
          <div className="flex justify-center flex-col w-full">
              {children}
          </div>
      </div>
   */
  return (
    <ActiviContextProvider>
      <div className='relative w-full h-full py-1 px-2'>
        <ViewUser />
        <CloseSession />
        <MenuToggle user={user}/>
        <div className='flex w-full h-[95%] md:h-[60%]'>
          <div className='hidden w-full md:block md:w-24 md:p-2'>
            <BarMenu user={user} />
          </div>
          <div className={`flex flex-col justify-between items-center w-full h-full pr-2`}>
            {children}
          </div>
        </div>
      </div>
      
    </ActiviContextProvider>
  );
}
