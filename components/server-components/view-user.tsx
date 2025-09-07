import { auth } from "@/auth";
import Image from "next/image";


export default async function ViewUser() {
    const session = await auth();
    const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";
    const image = session?.user?.image ?? "/user.png";
    
    return (
        <div className="flex items-end mt-1 gap-4 w-full md:justify-end md:mt-0">
            <p className=" text-sm">{user.first}</p>
            <Image 
                className="order-first self-start rounded-full md:order-none" 
                src={image} alt={user.first}
                width={28}
                height={28}
            />
          </div>
    )
}