
import MobileHeader from "@/components/mobilecomponent/mobile-header"
import NavigationMenu from "./menu"
import { auth } from "@/auth"

type User = {
    first: string
    email: string
    name: string
    id: string
    role: string
}

export default async function appOperator() {
    const session = await auth()
    const user = (session?.user as User)

    return (
        <div className="relative flex flex-col w-full h-[100%]">
            <MobileHeader />
            <NavigationMenu  user={user} />
        </div>
    )
}