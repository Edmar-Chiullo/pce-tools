

export default function Alert(props: any) {
    
    return (
        <div className="absolute flex flex-col justify-around items-center left-48 self-center z-10 w-96 h-48 bg-zinc-50 rounded-2xl">
            <div className="w-full">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
            </div>
            <div className="flex justify-around w-[80%] ">
                <button className="w-28 h-10 rounded-md text-zinc-50 bg-zinc-950">Finalizar</button>
                <button className="w-28 h-10 rounded-md text-zinc-50 bg-zinc-950">Cancelar</button>
            </div>
        </div>
    )

}