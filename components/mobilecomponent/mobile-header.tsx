
import React from "react";
import MenuToggle from "../ui/menu-toggle";
import { auth, signOut } from "@/auth";
import Image from "next/image";

export default async function MobileHeader() {
    const session = await auth();
    const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";
    const image = session?.user?.image ?? "/user.png";

    return (
        <div className="hidden md:flex">
            <div className='flex flex-col justify-end items-end w-full h-2 px-6'>
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
                    <button className="grow items-center justify-center gap-2 rounded-md text-2xl  md:text-sm font-medium text-zinc-950 cursor-pointer md:flex-none md:justify-start underline">
                        Sair
                    </button>
                </form>
            </div>
            <MenuToggle />
        </div>
    );
}