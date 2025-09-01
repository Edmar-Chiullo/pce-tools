'use client'

import NavigationMenu from "../menu"
import { useLoginContext } from "@/app/context/user-context"

export default function appOperator() {

    const { user } = useLoginContext()

    return (
        <div className="flex flex-col h-[100%]">
            <div className="flex justify-end items-start w-full">
                <span className="absolute top-6 mr-4 text-[10px]">{user?.userName}</span>
            </div>
        </div>
    )
}