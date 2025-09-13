import { XMarkIcon } from "@heroicons/react/20/solid"


type BtnPopUpProps = {
    title: string;
    description: string;
    acao: string,
    close: (status: boolean) => void;
    finish: (status: boolean) => void
}

export default function Alert({ title, description, acao, close, finish }: BtnPopUpProps) {
    
    return (
        <div className="absolute flex flex-col justify-around items-center left-48 self-center z-10 p-2 w-96 h-48 bg-zinc-300 shadow-md shadow-zinc-500 border-2 border-zinc-300 rounded-2xl">
            <div className="flex justify-end w-full px-3 h-4">
                <XMarkIcon  onClick={() => close(false)} className="h-8 w-8 text-zinc-950 hover:text-zinc-700 hover:cursor-pointer rounded-2xl hover:bg-zinc-50/30" />
            </div>
            <div className="flex flex-col gap-2 items-center w-full h-20">
                <h1>{title}</h1>
                <p className="text-2xl">{description}</p>
            </div>
            <div className="flex justify-around w-[80%] ">
                <button onClick={() => finish(true)} className="w-28 h-10 rounded-md text-zinc-50 bg-zinc-950 hover:cursor-pointer shadow-md shadow-zinc-500 hover:bg-zinc-900">Sim</button>
                <button onClick={() => close(false)} className="w-28 h-10 rounded-md text-zinc-50 bg-zinc-950 hover:cursor-pointer shadow-md shadow-zinc-500 hover:bg-zinc-900">Não</button>
            </div>
        </div>
    )

}