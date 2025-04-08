'use client'

import { useState } from "react" 
import NavigationMenu from "./menu"
import { useLoginContext } from "@/app/context/user-context"
import { fullDate } from "@/utils/date-generate"

export default function appOperator() {

    const { user, setUser } = useLoginContext()
    const [ centerSelect, setCenterSelect ] = useState()

    return (
        <div className="flex flex-col h-[100%] pt-1">
            <div className="flex justify-end items-start w-full">
                <span className="absolute top-6 mr-4 text-[10px]">{user?.userName}</span>
            </div>
            <NavigationMenu />
        </div>
    )
}