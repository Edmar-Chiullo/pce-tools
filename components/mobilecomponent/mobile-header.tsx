
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
            
        </div>
    );
}