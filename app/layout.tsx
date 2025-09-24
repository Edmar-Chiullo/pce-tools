import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LoginContextProvider } from "./context/user-context-provider";
import { ReceiptContextProvider } from "./context/carga-context-provider";

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 w-screen h-full`}
      >
        <LoginContextProvider>  
            <ReceiptContextProvider>
              <div className="w-full h-screen py-1">
                {children}
              </div>
            </ReceiptContextProvider>        
        </LoginContextProvider>
      </body>
    </html>
  );
}
