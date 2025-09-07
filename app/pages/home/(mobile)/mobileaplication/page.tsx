
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
        <div className="relative flex flex-col gap-4 justify-center mt-8 w-full h-full">
            <h1 className="text-center"><strong>OPERAÇÕES PCE</strong></h1>
            <NavigationMenu  user={user} />
        </div>
    )
}