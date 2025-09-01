import Image from "next/image";
import Logout from "./logout";
import { auth } from "@/auth";

export default async function LogoutUser() {

    const session = await auth();
    const name = session?.user?.name ?? "Sem nome";
    const image = session?.user?.image ?? "/user.png";

    return (
        <div className="z-10 flex flex-col gap-2 w-full px-6 pt-1">
            <div className="flex justify-end items-center gap-4 w-full">
                <p className="text-sm">{name}</p>
                <Image 
                    className="self-start rounded-full" 
                    src={image} alt={name}
                    width={28}
                    height={28}
                />
            </div>
            <Logout />
        </div>
    );
}
