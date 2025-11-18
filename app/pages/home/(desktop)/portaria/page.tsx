import { ReceiptProps } from "@/app/interface/interface";
import PagePataria from "@/components/ui/container-portaria";
import { getReceiptById } from "@/lib/firebase/server-database";

type Carga = {
    carga: ReceiptProps[]
}

export default async function Page(props: {searchParams?: Promise<{query?: string; page?: string;}>}) {
     const searchParams = await props.searchParams;
        const query = searchParams?.query || '';
    
        const carga:Carga[] = await getReceiptById(query);
    return (
        <section className="flex flex-col justify-end gap-2 w-full h-full p-2 rounded-2xl bg-zinc-800">
            <h1 className="text-zinc-50 text-center text-4xl">Portaria</h1>
            <div className="flex items-center justify-between bg-zinc-50 gap-2 w-full h-[90%] rounded-2xl">
                <PagePataria props={Object.values(carga)} />
            </div>
        </section>
    )
}
