import { ActiviContextProvider } from "@/app/context/activity-context-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operações PCE",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ActiviContextProvider>
      <div className="flex flex-col gap-12">
          <div className="flex justify-center items-end w-full">
              <h1 className="titleApp font-bold">App de Operações</h1>
          </div>
          <div className="flex justify-center flex-col w-full">
              {children}
          </div>
      </div>
    </ActiviContextProvider>
  );
}
