import PagePataria from "@/components/ui/container-portaria";

export default function Page() {
    
    return (
        <section className="flex flex-col justify-end gap-2 w-full h-full p-2 rounded-2xl bg-zinc-800">
            <h1 className="text-zinc-50 text-center text-4xl">Portaria</h1>
            <div className="flex items-center justify-between bg-zinc-50 gap-2 w-full h-[90%] rounded-2xl">
                <PagePataria />
            </div>
        </section>
    )
}
