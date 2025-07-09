'use client'

import { Button } from "@/components/ui/button"

export default function ValidacaoCargaRetirada(value:any) {
    function confirm(element:any) {
        const { props } = value
        props(element)
    }

    return (
        <div className="absolute flex flex-col justify-around p-5 z-10 w-96 h-42 bg-zinc-100 rounded-2xl border-2 drop-shadow-xl shadow-zinc-300">
            <div className="title w-full text-center text-3xl">
                <h1>Confirmar retirada.</h1>
            </div>
            <div className="flex justify-around w-full">
                <Button onClick={(element) => confirm(false)} className="w-32 drop-shadow-xl shadow-zinc-950 hover:scale-[1.01]">Sim</Button>
                <Button onClick={(element) => confirm(false)} className="w-32 drop-shadow-xl shadow-zinc-950 hover:scale-[1.01]">Não</Button>
            </div>
        </div>
    )
}